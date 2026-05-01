import React from "react";
import Link from "next/link";
import { Medication } from "@/lib/types";
import Text from "@/components/atoms/Text";
import Button from "@/components/atoms/Button";

interface MedicationDetailProps {
  medication: Medication;
}

export default function MedicationDetail({
  medication,
}: MedicationDetailProps) {
  return (
    <div className="animate-fade-in">
      {/* Header card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Accent top bar */}
        <div
          className="h-1.5"
          style={{ backgroundColor: medication.color }}
        />

        <div className="p-6">
          {/* Title row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: medication.color }}
              />
              <Text variant="h1">{medication.name}</Text>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/medications/${medication.id}/edit`}>
                <Button variant="secondary" size="sm">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                  </svg>
                  Edit
                </Button>
              </Link>
              <Button variant="danger" size="sm">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
                Delete
              </Button>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem label="Dosage" value={medication.dosage} />
            <InfoItem label="Frequency" value={medication.frequency} />
            {medication.startDate && (
              <InfoItem
                label="Start Date"
                value={new Date(medication.startDate).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              />
            )}
            {medication.endDate && (
              <InfoItem
                label="End Date"
                value={new Date(medication.endDate).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              />
            )}
          </div>
        </div>
      </div>

      {/* Reminder times */}
      <div className="mt-6 bg-card border border-border rounded-xl p-6">
        <Text variant="h3" className="mb-4">
          Reminder Times
        </Text>
        <div className="flex flex-wrap gap-3">
          {medication.times.map((time) => (
            <div
              key={time}
              className="
                flex items-center gap-2 px-4 py-2.5
                bg-surface border border-border rounded-lg
              "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-muted"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="text-sm font-medium text-text-primary">
                {time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      {medication.notes && (
        <div className="mt-6 bg-card border border-border rounded-xl p-6">
          <Text variant="h3" className="mb-3">
            Notes
          </Text>
          <Text variant="body">{medication.notes}</Text>
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Text variant="caption" className="mb-1 block">
        {label}
      </Text>
      <Text variant="body" className="!text-text-primary font-medium">
        {value}
      </Text>
    </div>
  );
}
