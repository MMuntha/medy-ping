import { z } from "zod";

// --- Login ---
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginData = z.infer<typeof loginSchema>;

// --- Signup ---
export const signupStep1Schema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .transform((val) => val.replace(/[^\d]/g, ""))
    .refine((val) => /^7\d{8}$/.test(val), {
      message: "Enter a valid Sri Lankan mobile number (e.g. 7X XXX XXXX)",
    }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  consentGiven: z.boolean().refine((val) => val === true, {
    message: "You must agree to receive reminders on WhatsApp",
  }),
});

export type SignupStep1Data = z.infer<typeof signupStep1Schema>;

export const signupStep2Schema = z.object({
  otpCode: z
    .string()
    .transform((val) => val.replace(/[^\d]/g, ""))
    .refine((val) => val.length === 6, {
      message: "Code must be exactly 6 digits",
    }),
});

export type SignupStep2Data = z.infer<typeof signupStep2Schema>;

// --- Forgot Password ---
export const forgotPasswordStep1Schema = z.object({
  phone: z.string()
    .transform((val) => val.replace(/[^\d]/g, ""))
    .refine((val) => /^7\d{8}$/.test(val), {
      message: "Enter a valid Sri Lankan mobile number (e.g. 7X XXX XXXX)",
    }),
});

export type ForgotPasswordStep1Data = z.infer<typeof forgotPasswordStep1Schema>;

export const forgotPasswordStep2Schema = z.object({
  otpCode: z.string()
    .transform((val) => val.replace(/[^\d]/g, ""))
    .refine((val) => val.length === 6, {
      message: "Code must be exactly 6 digits",
    }),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export type ForgotPasswordStep2Data = z.infer<typeof forgotPasswordStep2Schema>;
