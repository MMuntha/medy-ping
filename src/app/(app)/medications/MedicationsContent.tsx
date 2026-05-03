"use client";

import React from "react";
import Link from "next/link";
import TopBar from "@/components/organisms/TopBar";
import Button from "@/components/atoms/Button";
import MedicationList from "@/components/organisms/MedicationList";
import { useMedications } from "@/hooks/useMedications";

export default function MedicationsContent() {
  const { medications, loading, error } = useMedications();

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Medications"
        subtitle={
          loading
            ? "Loading..."
            : `${medications.length} medication${medications.length !== 1 ? "s" : ""}`
        }
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
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-danger">
          <p>{error}</p>
        </div>
      ) : (
        <MedicationList medications={medications} />
      )}
    </div>
  );
}
