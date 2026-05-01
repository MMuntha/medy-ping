import React from "react";
import { Medication } from "@/lib/types";
import MedicationCard from "@/components/molecules/MedicationCard";
import EmptyState from "@/components/molecules/EmptyState";

interface MedicationListProps {
  medications: Medication[];
}

export default function MedicationList({ medications }: MedicationListProps) {
  if (medications.length === 0) {
    return (
      <EmptyState
        title="No medications yet"
        description="Add your first medication to start tracking your reminders and stay on schedule."
        actionLabel="Add Medication"
        actionHref="/medications/add"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 stagger-children">
      {medications.map((medication) => (
        <MedicationCard key={medication.id} medication={medication} />
      ))}
    </div>
  );
}
