"use client";

import React from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import TopBar from "@/components/organisms/TopBar";
import MedicationForm from "@/components/organisms/MedicationForm";
import IconButton from "@/components/atoms/IconButton";
import { useMedications } from "@/hooks/useMedications";
import Button from "@/components/atoms/Button";

interface Props {
  id: string;
}

export default function EditMedicationContent({ id }: Props) {
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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this medication?")) {
      await deleteMedication(id);
      router.push("/medications");
    }
  };

  return (
    <div className="animate-fade-in">
      <TopBar
        title="Edit Medication"
        subtitle={`Editing ${medication.name}`}
        actions={
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleDelete} className="!text-danger hover:!bg-danger-subtle">
              Delete
            </Button>
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
          </div>
        }
      />
      <MedicationForm initialData={medication} />
    </div>
  );
}
