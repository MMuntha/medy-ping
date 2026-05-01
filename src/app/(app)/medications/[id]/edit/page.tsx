import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/organisms/TopBar";
import MedicationForm from "@/components/organisms/MedicationForm";
import IconButton from "@/components/atoms/IconButton";
import { getMedicationById, medications } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Edit Medication — MedyPing",
  description: "Edit your medication details and reminder times.",
};

export function generateStaticParams() {
  return medications.map((m) => ({ id: m.id }));
}

export default async function EditMedicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const medication = getMedicationById(id);

  if (!medication) {
    notFound();
  }

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Edit Medication"
        subtitle={`Editing ${medication.name}`}
        actions={
          <Link href={`/medications/${id}`}>
            <IconButton label="Back to medication">
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
      <MedicationForm initialData={medication} />
    </div>
  );
}
