import React from "react";
import Text from "@/components/atoms/Text";

interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function TopBar({ title, subtitle, actions }: TopBarProps) {
  return (
    <div className="flex items-center justify-between pb-8">
      <div>
        <Text variant="h1">{title}</Text>
        {subtitle && (
          <Text variant="body" className="mt-1">
            {subtitle}
          </Text>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
