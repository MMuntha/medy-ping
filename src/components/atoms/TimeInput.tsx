"use client";

import React from "react";

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
}

export default function TimeInput({
  value,
  onChange,
  id,
  label,
}: TimeInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <input
        type="time"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-3 py-2.5 rounded-lg
          bg-bg border border-border
          text-sm text-text-primary
          transition-all duration-150
          focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
        "
      />
    </div>
  );
}
