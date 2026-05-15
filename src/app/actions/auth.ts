"use server";

import twilio from "twilio";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

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

export async function finalizeSignupAction(email: string, password: string | undefined, phoneNumber: string, code: string) {
  try {
    const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;

    const verification = await verifyWhatsAppOTP(formattedPhone, code);
    if (!verification.success) {
      return { success: false, error: verification.error };
    }

    let userRecord;
    try {
      if (!password) throw new Error("Password is required for email signup.");
      
      userRecord = await adminAuth.createUser({
        email,
        password,
        phoneNumber: formattedPhone,
        emailVerified: false,
      });
    } catch (authError: any) {
      console.error("Admin Auth Error:", authError);
      return { success: false, error: authError.message || "Failed to create user account" };
    }

    try {
      await adminDb.collection("users").doc(userRecord.uid).set({
        uid: userRecord.uid,
        email,
        phoneNumber: formattedPhone,
        whatsappVerified: true,
        consentGiven: true,
        hasSkippedWelcomePrompt: false,
        hasSkippedMedPrompt: false,
        createdAt: new Date(),
      });
    } catch (dbError: any) {
      console.error("Firestore Error, rolling back user:", dbError);
      await adminAuth.deleteUser(userRecord.uid).catch(console.error);
      return { success: false, error: "Failed to initialize user profile" };
    }

    return { success: true, uid: userRecord.uid };
  } catch (error: any) {
    console.error("Finalize Signup Error:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}

export async function resetPasswordAction(phoneNumber: string, code: string, newPassword: string) {
  try {
    const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;

    const verification = await verifyWhatsAppOTP(formattedPhone, code);
    if (!verification.success) {
      return { success: false, error: verification.error };
    }

    let userRecord;
    try {
      userRecord = await adminAuth.getUserByPhoneNumber(formattedPhone);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        return { success: false, error: "No account found with this phone number." };
      }
      throw error;
    }

    try {
      await adminAuth.updateUser(userRecord.uid, {
        password: newPassword,
      });
    } catch (updateError: any) {
      console.error("Password Update Error:", updateError);
      return { success: false, error: updateError.message || "Failed to update password." };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Reset Password Error:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}

