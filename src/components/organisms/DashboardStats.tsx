import React from "react";
import StatCard from "@/components/molecules/StatCard";

interface DashboardStatsProps {
  total: number;
  todayReminders: number;
  taken: number;
  pending: number;
}

export default function DashboardStats({
  total,
  todayReminders,
  taken,
  pending,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
      <StatCard
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
          </svg>
        }
        value={total}
        label="Total Medications"
        accentColor="#5B6CFF"
      />
      <StatCard
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        }
        value={todayReminders}
        label="Today's Reminders"
        accentColor="#F59E0B"
      />
      <StatCard
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        }
        value={taken}
        label="Taken"
        accentColor="#22C55E"
      />
      <StatCard
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        }
        value={pending}
        label="Pending"
        accentColor="#F97316"
      />
    </div>
  );
}
