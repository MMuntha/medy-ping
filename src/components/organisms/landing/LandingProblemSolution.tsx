import React from "react";
import Image from "next/image";
import Text from "@/components/atoms/Text";

export default function LandingProblemSolution() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Problem section centered at top */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="w-16 h-16 bg-danger/10 text-danger flex items-center justify-center rounded-2xl mx-auto mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <Text variant="h2" className="mb-4 text-3xl font-bold">
            Missing medication is more common than you think
          </Text>
          <Text
            variant="body"
            className="text-lg text-text-muted leading-relaxed"
          >
            Many people forget doses due to busy schedules, stress, or complex
            prescriptions. This leads to reduced effectiveness and avoidable
            health risks.
          </Text>
        </div>

        {/* Solution with Image */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image — designed for transparent mockups */}
          <div className="order-2 md:order-1 flex justify-center">
            <div className="relative w-full max-w-[320px]">
              <div className="absolute inset-8  rounded-full blur-[60px] pointer-events-none" />
              <Image
                src="/images/mobile-whatsapp-v3.png"
                alt="WhatsApp Reminder"
                width={600}
                height={1200}
                className="relative w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Solution Text */}
          <div className="order-1 md:order-2">
            <div className="w-16 h-16 bg-accent/10 text-accent flex items-center justify-center rounded-2xl mb-8">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <Text
              variant="h2"
              className="mb-6 text-3xl lg:text-4xl font-bold tracking-tight"
            >
              A simple reminder system that keeps you on track
            </Text>
            <Text
              variant="body"
              className="text-lg text-text-muted leading-relaxed mb-6"
            >
              MedyPing sends smart, timely medication reminders directly to your
              WhatsApp.
            </Text>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-sm">
                  ✓
                </span>
                <Text variant="body" className="text-text-primary">
                  No new apps to install
                </Text>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-sm">
                  ✓
                </span>
                <Text variant="body" className="text-text-primary">
                  No confusing interfaces
                </Text>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-sm">
                  ✓
                </span>
                <Text variant="body" className="text-text-primary">
                  Just reply to log your dose
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
