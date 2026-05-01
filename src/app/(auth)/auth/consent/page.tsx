"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import Checkbox from "@/components/atoms/Checkbox";
import StepIndicator from "@/components/molecules/StepIndicator";

export default function ConsentPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="animate-fade-in">
      <StepIndicator currentStep={3} />

      {/* Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div>
        <Text variant="h1" className="text-center">
          Stay on track
        </Text>
      </div>

      {/* Consent card */}
      <div className="bg-card border border-border rounded-xl p-6">
        {/* WhatsApp message */}
        <div className="flex items-start gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <Text variant="body" className="!text-text-primary">
            We will send medication reminders to your WhatsApp number.
          </Text>
        </div>

        {/* Benefits */}
        <div className="flex flex-col gap-3 mb-6 pl-1">
          {[
            "Daily medication reminders at your scheduled times",
            "Missed dose alerts",
            "Refill reminders",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success flex-shrink-0"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <Text variant="body">{item}</Text>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border my-5" />

        {/* Checkbox */}
        <Checkbox
          id="consent-whatsapp"
          checked={agreed}
          onChange={setAgreed}
          label="I agree to receive reminders on WhatsApp"
        />

        {/* Continue button */}
        <Button
          variant="primary"
          size="lg"
          disabled={!agreed}
          loading={loading}
          onClick={handleContinue}
          className="w-full mt-5"
        >
          Continue
        </Button>
      </div>

      {/* Skip */}
      <div className="flex justify-center mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard")}
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}
