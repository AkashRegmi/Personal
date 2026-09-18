import { z } from "zod";
export const LoginSchema = z.object({
  email: z
    .string("Please provide the email")
    .email("Please provide the valid email"),
  password: z
    .string("password is required")
    .min(2, "Password must be at least 2 character long")
    .min(6, "Password must be at least 6 characters"),
});
export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});
