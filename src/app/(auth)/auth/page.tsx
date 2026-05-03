"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { UserProfile } from "@/components/providers/AuthProvider";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        const profile = docSnap.data() as UserProfile;
        if (!profile.whatsappVerified) {
          router.push(
            `/auth/verify?phone=${encodeURIComponent(profile.phoneNumber)}`
          );
        } else if (!profile.consentGiven) {
          router.push("/auth/consent");
        } else {
          router.push("/dashboard");
        }
      } else {
        // Fallback if no profile exists
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Brand */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(91,108,255,0.2)]">
          <span className="text-white text-xl font-bold">M</span>
        </div>
        <Text variant="h1" className="text-center">
          Welcome back
        </Text>
        <Text variant="body" className="text-center mt-2">
          Sign in to your MedyPing account
        </Text>
      </div>

      {/* Login card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          autoComplete="off"
        >
          <Input
            label="Email"
            id="auth-email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <Input
              label="Password"
              id="auth-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="text-xs text-text-muted hover:text-accent transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-danger animate-fade-in">{error}</div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            className="w-full mt-1"
          >
            Sign In
          </Button>
        </form>
      </div>

      {/* Sign up link */}
      <p className="text-center mt-6 text-sm text-text-muted">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-accent hover:text-accent-hover transition-colors font-medium"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
