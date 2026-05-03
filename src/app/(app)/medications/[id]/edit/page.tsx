import React from "react";
import type { Metadata } from "next";
import EditMedicationContent from "./EditMedicationContent";

export const metadata: Metadata = {
  title: "Edit Medication — MedyPing",
  description: "Edit your medication details and reminder times.",
};

export default async function EditMedicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditMedicationContent id={id} />;
}
