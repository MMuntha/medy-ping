export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  color: string;
  notes?: string;
  startDate?: string;
  endDate?: string;
}

export interface Reminder {
  id: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  time: string;
  status: "taken" | "pending" | "missed";
  color: string;
}
