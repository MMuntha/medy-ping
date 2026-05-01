import { Medication, Reminder } from "./types";

export const medications: Medication[] = [
  {
    id: "1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Daily",
    times: ["08:00"],
    color: "#5B6CFF",
    notes: "Take with water on an empty stomach.",
    startDate: "2025-01-15",
  },
  {
    id: "2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice Daily",
    times: ["08:00", "20:00"],
    color: "#22C55E",
    notes: "Take with meals to reduce stomach upset.",
    startDate: "2024-06-01",
  },
  {
    id: "3",
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Daily",
    times: ["21:00"],
    color: "#F59E0B",
    startDate: "2025-03-10",
  },
  {
    id: "4",
    name: "Omeprazole",
    dosage: "20mg",
    frequency: "Daily",
    times: ["07:30"],
    color: "#EC4899",
    notes: "Take 30 minutes before breakfast.",
    startDate: "2025-02-20",
    endDate: "2025-08-20",
  },
  {
    id: "5",
    name: "Vitamin D3",
    dosage: "2000 IU",
    frequency: "Daily",
    times: ["09:00"],
    color: "#F97316",
    startDate: "2025-01-01",
  },
  {
    id: "6",
    name: "Amlodipine",
    dosage: "5mg",
    frequency: "Daily",
    times: ["08:00"],
    color: "#06B6D4",
    notes: "Monitor blood pressure regularly.",
    startDate: "2024-11-15",
  },
];

export const reminders: Reminder[] = [
  {
    id: "r1",
    medicationId: "4",
    medicationName: "Omeprazole",
    dosage: "20mg",
    time: "07:30",
    status: "taken",
    color: "#EC4899",
  },
  {
    id: "r2",
    medicationId: "1",
    medicationName: "Lisinopril",
    dosage: "10mg",
    time: "08:00",
    status: "taken",
    color: "#5B6CFF",
  },
  {
    id: "r3",
    medicationId: "2",
    medicationName: "Metformin",
    dosage: "500mg",
    time: "08:00",
    status: "taken",
    color: "#22C55E",
  },
  {
    id: "r4",
    medicationId: "6",
    medicationName: "Amlodipine",
    dosage: "5mg",
    time: "08:00",
    status: "taken",
    color: "#06B6D4",
  },
  {
    id: "r5",
    medicationId: "5",
    medicationName: "Vitamin D3",
    dosage: "2000 IU",
    time: "09:00",
    status: "pending",
    color: "#F97316",
  },
  {
    id: "r6",
    medicationId: "2",
    medicationName: "Metformin",
    dosage: "500mg",
    time: "20:00",
    status: "pending",
    color: "#22C55E",
  },
  {
    id: "r7",
    medicationId: "3",
    medicationName: "Atorvastatin",
    dosage: "20mg",
    time: "21:00",
    status: "pending",
    color: "#F59E0B",
  },
];

export function getMedicationById(id: string): Medication | undefined {
  return medications.find((m) => m.id === id);
}

export function getRemindersByTime(): {
  morning: Reminder[];
  afternoon: Reminder[];
  evening: Reminder[];
} {
  return {
    morning: reminders.filter((r) => {
      const hour = parseInt(r.time.split(":")[0]);
      return hour < 12;
    }),
    afternoon: reminders.filter((r) => {
      const hour = parseInt(r.time.split(":")[0]);
      return hour >= 12 && hour < 17;
    }),
    evening: reminders.filter((r) => {
      const hour = parseInt(r.time.split(":")[0]);
      return hour >= 17;
    }),
  };
}

export function getStats() {
  const total = medications.length;
  const todayReminders = reminders.length;
  const taken = reminders.filter((r) => r.status === "taken").length;
  const pending = reminders.filter((r) => r.status === "pending").length;
  const missed = reminders.filter((r) => r.status === "missed").length;

  return { total, todayReminders, taken, pending, missed };
}
