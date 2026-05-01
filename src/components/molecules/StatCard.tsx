import React from "react";
import Text from "@/components/atoms/Text";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  accentColor?: string;
}

export default function StatCard({
  icon,
  value,
  label,
  accentColor,
}: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 transition-all duration-150 hover:border-text-muted/20">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: accentColor
            ? `${accentColor}15`
            : "var(--accent-subtle)",
          color: accentColor || "var(--accent)",
        }}
      >
        {icon}
      </div>
      <div>
        <Text variant="h2" className="!text-2xl">
          {value}
        </Text>
        <Text variant="caption">{label}</Text>
      </div>
    </div>
  );
}
