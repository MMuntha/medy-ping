"use server";

import { adminDb } from "@/lib/firebase-admin";

export async function updateUserProfileAction(uid: string, data: Record<string, any>) {
  try {
    if (!uid) {
      throw new Error("User ID is required to update profile");
    }

    if (Object.keys(data).length === 0) {
      return { success: true }; // Nothing to update
    }

    // Update the document in Firestore
    await adminDb.collection("users").doc(uid).update({
      ...data,
      updatedAt: new Date(),
    });

    return { success: true };
  } catch (error: any) {
    console.error("Update User Profile Error:", error);
    return { success: false, error: error.message || "Failed to update user profile" };
  }
}
