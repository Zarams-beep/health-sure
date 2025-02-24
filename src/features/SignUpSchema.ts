import { SignUpSubmitFormData } from "@/types/auth";
import { z, ZodType } from "zod";

export const signUpSchema: ZodType<Omit<SignUpSubmitFormData, "confirmPassword">> = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address, try again'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
    saveDetails: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Re-enter the password correctly",
    path: ["confirmPassword"],
  })
  .transform((data) => {
    const { confirmPassword, ...rest } = data; 
    return rest;
  });
