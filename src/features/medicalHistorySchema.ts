import { z } from "zod";

// Medical History Schema
export const medicalHistorySchema = z.object({
    pastDiagnoses: z.array(z.string().min(1, "Diagnosis cannot be empty")),
    surgeries: z.array(z.string().min(1, "Surgery description cannot be empty")),
    medications: z.array(z.object({
        name: z.string().min(1, "Medication name is required"),
        dosage: z.string().min(1, "Dosage is required"),
        frequency: z.string().min(1, "Frequency is required"),
    })),
    familyHistory: z.array(z.string().min(1, "Family history cannot be empty")),
});