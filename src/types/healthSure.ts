export interface HealthStatus {
  healthCondition: string | null;
  vitalSigns: {
    bloodPressure: string | null;
    heartRate: number | null;
    temperature: number | null;
    sugar: number | null;
    oxygen: number | null;
    cholesterol: number | null;
    BMI: number | null;
  };
  allergies: string[];
}
