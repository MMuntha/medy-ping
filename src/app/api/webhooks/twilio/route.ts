import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { twilioClient } from "@/lib/twilio";
import { DueMedication } from "@/lib/types";

const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886";

export async function POST(req: Request) {
  try {
    const text = await req.text();
    const params = new URLSearchParams(text);
    
    const from = params.get("From");
    const body = params.get("Body")?.trim().toLowerCase();
    
    if (!from || !body) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const phoneNumber = from.replace("whatsapp:", "");

    const pendingSnapshot = await adminDb
      .collection("pending_responses")
      .where("phoneNumber", "==", phoneNumber)
      .orderBy("sentAt", "desc")
      .limit(1)
      .get();

    if (pendingSnapshot.empty) {
      await twilioClient.messages.create({
        from: TWILIO_WHATSAPP_NUMBER,
        to: from,
        body: "I don't see any pending medication reminders for you right now. Stay healthy! 🌿",
      });
      return NextResponse.json({ success: true });
    }

    const pendingDoc = pendingSnapshot.docs[0];
    const pendingData = pendingDoc.data();

    const meds: DueMedication[] = pendingData.type === "batch" 
      ? pendingData.medications 
      : [{
          id: pendingData.medicationId,
          name: pendingData.medicationName,
          scheduledTime: pendingData.scheduledTime
        }];

    const isTaken = body === "yes" || body === "y" || body === "done" || body.includes("taken") || body.includes("took");
    const isSnooze = body === "snooze" || body.includes("later") || body === "no" || body.includes("snooze");

    if (isTaken) {
      const batch = adminDb.batch();
      meds.forEach((med: DueMedication) => {
        const logRef = adminDb.collection("medication_logs").doc();
        batch.set(logRef, {
          userId: pendingData.userId,
          medicationId: med.id,
          medicationName: med.name,
          scheduledTime: med.scheduledTime || null,
          status: "taken",
          timestamp: FieldValue.serverTimestamp(),
          dateString: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD
        });
      });

      batch.delete(pendingDoc.ref);
      await batch.commit();

      const names = meds.map((m: DueMedication) => m.name).join(" and ");
      await twilioClient.messages.create({
        from: TWILIO_WHATSAPP_NUMBER,
        to: from,
        body: `Great job! I've logged that you took your ${names}. 🎉`,
      });

    } else if (isSnooze) {
      const followUpTime = new Date();
      followUpTime.setMinutes(followUpTime.getMinutes() + 30);
      const batch = adminDb.batch();

      meds.forEach((med: DueMedication) => {
        const snoozeRef = adminDb.collection("delayed_reminders").doc();
        batch.set(snoozeRef, {
          userId: pendingData.userId,
          phoneNumber: pendingData.phoneNumber,
          medicationId: med.id,
          medicationName: med.name,
          scheduledTime: med.scheduledTime || null,
          followUpTime: Timestamp.fromDate(followUpTime),
        });
      });

      batch.delete(pendingDoc.ref);
      await batch.commit();

      const names = meds.map((m: DueMedication) => m.name).join(" and ");
      await twilioClient.messages.create({
        from: TWILIO_WHATSAPP_NUMBER,
        to: from,
        body: `No worries. I'll remind you again in 30 minutes to take your ${names}. ⏰`,
      });

    } else {
      await twilioClient.messages.create({
        from: TWILIO_WHATSAPP_NUMBER,
        to: from,
        body: `I didn't quite catch that. Please tap or reply "Taken" if you took your medication(s), or "Snooze" to be reminded later.`,
      });
    }

    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });

  } catch (error) {
    console.error("[WEBHOOK] Error:", error);
    return new NextResponse("<Response></Response>", { status: 500, headers: { "Content-Type": "text/xml" } });
  }
}
