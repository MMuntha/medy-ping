"use client";

import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/providers/AuthProvider";
import { MedicationLog } from "@/lib/types";

export function useTodayLogs() {
  const [logs, setLogs] = useState<MedicationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLogs([]);
      setLoading(false);
      return;
    }

    const todayStr = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

    const logsRef = collection(db, "medication_logs");
    const q = query(
      logsRef,
      where("userId", "==", user.uid),
      where("dateString", "==", todayStr)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const logsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MedicationLog[];
        
        setLogs(logsData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching today's logs:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { logs, loading, error };
}
