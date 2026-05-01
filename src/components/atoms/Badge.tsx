import React from "react";

type BadgeVariant = "taken" | "pending" | "missed";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  taken: "bg-success-subtle text-success",
  pending: "bg-warning-subtle text-warning",
  missed: "bg-danger-subtle text-danger",
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5
        text-xs font-medium rounded-full
        ${variantStyles[variant]}
      `}
    >
      {children}
    </span>
  );
}
