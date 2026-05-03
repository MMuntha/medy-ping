import React from "react";
import type { Metadata } from "next";
import DashboardContent from "./DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard — MedyPing",
  description: "View your medication reminders and daily schedule at a glance.",
};

export default function DashboardPage() {
  return <DashboardContent />;
}
