"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Medication } from "@/lib/types";
import { useMedications } from "@/hooks/useMedications";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import TimeInput from "@/components/atoms/TimeInput";
import Text from "@/components/atoms/Text";

const frequencyOptions = [
  "Daily",
  "Twice Daily",
  "Three Times Daily",
  "Weekly",
  "As Needed",
];

const colorPalette = [
  "#EF4444", // Red
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#F97316", // Orange
];

const medicationSchema = z.object({
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

type MedicationData = z.infer<typeof medicationSchema>;

interface MedicationFormProps {
  initialData?: Medication;
}

export default function MedicationForm({ initialData }: MedicationFormProps) {
  const router = useRouter();
  const { addMedication, updateMedication } = useMedications();
  const isEditing = !!initialData;
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MedicationData>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: initialData?.name || "",
      dosage: initialData?.dosage || "",
      frequency: initialData?.frequency || "Daily",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
      color: initialData?.color || "",
      notes: initialData?.notes || "",
      times: initialData?.times ? initialData.times.map((t) => ({ value: t })) : [{ value: "08:00" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "times",
    control,
  });

  const selectedColor = watch("color");

  const getRandomColor = () => {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  };

  const onSubmit = async (data: MedicationData) => {
    setIsSaving(true);
    
    try {
      const finalColor = data.color || getRandomColor();
      const stringTimes = data.times.map((t) => t.value);
      
      const medicationPayload = {
        name: data.name,
        dosage: data.dosage,
        frequency: data.frequency,
        times: stringTimes,
        notes: data.notes || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        color: finalColor,
      };

      if (isEditing && initialData) {
        await updateMedication(initialData.id, medicationPayload);
      } else {
        await addMedication(medicationPayload);
      }
      router.push("/medications");
    } catch (error) {
      console.error("Error saving medication:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-fade-in">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Input
            label="Medication Name"
            id="medication-name"
            placeholder="e.g. Lisinopril"
            {...register("name")}
            error={errors.name?.message}
          />

          {/* Dosage */}
          <Input
            label="Dosage"
            id="medication-dosage"
            placeholder="e.g. 10mg"
            {...register("dosage")}
            error={errors.dosage?.message}
          />

          {/* Frequency */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="medication-frequency"
              className="text-sm font-medium text-text-secondary"
            >
              Frequency
            </label>
            <select
              id="medication-frequency"
              {...register("frequency")}
              className="
                w-full px-3 py-2.5 rounded-lg
                bg-bg border border-border
                text-sm text-text-primary
                transition-all duration-150
                focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
                cursor-pointer appearance-none
              "
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              {frequencyOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.frequency && <span className="text-xs text-danger">{errors.frequency.message}</span>}
          </div>

          {/* Start Date */}
          <Input
            label="Start Date (optional)"
            id="medication-start-date"
            type="date"
            {...register("startDate")}
          />

          {/* End Date */}
          <Input
            label="End Date (optional)"
            id="medication-end-date"
            type="date"
            {...register("endDate")}
          />
        </div>

        {/* Color Picker */}
        <div className="mt-6 flex flex-col gap-2">
          <label className="text-sm font-medium text-text-secondary">
            Color Indicator (Optional)
          </label>
          <div className="flex flex-wrap gap-3">
            {colorPalette.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setValue("color", c)}
                className={`w-8 h-8 rounded-full transition-all duration-200 border-2 ${
                  selectedColor === c 
                    ? "border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
                    : "border-transparent hover:scale-110"
                }`}
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
          <p className="text-xs text-text-muted mt-1">If no color is chosen, a random one will be assigned.</p>
        </div>

        {/* Notes */}
        <div className="mt-6 flex flex-col gap-1.5">
          <label
            htmlFor="medication-notes"
            className="text-sm font-medium text-text-secondary"
          >
            Notes (optional)
          </label>
          <textarea
            id="medication-notes"
            placeholder="Any special instructions or notes..."
            {...register("notes")}
            rows={3}
            className="
              w-full px-3 py-2.5 rounded-lg
              bg-bg border border-border
              text-sm text-text-primary
              placeholder:text-text-muted
              transition-all duration-150
              focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
              resize-none
            "
          />
        </div>

        {/* Reminder Times */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <Text variant="h3">Reminder Times</Text>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => append({ value: "12:00" })}
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              }
            >
              Add Time
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-3">
                <div className="flex-1">
                  <Controller
                    control={control}
                    name={`times.${index}.value`}
                    render={({ field: { onChange, value } }) => (
                      <TimeInput
                        value={value}
                        onChange={onChange}
                        id={`reminder-time-${index}`}
                        label={`Time ${index + 1}`}
                      />
                    )}
                  />
                  {errors.times?.[index]?.value && (
                    <span className="text-xs text-danger block mt-1">
                      {errors.times[index]?.value?.message}
                    </span>
                  )}
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="
                      h-[42px] w-[42px] flex items-center justify-center
                      rounded-lg border border-border
                      text-text-muted hover:text-danger hover:border-danger/30 hover:bg-danger-subtle
                      transition-all duration-150
                      cursor-pointer
                    "
                    aria-label="Remove time"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            {errors.times?.root && (
              <span className="text-xs text-danger">{errors.times.root.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={isSaving}>
          {isEditing ? "Save Changes" : "Add Medication"}
        </Button>
      </div>
    </form>
  );
}
