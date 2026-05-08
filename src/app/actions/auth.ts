"use server";

import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const getTwilioClient = () => {
  if (!accountSid || !authToken) {
    throw new Error("Missing Twilio credentials in environment variables");
  }
  return twilio(accountSid, authToken);
};

export async function sendWhatsAppOTP(phoneNumber: string) {
  try {
    const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;

    if (process.env.NODE_ENV === "development") {
      console.log(`[DEV MODE] Simulated OTP sent to ${formattedPhone}`);
      return { success: true, status: "pending" };
    }

    if (!verifyServiceSid) {
      throw new Error("Missing TWILIO_VERIFY_SERVICE_SID in environment variables");
    }

    const client = getTwilioClient();
    
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({
        to: formattedPhone,
        channel: "whatsapp",
      });

    return { success: true, status: verification.status };
  } catch (error: any) {
    console.error("Twilio send OTP error:", error);
    return { success: false, error: error.message || "Failed to send OTP" };
  }
}

export async function verifyWhatsAppOTP(phoneNumber: string, code: string) {
  try {
    const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;

    if (process.env.NODE_ENV === "development") {
      if (code === "123456") {
        console.log(`[DEV MODE] OTP verified successfully for ${formattedPhone}`);
        return { success: true };
      }
      return { success: false, error: "Invalid test code. Use 123456 in dev mode." };
    }

    if (!verifyServiceSid) {
      throw new Error("Missing TWILIO_VERIFY_SERVICE_SID in environment variables");
    }

    const client = getTwilioClient();
    
    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({
        to: formattedPhone,
        code: code,
      });

    if (verificationCheck.status === "approved") {
      return { success: true };
    } else {
      return { success: false, error: "Invalid verification code" };
    }
  } catch (error: any) {
    console.error("Twilio verify OTP error:", error);
    return { success: false, error: error.message || "Failed to verify OTP" };
  }
}
