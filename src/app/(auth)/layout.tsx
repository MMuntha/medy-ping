import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #5B6CFF 0%, transparent 70%)" }}
      />
      <div className="relative z-10 w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
}
