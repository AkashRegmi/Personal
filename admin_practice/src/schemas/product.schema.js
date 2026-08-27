import { z } from "zod";
import { imageSchema } from "../helper/zodValidation.helper";
export const productSchema = z.object({
  image: imageSchema,
  name: z
    .string("Product name is required")
    .min(3, "Min length of product should be 3 character ")
    .max(100, "Max length of product should be 100 character long."),
  description: z
    .string("Product description is required")
    .min(3, "Min length of product  description should be 3 character ")
    .max(
      1000,
      "Max length of product description should be 1000 character long.",
    ),
  price: z.coerce
    .number("Price of Product is required.")
    .positive("Price must be greater than zero"),
  tags: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Tag cannot be empty")
        .max(30, "Tag cannot exceed 30 characters"),
    )
    .min(1, "At least one tag is required")
    .max(10, "You can add a maximum of 10 tags"),
});
