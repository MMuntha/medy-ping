"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
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
        id={id}
        className={`
          w-full px-3 py-2.5 rounded-lg
          bg-bg border border-border
          text-sm text-text-primary
          placeholder:text-text-muted
          transition-all duration-150
          focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-danger focus:border-danger focus:ring-danger" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-danger">{error}</span>
      )}
    </div>
  );
}
