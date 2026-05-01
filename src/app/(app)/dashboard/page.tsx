import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/organisms/TopBar";
import DashboardStats from "@/components/organisms/DashboardStats";
import TodaySchedule from "@/components/organisms/TodaySchedule";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { reminders, getStats } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Dashboard — MedyPing",
  description: "View your medication reminders and daily schedule at a glance.",
};

export default function DashboardPage() {
  const stats = getStats();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="animate-fade-in">
      <TopBar title="Dashboard" subtitle={today} />

      {/* Stats */}
      <DashboardStats
        total={stats.total}
        todayReminders={stats.todayReminders}
        taken={stats.taken}
        pending={stats.pending}
      />

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Schedule - 2/3 */}
        <div className="lg:col-span-2">
          <TodaySchedule reminders={reminders} />
        </div>

        {/* Quick actions - 1/3 */}
        <div>
          <div className="bg-card border border-border rounded-xl p-6">
            <Text variant="h3" className="mb-4">
              Quick Actions
            </Text>

            <div className="flex flex-col gap-3">
              <Link href="/medications/add">
                <Button variant="primary" className="w-full" icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                }>
                  Add Medication
                </Button>
              </Link>

              <Link href="/medications">
                <Button variant="secondary" className="w-full" icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
                  </svg>
                }>
                  View All Medications
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
