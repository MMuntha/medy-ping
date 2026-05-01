"use client";

import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id: string;
}

export default function Checkbox({
  checked,
  onChange,
  label,
  id,
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 cursor-pointer group"
    >
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div
          className={`
            w-5 h-5 rounded-md border-2 transition-all duration-200
            flex items-center justify-center
            ${
              checked
                ? "bg-accent border-accent"
                : "bg-transparent border-border group-hover:border-text-muted"
            }
          `}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`
              text-white transition-all duration-200
              ${checked ? "opacity-100 scale-100" : "opacity-0 scale-50"}
            `}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">
        {label}
      </span>
    </label>
  );
}
