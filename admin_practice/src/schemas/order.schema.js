import { z } from "zod";
const nepaliMobileRegex = /^(\+977)?[9][78]\d{8}$/;
export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        product: z.string().min(1, "Please select a product"),
        quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1, "Add at least one product"),

  shippingAddress: z.object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .max(30, "Full name cannot exceed 30 characters"),
    phone: z.string().min(1, "Phone is required").regex(nepaliMobileRegex, {
      message: "Invalid Nepalese mobile phone number",
    }),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),

  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
});
