import React from "react";

type TextVariant = "h1" | "h2" | "h3" | "body" | "caption";

interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}

const variantConfig: Record<
  TextVariant,
  { tag: keyof React.JSX.IntrinsicElements; classes: string }
> = {
  h1: {
    tag: "h1",
    classes:
      "text-[28px] font-bold leading-[1.3] tracking-[-0.01em] text-text-primary",
  },
  h2: {
    tag: "h2",
    classes:
      "text-xl font-semibold leading-[1.3] tracking-[-0.01em] text-text-primary",
  },
  h3: {
    tag: "h3",
    classes:
      "text-base font-semibold leading-[1.3] tracking-[-0.01em] text-text-primary",
  },
  body: {
    tag: "p",
    classes: "text-sm leading-[1.5] text-text-secondary",
  },
  caption: {
    tag: "span",
    classes: "text-xs leading-[1.5] text-text-muted",
  },
};

export default function Text({
  variant = "body",
  children,
  className = "",
  muted = false,
}: TextProps) {
  const config = variantConfig[variant];
  const Tag = config.tag;

  return (
    <Tag
      className={`
        ${config.classes}
        ${muted ? "!text-text-muted" : ""}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
