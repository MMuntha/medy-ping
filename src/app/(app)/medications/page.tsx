import React from "react";
import type { Metadata } from "next";
import MedicationsContent from "./MedicationsContent";

export const metadata: Metadata = {
  title: "Medications — MedyPing",
  description: "Manage your medications, dosages, and reminder schedules.",
};

export default function MedicationsPage() {
  return <MedicationsContent />;
}
