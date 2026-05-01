"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import StepIndicator from "@/components/molecules/StepIndicator";

function validateSLPhone(phone: string): boolean {
  const digits = phone.replace(/\s/g, "");
  return /^7\d{8}$/.test(digits);
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits and spaces, max 9 digits
    const raw = e.target.value.replace(/[^\d\s]/g, "");
    const digitsOnly = raw.replace(/\s/g, "");
    if (digitsOnly.length <= 9) {
      setPhone(raw);
      if (phoneError) setPhoneError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone
    if (!validateSLPhone(phone)) {
      setPhoneError("Enter a valid Sri Lankan mobile number");
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    router.push("/auth/verify");
  };

  return (
    <div className="animate-fade-in">
      <StepIndicator currentStep={1} />

      {/* Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(91,108,255,0.2)]">
          <span className="text-white text-xl font-bold">M</span>
        </div>
        <Text variant="h1" className="text-center">
          Create your account
        </Text>
        <Text variant="body" className="text-center mt-2">
          Start managing your medication reminders
        </Text>
      </div>

      {/* Signup card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Email"
            id="signup-email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Phone number with +94 prefix */}
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
                value={phone}
                onChange={handlePhoneChange}
                required
                className={`
                  flex-1 px-3 py-2.5 rounded-r-lg rounded-l-none
                  bg-bg border border-border
                  text-sm text-text-primary
                  placeholder:text-text-muted
                  transition-all duration-150
                  focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
                  ${phoneError ? "border-danger focus:border-danger focus:ring-danger" : ""}
                `}
              />
            </div>
            {phoneError && (
              <span className="text-xs text-danger">{phoneError}</span>
            )}
          </div>

          <Input
            label="Password"
            id="signup-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            required
          />

          <div>
            <Input
              label="Confirm Password"
              id="signup-confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              error={passwordError}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full mt-1"
          >
            Create Account
          </Button>
        </form>
      </div>

      {/* Sign in link */}
      <p className="text-center mt-6 text-sm text-text-muted">
        Already have an account?{" "}
        <Link
          href="/auth"
          className="text-accent hover:text-accent-hover transition-colors font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
