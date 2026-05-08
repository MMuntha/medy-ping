import React from "react";
import Image from "next/image";
import Text from "@/components/atoms/Text";

const features = [
  {
    title: "Smart medication reminders",
    description:
      "Receive timely WhatsApp pings right when you need to take your medication.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Daily and custom schedules",
    description:
      "Set up complex routines easily. Morning, noon, or night — we handle it all.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Missed dose alerts",
    description:
      "Get gentle follow-up reminders if you forget or snooze your initial ping.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    title: "Easy medication tracking",
    description: "View your adherence stats in a beautiful, simple dashboard.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function LandingFeatures() {
  return (
    <section className="py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Features Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <Text
              variant="h2"
              className="text-3xl lg:text-4xl font-bold tracking-tight mb-4"
            >
              Everything you need, nothing you don&apos;t
            </Text>
            <Text
              variant="body"
              className="text-text-muted text-lg max-w-2xl mx-auto"
            >
              We stripped away the clutter to focus on the core features that
              actually help you stay consistent.
            </Text>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-surface border border-border p-6 rounded-2xl"
              >
                <div className="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <Text variant="h3" className="text-lg font-semibold mb-2">
                  {feature.title}
                </Text>
                <Text
                  variant="body"
                  className="text-text-muted text-sm leading-relaxed"
                >
                  {feature.description}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-surface border border-border rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Steps Left */}
            <div>
              <Text variant="h2" className="text-3xl font-bold mb-12">
                Set it up in seconds
              </Text>

              <div className="flex flex-col gap-10 relative">
                {/* Connecting line for desktop vertical */}
                <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-border -z-10" />

                <div className="flex gap-6 items-start bg-bg p-4 rounded-2xl border border-border">
                  <div className="w-16 h-16 shrink-0 bg-surface border-2 border-accent text-accent rounded-full flex items-center justify-center text-xl font-bold shadow-lg shadow-accent/10">
                    1
                  </div>
                  <div className="pt-2">
                    <Text variant="h3" className="text-xl font-semibold mb-2">
                      Add your medication
                    </Text>
                    <Text variant="body" className="text-text-muted">
                      Enter the name and dosage.
                    </Text>
                  </div>
                </div>

                <div className="flex gap-6 items-start bg-bg p-4 rounded-2xl border border-border">
                  <div className="w-16 h-16 shrink-0 bg-surface border-2 border-accent text-accent rounded-full flex items-center justify-center text-xl font-bold shadow-lg shadow-accent/10">
                    2
                  </div>
                  <div className="pt-2">
                    <Text variant="h3" className="text-xl font-semibold mb-2">
                      Set your schedule
                    </Text>
                    <Text variant="body" className="text-text-muted">
                      Choose the times you need to take it.
                    </Text>
                  </div>
                </div>

                <div className="flex gap-6 items-start bg-bg p-4 rounded-2xl border border-border">
                  <div className="w-16 h-16 shrink-0 bg-surface border-2 border-accent text-accent rounded-full flex items-center justify-center text-xl font-bold shadow-lg shadow-accent/10">
                    3
                  </div>
                  <div className="pt-2">
                    <Text variant="h3" className="text-xl font-semibold mb-2">
                      Get reminders
                    </Text>
                    <Text variant="body" className="text-text-muted">
                      Receive a WhatsApp ping at the exact time.
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Right — designed for transparent mockups */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[300px] lg:max-w-[300px]">
                {/* Soft glow */}
                <div className="absolute inset-8 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />

                <Image
                  src="/images/mobile-webapp-v4.png"
                  alt="MedyPing Mobile App"
                  width={1200}
                  height={500}
                  className="relative w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
