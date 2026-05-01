import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/organisms/TopBar";
import MedicationForm from "@/components/organisms/MedicationForm";
import IconButton from "@/components/atoms/IconButton";

export const metadata: Metadata = {
  title: "Add Medication — MedyPing",
  description: "Add a new medication with dosage and reminder times.",
};

export default function AddMedicationPage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Add Medication"
        subtitle="Create a new medication with reminder times"
        actions={
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
        }
      />
      <MedicationForm />
    </div>
  );
}
