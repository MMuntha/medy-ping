"use client";

import React, { useRef, KeyboardEvent, ClipboardEvent } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: string;
}

export default function OTPInput({
  value,
  onChange,
  length = 6,
  error,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (/[^0-9]/.test(val)) return;

    const newValue = value.split("");
    // If user typed a single digit
    if (val.length <= 1) {
      newValue[index] = val;
      onChange(newValue.join("").slice(0, length));

      // Move focus to next input if not empty
      if (val !== "" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newValue = value.split("");

      // If current input is empty, delete previous and move focus
      if (!value[index] && index > 0) {
        newValue[index - 1] = "";
        onChange(newValue.join(""));
        inputRefs.current[index - 1]?.focus();
      } else {
        // Just clear current
        newValue[index] = "";
        onChange(newValue.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length);
    if (pastedData) {
      onChange(pastedData);
      const focusIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1 md:gap-2 justify-between">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`
              w-12 h-14 text-center text-xl font-bold rounded-lg
              bg-bg border border-border text-text-primary
              transition-all duration-150
              focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
              ${
                error
                  ? "border-danger focus:border-danger focus:ring-danger"
                  : ""
              }
            `}
          />
        ))}
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
