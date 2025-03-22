import { z } from "zod";

export const basicInfoSchema = z.object({
    // id: z.string().nullable(),
    fullName:z.string().nullable(),
    DOB: z.string().nullable(), 
    Age: z.string().nullable(), 
    Gender: z.enum(["Male", "Female", "Other"]).nullable(),
    phoneNumber: z.string().min(10).max(15).nullable(),
    email: z.string().email().nullable(),
    HouseAddress: z.string().min(5).nullable(),
    EmergencyNumber: z.string().min(10).max(15).nullable(),
    NextOfKinName: z.string().min(3).nullable(),
    NextOfKinGender: z.enum(["Male", "Female", "Other"]).nullable(),
    NextOfKinPhoneNumber: z.string().min(10).max(15).nullable(),
    NextOfKinEmailAddress: z.string().email().nullable(),
});
