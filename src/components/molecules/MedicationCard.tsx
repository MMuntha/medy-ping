import React from "react";
import Link from "next/link";
import { Medication } from "@/lib/types";
import Text from "@/components/atoms/Text";

interface MedicationCardProps {
  medication: Medication;
}

export default function MedicationCard({ medication }: MedicationCardProps) {
  return (
    <Link href={`/medications/${medication.id}`}>
      <div
        className="
          group relative overflow-hidden
          bg-card border border-border rounded-xl p-5
          transition-all duration-200
          hover:border-text-muted/30 hover:-translate-y-[2px]
          cursor-pointer
        "
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
          style={{ backgroundColor: medication.color }}
        />

        <div className="flex flex-col gap-3 pl-2">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: medication.color }}
              />
              <Text variant="h3">{medication.name}</Text>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-3">
            <Text variant="body">{medication.dosage}</Text>
            <span className="text-border">•</span>
            <Text variant="caption">{medication.frequency}</Text>
          </div>

          {/* Time pills */}
          <div className="flex flex-wrap gap-2">
            {medication.times.map((time) => (
              <span
                key={time}
                className="
                  inline-flex items-center gap-1 px-2.5 py-1
                  bg-surface rounded-md
                  text-xs text-text-secondary
                "
              >
                <svg
                  width="12"
                  height="12"
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
                {time}
              </span>
            ))}
          </div>

          {/* Notes preview */}
          {medication.notes && (
            <Text variant="caption" className="line-clamp-1 mt-0.5">
              {medication.notes}
            </Text>
          )}
        </div>
      </div>
    </Link>
  );
}
