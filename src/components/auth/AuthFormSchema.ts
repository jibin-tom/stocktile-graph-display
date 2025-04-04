
import * as z from 'zod';

// Form schema for validation
export const authFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().optional(),
  fullName: z.string().optional(),
}).refine((data) => {
  // Only validate confirmPassword if it's provided and we're in register mode
  if (data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type AuthFormValues = z.infer<typeof authFormSchema>;
