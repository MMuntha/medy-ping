"use client";

import React from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import TopBar from "@/components/organisms/TopBar";
import MedicationDetail from "@/components/organisms/MedicationDetail";
import IconButton from "@/components/atoms/IconButton";
import { useMedications } from "@/hooks/useMedications";

interface Props {
  id: string;
}

export default function MedicationDetailContent({ id }: Props) {
  const { medications, loading, error, deleteMedication } = useMedications();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-danger">{error}</div>;
  }

  const medication = medications.find((m) => m.id === id);

  if (!medication) {
    return notFound();
  }

  // Pass a delete handler to MedicationDetail if it supports it, or handle it here if there's a delete button in TopBar.
  // Currently, delete is presumably handled inside MedicationDetail or there is no delete yet. 
  // Wait, let's check MedicationDetail.tsx later if needed.

  return (
    <div className="animate-fade-in">
      <TopBar
        title={medication.name}
        subtitle={`${medication.dosage} · ${medication.frequency}`}
        actions={
          <div className="flex items-center gap-2">
            <Link href={`/medications/${id}/edit`}>
              <IconButton label="Edit medication">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </IconButton>
            </Link>
            <Link href="/medications">
              <IconButton label="Back to medications">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </IconButton>
            </Link>
          </div>
        }
      />
      <MedicationDetail medication={medication} />
    </div>
  );
}
