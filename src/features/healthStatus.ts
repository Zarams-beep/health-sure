import { z } from "zod";
export const healthStatusSchema = z.object({
    healthCondition: z.string().nullable(),
    vitalSigns: z.object({
      bloodPressure: z.string().nullable(),
      heartRate: z.number().nullable(),
      temperature: z.number().nullable(),
      sugar: z.number().nullable(),
      oxygen: z.number().nullable(),
      cholesterol: z.number().nullable(),
      BMI: z.number().nullable(),
    }),
    allergies: z.array(z.string()), 
  });
  