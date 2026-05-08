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

export interface DueMedication {
  id: string;
  name: string;
  dosage: string;
  scheduledTime: string;
}

export interface MedicationLog {
  id?: string;
  userId: string;
  medicationId: string;
  medicationName: string;
  scheduledTime: string | null;
  status: "taken" | "pending" | "missed";
  timestamp: any; // Firestore Timestamp
  dateString: string;
}

export interface TwilioMessagePayload {
  from: string;
  to: string;
  body?: string;
  contentSid?: string;
  contentVariables?: string;
}
