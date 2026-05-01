"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import StepIndicator from "@/components/molecules/StepIndicator";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => !d)) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    router.push("/auth/consent");
  };

  const handleResend = () => {
    setResendTimer(30);
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="animate-fade-in">
      <StepIndicator currentStep={2} />

      {/* Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#25D366"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
        <Text variant="h1" className="text-center">
          Verify your number
        </Text>
        <Text variant="body" className="text-center mt-2">
          We sent a 6-digit code to your WhatsApp
        </Text>
      </div>

      {/* OTP card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <form onSubmit={handleSubmit}>
          {/* OTP inputs */}
          <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`
                  w-12 h-14 text-center text-xl font-semibold
                  bg-bg border rounded-lg
                  text-text-primary
                  transition-all duration-150
                  focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
                  ${digit ? "border-accent/50" : "border-border"}
                `}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={!isComplete}
            className="w-full"
          >
            Verify
          </Button>
        </form>
      </div>

      {/* Resend */}
      <p className="text-center mt-6 text-sm text-text-muted">
        Didn&apos;t receive a code?{" "}
        {resendTimer > 0 ? (
          <span className="text-text-secondary">
            Resend in {resendTimer}s
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="text-accent hover:text-accent-hover transition-colors font-medium cursor-pointer"
          >
            Resend
          </button>
        )}
      </p>
    </div>
  );
}
