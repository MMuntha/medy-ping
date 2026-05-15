import { NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/dist/nextjs";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { twilioClient } from "@/lib/twilio";
import { isDueInWindow, getMinutes } from "@/lib/time-utils";
import { DueMedication, TwilioMessagePayload } from "@/lib/types";

const TWILIO_WHATSAPP_NUMBER =
  process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886";
const TWILIO_SINGLE_REMINDER_SID = process.env.TWILIO_SINGLE_REMINDER_SID;
const TWILIO_BATCH_REMINDER_SID = process.env.TWILIO_BATCH_REMINDER_SID;

async function handler(req: Request) {
  try {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Colombo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const currentTimeStr = new Intl.DateTimeFormat("en-US", options).format(now);

    const currentMinutes = getMinutes(currentTimeStr);
    const CRON_INTERVAL_MINUTES = 5;

    console.log(`[CRON] Running reminder check for time: ${currentTimeStr}`);

    const usersSnapshot = await adminDb.collection("users").get();
    let messagesSent = 0;

    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();

      // Skip users who haven't verified WhatsApp or given consent
      if (
        !userData.whatsappVerified ||
        !userData.consentGiven ||
        !userData.phoneNumber
      ) {
        continue;
      }

      const formattedPhone = `whatsapp:${userData.phoneNumber}`;

      const medsSnapshot = await adminDb
        .collection(`users/${userDoc.id}/medications`)
        .get();

      let dueMedications: DueMedication[] = [];

      for (const medDoc of medsSnapshot.docs) {
        const medData = medDoc.data();

        const dueTimes =
          medData.times && Array.isArray(medData.times)
            ? medData.times.filter((t: string) =>
                isDueInWindow(t, currentMinutes, CRON_INTERVAL_MINUTES)
              )
            : [];

        if (dueTimes.length > 0) {
          dueMedications.push({
            id: medDoc.id,
            name: medData.name,
            dosage: medData.dosage,
            scheduledTime: dueTimes[0],
          });
        }
      }

      if (dueMedications.length === 0) {
        continue;
      }

      if (dueMedications.length === 1) {
        const med = dueMedications[0];

        const messagePayload: TwilioMessagePayload = {
          from: TWILIO_WHATSAPP_NUMBER,
          to: formattedPhone,
        };

        if (TWILIO_SINGLE_REMINDER_SID) {
          messagePayload.contentSid = TWILIO_SINGLE_REMINDER_SID;
          // We can't change the Twilio template structure from here without knowing its variables,
          // but we can pass preferredName as a variable in case the template is updated.
          messagePayload.contentVariables = JSON.stringify({
            "1": med.name,
            "2": med.dosage,
            "3": userData.preferredName || "there",
          });
        } else {
          const greeting = userData.preferredName ? `Hey ${userData.preferredName}` : "Hey";
          messagePayload.body = `${greeting}! It's time for your medication:\n*${med.name} (${med.dosage})*\n\nPlease reply:\n✅ *Taken*\n⏰ *SNOOZE* to be reminded in 30 minutes.`;
        }

        await twilioClient.messages.create(messagePayload);

        await adminDb.collection("pending_responses").add({
          type: "single",
          userId: userDoc.id,
          phoneNumber: userData.phoneNumber,
          medicationId: med.id,
          medicationName: med.name,
          scheduledTime: med.scheduledTime,
          sentAt: FieldValue.serverTimestamp(),
        });

        messagesSent++;
        console.log(
          `[CRON] Sent single reminder to ${formattedPhone} for ${med.name}`
        );
      } else {
        // Batch
        const medNames = dueMedications
          .map((m) => `${m.name} (${m.dosage})`)
          .join(" and ");

        const messagePayload: TwilioMessagePayload = {
          from: TWILIO_WHATSAPP_NUMBER,
          to: formattedPhone,
        };

        if (TWILIO_BATCH_REMINDER_SID) {
          messagePayload.contentSid = TWILIO_BATCH_REMINDER_SID;
          messagePayload.contentVariables = JSON.stringify({
            "1": medNames,
            "2": userData.preferredName || "there",
          });
        } else {
          const greeting = userData.preferredName ? `Hey ${userData.preferredName}` : "Hey";
          messagePayload.body = `${greeting}! It's time for your medications:\n*${medNames}*\n\nPlease reply:\n✅ *Took All*\n⏰ *Snooze All* to be reminded in 30 minutes.`;
        }

        await twilioClient.messages.create(messagePayload);

        await adminDb.collection("pending_responses").add({
          type: "batch",
          userId: userDoc.id,
          phoneNumber: userData.phoneNumber,
          medications: dueMedications,
          sentAt: FieldValue.serverTimestamp(),
        });

        messagesSent++;
        console.log(
          `[CRON] Sent batch reminder to ${formattedPhone} for ${dueMedications.length} meds`
        );
      }
    }

    const delayedSnapshot = await adminDb
      .collection("delayed_reminders")
      .where("followUpTime", "<=", Timestamp.now())
      .get();

    for (const delayedDoc of delayedSnapshot.docs) {
      const delayedData = delayedDoc.data();
      const formattedPhone = `whatsapp:${delayedData.phoneNumber}`;

      // Fetch user data to get preferredName for delayed reminder
      const userDoc = await adminDb.collection("users").doc(delayedData.userId).get();
      const userData = userDoc.exists ? userDoc.data() : null;
      const greeting = userData?.preferredName ? `Hey ${userData.preferredName}` : "Hey";

      await twilioClient.messages.create({
        from: TWILIO_WHATSAPP_NUMBER,
        to: formattedPhone,
        body: `${greeting}! This is your follow-up reminder to take:\n*${delayedData.medicationName}*\n\nPlease reply *YES* once you've taken it.`,
      });

      // Delete the delayed reminder once sent
      await delayedDoc.ref.delete();
      messagesSent++;
      console.log(`[CRON] Sent delayed follow-up to ${formattedPhone}`);
    }

    return NextResponse.json({
      success: true,
      messagesSent,
      time: currentTimeStr,
    });
  } catch (error) {
    console.error("[CRON] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// Use Upstash QStash signature verification if keys are present.
// This allows local manual testing without QStash if keys aren't set in local env.
export const POST = process.env.QSTASH_CURRENT_SIGNING_KEY
  ? verifySignatureAppRouter(handler)
  : handler;
