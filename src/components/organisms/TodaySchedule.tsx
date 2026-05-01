import React from "react";
import { Reminder } from "@/lib/types";
import { getRemindersByTime } from "@/lib/mock-data";
import ReminderRow from "@/components/molecules/ReminderRow";
import Text from "@/components/atoms/Text";

interface TodayScheduleProps {
  reminders: Reminder[];
}

export default function TodaySchedule({ reminders }: TodayScheduleProps) {
  const grouped = getRemindersByTime();

  const sections = [
    {
      label: "Morning",
      icon: "☀️",
      items: grouped.morning,
    },
    {
      label: "Afternoon",
      icon: "🌤️",
      items: grouped.afternoon,
    },
    {
      label: "Evening",
      icon: "🌙",
      items: grouped.evening,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <Text variant="h3" className="mb-5">
        Today&apos;s Schedule
      </Text>

      <div className="flex flex-col gap-6">
        {sections.map((section) => {
          if (section.items.length === 0) return null;
          return (
            <div key={section.label}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">{section.icon}</span>
                <Text variant="caption" className="uppercase tracking-wider font-medium">
                  {section.label}
                </Text>
              </div>
              <div className="flex flex-col gap-2">
                {section.items.map((reminder) => (
                  <ReminderRow key={reminder.id} reminder={reminder} />
                ))}
              </div>
            </div>
          );
        })}

        {reminders.length === 0 && (
          <div className="text-center py-8">
            <Text variant="body">No reminders scheduled for today.</Text>
          </div>
        )}
      </div>
    </div>
  );
}
