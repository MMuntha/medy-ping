import React from "react";
import { Reminder } from "@/lib/types";
import Badge from "@/components/atoms/Badge";

interface ReminderRowProps {
  reminder: Reminder;
}

export default function ReminderRow({ reminder }: ReminderRowProps) {
  return (
    <div
      className="
        flex items-center gap-4 px-4 py-3
        bg-card border border-border rounded-lg
        transition-all duration-150
        hover:border-text-muted/20
      "
    >
      {/* Color dot */}
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: reminder.color }}
      />

      {/* Time */}
      <span className="text-sm font-medium text-text-primary w-14 flex-shrink-0">
        {reminder.time}
      </span>

      {/* Medication info */}
      <div className="flex-1 min-w-0">
        <span className="text-sm text-text-primary truncate block">
          {reminder.medicationName}
        </span>
        <span className="text-xs text-text-muted">{reminder.dosage}</span>
      </div>

      {/* Status badge */}
      <Badge variant={reminder.status}>
        {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
      </Badge>
    </div>
  );
}
