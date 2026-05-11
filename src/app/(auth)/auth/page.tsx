"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { UserProfile } from "@/components/providers/AuthProvider";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    setGlobalError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        const profile = docSnap.data() as UserProfile;
        if (!profile.consentGiven) {
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
      setGlobalError("Invalid email or password");
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
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
          autoComplete="off"
        >
          <Input
            label="Email"
            id="auth-email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <div>
            <Input
              label="Password"
              id="auth-password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
            />
            <div className="flex justify-end mt-2">
              <Link
                href="/auth/forgot-password"
                className="text-xs text-text-muted hover:text-accent transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {globalError && (
            <div className="text-sm text-danger animate-fade-in p-3 bg-danger/10 border border-danger/20 rounded-lg">
              {globalError}
            </div>
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
