"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMedicalHistory } from "@/store/slices/medicalHistory";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MedicalHistory } from "@/types/medicalHistory";
import { medicalHistorySchema } from "@/features/medicalHistorySchema";
import { Button, Box, CircularProgress } from "@mui/material";

interface Props {
    onNext: (isValid?: boolean) => void; 
    onBack: () => void;
  }

const defaultValues: MedicalHistory = {
  pastDiagnoses: [],
  surgeries: [],
  medications: [],
  familyHistory: [],
};

export default function MedicalHistoryEdit({ onNext, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<MedicalHistory>({
    resolver: zodResolver(medicalHistorySchema),
    mode: "onChange",
    defaultValues,
  });

  const formValues = watch();

  useEffect(() => {
    setIsModified(JSON.stringify(formValues) !== JSON.stringify(defaultValues));
  }, [formValues]);

  const handleFormSubmit = (data: MedicalHistory) => {
    setIsLoading(true);
    dispatch(setMedicalHistory(data));
    setTimeout(() => {
      setIsLoading(false);
      onNext(true);
    }, 1000);
  };

  return (
    <div className="medical-history-edit-container">
      <h2>Edit Medical History</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <label>Past Diagnoses</label>
          <input type="text" {...register("pastDiagnoses.0")} placeholder="Diagnosis 1" />
          <input type="text" {...register("pastDiagnoses.1")} placeholder="Diagnosis 2" />
          {errors.pastDiagnoses && <p>{errors.pastDiagnoses.message}</p>}
        </div>

        <div>
          <label>Surgeries</label>
          <input type="text" {...register("surgeries.0")} placeholder="Surgery 1" />
          <input type="text" {...register("surgeries.1")} placeholder="Surgery 2" />
          {errors.surgeries && <p>{errors.surgeries.message}</p>}
        </div>

        <div>
          <label>Medications</label>
          <input type="text" {...register("medications.0.name")} placeholder="Medication Name" />
          <input type="text" {...register("medications.0.dosage")} placeholder="Dosage" />
          <input type="text" {...register("medications.0.frequency")} placeholder="Frequency" />
          {errors.medications && <p>{errors.medications.message}</p>}
        </div>

        <div>
          <label>Family History</label>
          <input type="text" {...register("familyHistory.0")} placeholder="Condition 1" />
          <input type="text" {...register("familyHistory.1")} placeholder="Condition 2" />
          {errors.familyHistory && <p>{errors.familyHistory.message}</p>}
        </div>

        {/* Navigation Buttons */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={onBack} variant="outlined" className="back-btn">Back</Button>
          <Button type="submit" variant="contained" disabled={!isValid || !isModified || isLoading}>
            {isLoading ? <CircularProgress size={20} /> : "Next"}
          </Button>
        </Box>
      </form>
    </div>
  );
}
