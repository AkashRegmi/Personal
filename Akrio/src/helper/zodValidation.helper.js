import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const imageSchema = z
  .instanceof(FileList, { message: "Please upload a valid file" })
  .refine((files) => {
    // console.log(files?.[0]);

    return files?.length > 0;
  }, "Please upload an image")
  .refine(
    (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    `Max image size is 5MB.`,
  )
  .refine(
    (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    "Only .jpg, .png, and .webp formats are supported.",
  );
