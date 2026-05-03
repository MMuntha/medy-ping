"use client";

import { useState, useEffect } from "react";
import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/providers/AuthProvider";
import { Medication } from "@/lib/types";

export function useMedications() {
  const { user } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setMedications([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const medicationsRef = collection(db, `users/${user.uid}/medications`);
    // Order by creation time descending if possible, or we just fetch them.
    // For now, let's just fetch them and sort them later if needed.
    const q = query(medicationsRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const meds: Medication[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Medication[];
        setMedications(meds);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching medications:", err);
        setError("Failed to load medications.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addMedication = async (medicationData: Omit<Medication, "id">) => {
    if (!user) throw new Error("Must be logged in to add medication");
    const medicationsRef = collection(db, `users/${user.uid}/medications`);
    const docRef = await addDoc(medicationsRef, {
      ...medicationData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  };

  const updateMedication = async (id: string, medicationData: Partial<Omit<Medication, "id">>) => {
    if (!user) throw new Error("Must be logged in to update medication");
    const docRef = doc(db, `users/${user.uid}/medications`, id);
    await updateDoc(docRef, {
      ...medicationData,
      updatedAt: serverTimestamp(),
    });
  };

  const deleteMedication = async (id: string) => {
    if (!user) throw new Error("Must be logged in to delete medication");
    const docRef = doc(db, `users/${user.uid}/medications`, id);
    await deleteDoc(docRef);
  };

  return {
    medications,
    loading,
    error,
    addMedication,
    updateMedication,
    deleteMedication,
  };
}
