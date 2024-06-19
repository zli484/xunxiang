import * as z from "zod";
import { ZodSchema } from "zod";

export const UserSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters long",
    })
    .max(20, {
      message: "First name must be at most 20 characters long",
    }),

  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters long",
    })
    .max(20, {
      message: "Last name must be at most 20 characters long",
    }),

  bio: z.string().max(200, {
    message: "Bio must be at most 200 characters long",
  }),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

export const imageSchema = z.object({
  image: validateFile(),
});

function validateFile() {
  const maxUploadSize = 5 * 1024 * 1024; // Set the max upload size to 5 MB
  const acceptedFilesTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 5 MB") // Update the error message accordingly
    .refine((file) => {
      return (
        !file || acceptedFilesTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image");
}
