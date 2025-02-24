import { LoginFormData } from "@/types/auth";
import { z, ZodType } from "zod";


export const loginSchema: ZodType<LoginFormData> = z
  .object({
fullName: z.string().min(1, 'Full name is required'), 
    email: z.string().email('Invalid email').min(0, 'School email is required'),
    password: z.string().min(6, 'Wrong Password, confirm password'),
    rememberMe: z.boolean().optional(),
  });
