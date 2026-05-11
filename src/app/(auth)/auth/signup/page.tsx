"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import Checkbox from "@/components/atoms/Checkbox";
import OTPInput from "@/components/atoms/OTPInput";
import StepIndicator from "@/components/molecules/StepIndicator";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { sendWhatsAppOTP, finalizeSignupAction } from "@/app/actions/auth";

// --- SCHEMAS ---
const step1Schema = z
  .object({
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .transform((val) => val.replace(/[^\d]/g, "")) // strip spaces/formatting
      .refine((val) => /^7\d{8}$/.test(val), {
        message: "Enter a valid Sri Lankan mobile number (e.g. 7X XXX XXXX)",
      }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    consentGiven: z.boolean().refine((val) => val === true, {
      message: "You must agree to receive reminders on WhatsApp",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Step1Data = z.infer<typeof step1Schema>;

const step2Schema = z.object({
  otpCode: z
    .string()
    .transform((val) => val.replace(/[^\d]/g, ""))
    .refine((val) => val.length === 6, {
      message: "Code must be exactly 6 digits",
    }),
});

type Step2Data = z.infer<typeof step2Schema>;

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  // Store step 1 data to pass to step 2
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);

  // Forms
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    control: controlStep1,
    formState: { errors: errors1 },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      consentGiven: true, // Default to true as it's mandatory
    },
  });

  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    control: controlStep2,
    formState: { errors: errors2 },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
  });

  const onStep1Submit = async (data: Step1Data) => {
    setLoading(true);
    setGlobalError("");
    try {
      const fullPhone = `+94${data.phone}`;
      const res = await sendWhatsAppOTP(fullPhone);

      if (!res.success) {
        setGlobalError(res.error || "Failed to send verification code");
        setLoading(false);
        return;
      }

      setStep1Data(data);
      setStep(2);
      setLoading(false);
    } catch (error: any) {
      console.error("OTP error:", error);
      setGlobalError("An unexpected error occurred");
      setLoading(false);
    }
  };

  const onStep2Submit = async (data: Step2Data) => {
    if (!step1Data) return;
    setLoading(true);
    setGlobalError("");

    try {
      const fullPhone = `+94${step1Data.phone}`;
      const res = await finalizeSignupAction(
        step1Data.email,
        step1Data.password,
        fullPhone,
        data.otpCode
      );

      if (!res.success) {
        setGlobalError(res.error || "Verification failed");
        setLoading(false);
        return;
      }

      // Automatically sign in the user now that the server created the account
      await signInWithEmailAndPassword(
        auth,
        step1Data.email,
        step1Data.password
      );

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Finalize error:", error);
      setGlobalError(error.message || "Failed to complete signup");
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <StepIndicator currentStep={step} />

      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(91,108,255,0.2)]">
          <span className="text-white text-xl font-bold">M</span>
        </div>
        <Text variant="h1" className="text-center">
          {step === 1 ? "Create your account" : "Verify WhatsApp"}
        </Text>
        <Text variant="body" className="text-center mt-2">
          {step === 1
            ? "Start managing your medication reminders"
            : `We sent a code to +94 ${step1Data?.phone}`}
        </Text>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        {globalError && (
          <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
            {globalError}
          </div>
        )}

        {step === 1 ? (
          <form
            onSubmit={handleSubmitStep1(onStep1Submit)}
            className="flex flex-col gap-5"
          >
            <Input
              label="Email"
              id="signup-email"
              type="email"
              placeholder="john@example.com"
              {...registerStep1("email")}
              error={errors1.email?.message}
            />

            {/* Phone Input */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="signup-phone"
                className="text-sm font-medium text-text-secondary"
              >
                Phone Number
              </label>
              <div className="flex">
                <div className="flex items-center justify-center px-3.5 py-2.5 bg-surface border border-border border-r-0 rounded-l-lg">
                  <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
                    +94
                  </span>
                </div>
                <input
                  id="signup-phone"
                  type="tel"
                  placeholder="7X XXX XXXX"
                  {...registerStep1("phone")}
                  className={`flex-1 px-3 py-2.5 rounded-r-lg rounded-l-none bg-bg border border-border text-sm text-text-primary placeholder:text-text-muted transition-all duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent ${
                    errors1.phone
                      ? "border-danger focus:border-danger focus:ring-danger"
                      : ""
                  }`}
                />
              </div>
              {errors1.phone && (
                <span className="text-xs text-danger">
                  {errors1.phone.message}
                </span>
              )}
            </div>

            <Input
              label="Password"
              id="signup-password"
              type="password"
              placeholder="••••••••"
              {...registerStep1("password")}
              error={errors1.password?.message}
            />

            <Input
              label="Confirm Password"
              id="signup-confirm-password"
              type="password"
              placeholder="••••••••"
              {...registerStep1("confirmPassword")}
              error={errors1.confirmPassword?.message}
            />

            {/* Mandatory Consent Checkbox via RHF Controller */}
            <div className="pt-2">
              <Controller
                name="consentGiven"
                control={controlStep1}
                render={({ field }) => (
                  <Checkbox
                    id="signup-consent"
                    label="I agree to receive reminders on WhatsApp"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors1.consentGiven && (
                <p className="text-xs text-danger mt-1.5">
                  {errors1.consentGiven.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Send Verification Code
            </Button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitStep2(onStep2Submit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">
                6-Digit Code
              </label>
              <Controller
                name="otpCode"
                control={controlStep2}
                defaultValue=""
                render={({ field }) => (
                  <OTPInput
                    value={field.value}
                    onChange={field.onChange}
                    error={errors2.otpCode?.message}
                  />
                )}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-1"
            >
              Verify & Create Account
            </Button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setGlobalError("");
              }}
              className="text-sm text-text-muted hover:text-text-primary mt-2"
              disabled={loading}
            >
              {/* Change Phone Number */}
              Back to Previous Step
            </button>
          </form>
        )}
      </div>

      {step === 1 && (
        <p className="text-center mt-6 text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            href="/auth"
            className="text-accent hover:text-accent-hover transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}
