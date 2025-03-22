"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHealthStatus } from "@/store/slices/healthStatus";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HealthStatus } from "@/types/healthSure";
import { healthStatusSchema } from "@/features/healthStatus";
import { Button, Box, CircularProgress } from "@mui/material";

interface Props {
  onNext: (isValid?: boolean) => void; 
  onBack: () => void;
}
// ✅ Define default values outside to prevent re-renders
const defaultValues: HealthStatus = {
  healthCondition: "",
  vitalSigns: {
    bloodPressure: "",
    heartRate: null,
    temperature: null,
    sugar: null,
    oxygen: null,
    cholesterol: null,
    BMI: null,
  },
  allergies: [],
};

export default function HealthStatusEdit({ onNext, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors, isValid},
    watch,
  } = useForm<HealthStatus>({
    resolver: zodResolver(healthStatusSchema),
    mode: "onChange",
    defaultValues,
  });

  // Watching the form values
  const formValues = watch();

  // ✅ Compare form values with default values
  useEffect(() => {
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(defaultValues));
  }, [formValues]);

  // Form submission logic
  const handleFormSubmit = (data: HealthStatus) => {
    setIsLoading(true);
    dispatch(setHealthStatus(data));
    setIsLoading(false);
    onNext(); // Move to the next step
  };

  // ✅ Fix: Explicitly define the fields to avoid TS2345 error
  const vitalSignFields: { label: string; name: keyof HealthStatus["vitalSigns"] }[] = [
    { label: "Blood Pressure", name: "bloodPressure" },
    { label: "Heart Rate", name: "heartRate" },
    { label: "Temperature", name: "temperature" },
    { label: "Sugar Level", name: "sugar" },
    { label: "Oxygen Level", name: "oxygen" },
    { label: "Cholesterol", name: "cholesterol" },
    { label: "BMI", name: "BMI" },
  ];

  return (
    <div className="edit-basic-info">
      <h2>Edit Health Status</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)}  className="form-health-container-main">
     <div className="form-health-container">
     <div className="form-health-sub">
          <label>Health Condition:</label>
          <input {...register("healthCondition")} />
          {errors.healthCondition && <p className="red-error">{errors.healthCondition.message}</p>}
        </div>

       
        <div className="form-health-sub">
          <label>Allergies:</label>
          <input {...register("allergies")} />
          {errors.allergies && <p className="red-error">{errors.allergies.message}</p>}
        </div>

        <div className="form-health-sub2">
       <h3>Vital Signs</h3>
        <div className="form-health-vital">
        {vitalSignFields.map(({ label, name }) => (
          <div key={name} className="form-health-vital-2">
            <label>{label}:</label>
            <input type="number" {...register(`vitalSigns.${name}`)} />
            {errors.vitalSigns?.[name] && <p className="red-error">{errors.vitalSigns[name]?.message}</p>}
          </div>
        ))}
        </div>

       </div>

     </div>
          {/* Navigation Buttons */}
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button onClick={onBack} variant="outlined">Back</Button>
                  <Button type="submit" variant="contained" disabled={!isValid || !isModified || isLoading}>
                    {isLoading ? <CircularProgress size={20} /> : "Next"}
                  </Button>
                </Box>
      </form>
    </div>
  );
}
