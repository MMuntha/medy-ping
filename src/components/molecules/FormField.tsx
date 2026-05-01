import React from "react";
import Input from "@/components/atoms/Input";

interface FormFieldProps {
  label: string;
  id: string;
  error?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function FormField({
  label,
  id,
  error,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
}: FormFieldProps) {
  return (
    <Input
      label={label}
      id={id}
      error={error}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}
