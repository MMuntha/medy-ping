import { z } from "zod";

export const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  color: z.string().optional(),
  notes: z.string().optional(),
  times: z.array(z.object({
    value: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, "Invalid time"),
  })).min(1, "At least one reminder time is required"),
});

export type MedicationData = z.infer<typeof medicationSchema>;
