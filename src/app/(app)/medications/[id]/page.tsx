import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopBar from "@/components/organisms/TopBar";
import MedicationDetail from "@/components/organisms/MedicationDetail";
import IconButton from "@/components/atoms/IconButton";
import { getMedicationById, medications } from "@/lib/mock-data";

export function generateStaticParams() {
  return medications.map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const medication = getMedicationById(id);
  return {
    title: medication
      ? `${medication.name} — MedyPing`
      : "Medication — MedyPing",
  };
}

export default async function MedicationViewPage({
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
        title={medication.name}
        subtitle={`${medication.dosage} · ${medication.frequency}`}
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
      <MedicationDetail medication={medication} />
    </div>
  );
}
