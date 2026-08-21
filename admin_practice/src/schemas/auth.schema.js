import { z } from "zod";
export const LoginSchema = z.object({
  username: z
    .string("Please provide the Username")
    .min(2, "Username must be at least 2 character Long")
    .max(100, "Username must be at must 100 character long"),
  password: z
    .string("password is required")
    .min(2, "Password must be at least 2 character long")
    .min(6, "Password must be at least 6 characters"),
});
