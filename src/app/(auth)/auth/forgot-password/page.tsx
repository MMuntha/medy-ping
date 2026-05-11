"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/atoms/Input";
import OTPInput from "@/components/atoms/OTPInput";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { sendWhatsAppOTP, resetPasswordAction } from "@/app/actions/auth";

const step1Schema = z.object({
  phone: z.string()
    .transform((val) => val.replace(/[^\d]/g, ""))
    .refine((val) => /^7\d{8}$/.test(val), {
      message: "Enter a valid Sri Lankan mobile number (e.g. 7X XXX XXXX)",
    }),
});
type Step1Data = z.infer<typeof step1Schema>;

const step2Schema = z.object({
  otpCode: z.string()
    .transform((val) => val.replace(/[^\d]/g, ""))
    .refine((val) => val.length === 6, {
      message: "Code must be exactly 6 digits",
    }),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});
type Step2Data = z.infer<typeof step2Schema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);

  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errors1 },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
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
      const res = await resetPasswordAction(fullPhone, data.otpCode, data.newPassword);
      
      if (!res.success) {
        setGlobalError(res.error || "Failed to reset password");
        setLoading(false);
        return;
      }

      setSuccessMsg("Password reset successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
      
    } catch (error: any) {
      console.error("Reset error:", error);
      setGlobalError(error.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(91,108,255,0.2)]">
          <span className="text-white text-xl font-bold">M</span>
        </div>
        <Text variant="h1" className="text-center">
          {step === 1 ? "Reset Password" : "Set New Password"}
        </Text>
        <Text variant="body" className="text-center mt-2 max-w-sm mx-auto">
          {step === 1 
            ? "Enter your registered WhatsApp number to receive a secure reset code." 
            : `We sent a code to +94 ${step1Data?.phone}. Enter it below with your new password.`}
        </Text>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        {globalError && (
          <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
            {globalError}
          </div>
        )}

        {successMsg ? (
          <div className="text-center py-8 animate-fade-in">
            <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <Text variant="h3" className="text-success mb-2">Success!</Text>
            <p className="text-text-secondary">{successMsg}</p>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleSubmitStep1(onStep1Submit)} className="flex flex-col gap-5">
             <div className="flex flex-col gap-1.5">
               <label htmlFor="reset-phone" className="text-sm font-medium text-text-secondary">WhatsApp Number</label>
               <div className="flex">
                 <div className="flex items-center justify-center px-3.5 py-2.5 bg-surface border border-border border-r-0 rounded-l-lg">
                   <span className="text-sm font-medium text-text-secondary whitespace-nowrap">+94</span>
                 </div>
                 <input
                   id="reset-phone"
                   type="tel"
                   placeholder="7X XXX XXXX"
                   {...registerStep1("phone")}
                   className={`flex-1 px-3 py-2.5 rounded-r-lg rounded-l-none bg-bg border border-border text-sm text-text-primary placeholder:text-text-muted transition-all duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent ${errors1.phone ? "border-danger focus:border-danger focus:ring-danger" : ""}`}
                 />
               </div>
               {errors1.phone && <span className="text-xs text-danger">{errors1.phone.message}</span>}
             </div>

             <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-1">
               Send Reset Code
             </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmitStep2(onStep2Submit)} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-text-secondary">6-Digit Code</label>
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
            
            <Input
              label="New Password"
              id="new-password"
              type="password"
              placeholder="••••••••"
              {...registerStep2("newPassword")}
              error={errors2.newPassword?.message}
            />

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-1">
              Reset Password
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
              Change Phone Number
            </button>
          </form>
        )}
      </div>

      <p className="text-center mt-6 text-sm text-text-muted">
        Remember your password?{" "}
        <Link href="/auth" className="text-accent hover:text-accent-hover transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
