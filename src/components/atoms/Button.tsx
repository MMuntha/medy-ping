"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover active:bg-accent-hover shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
  secondary:
    "bg-surface text-text-primary border border-border hover:border-text-muted",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface",
  danger:
    "bg-danger text-white hover:bg-danger-hover active:bg-danger-hover shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md gap-1.5",
  md: "px-4 py-2 text-sm rounded-lg gap-2",
  lg: "px-6 py-2.5 text-sm rounded-lg gap-2",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-150 ease-out
        hover:-translate-y-[1px]
        active:translate-y-0
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children && <span>{children}</span>}
    </button>
  );
}
