"use client";

import React from "react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  label: string;
  size?: "sm" | "md";
  variant?: "ghost" | "danger";
}

export default function IconButton({
  children,
  label,
  size = "md",
  variant = "ghost",
  className = "",
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
  };

  const variantStyles = {
    ghost: "text-text-muted hover:text-text-primary hover:bg-surface",
    danger: "text-text-muted hover:text-danger hover:bg-danger-subtle",
  };

  return (
    <button
      aria-label={label}
      className={`
        inline-flex items-center justify-center rounded-lg
        transition-all duration-150
        cursor-pointer
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
