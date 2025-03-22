export interface BasicInfo {
    // id: string | null;
    fullName: string | null;
    DOB: string | null;
    Age: string | null;
    Gender: "Male" | "Female" | "Other" | null;
    phoneNumber: string | null;
    email: string | null;
    HouseAddress: string | null;
    EmergencyNumber: string | null;
    NextOfKinName: string | null;
    NextOfKinGender: "Male" | "Female" | "Other" | null;
    NextOfKinPhoneNumber: string | null;
    NextOfKinEmailAddress: string | null;
}
