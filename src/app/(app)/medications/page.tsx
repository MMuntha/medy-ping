import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/organisms/TopBar";
import MedicationList from "@/components/organisms/MedicationList";
import Button from "@/components/atoms/Button";
import { medications } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Medications — MedyPing",
  description: "Manage your medications, dosages, and reminder schedules.",
};

export default function MedicationsPage() {
  return (
    <div className="animate-fade-in">
      <TopBar
        title="Medications"
        subtitle={`${medications.length} medication${medications.length !== 1 ? "s" : ""}`}
        actions={
          <Link href="/medications/add">
            <Button
              variant="primary"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              }
            >
              Add Medication
            </Button>
          </Link>
        }
      />
      <MedicationList medications={medications} />
    </div>
  );
}
