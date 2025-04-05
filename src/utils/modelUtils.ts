// Define fertility classes
export type FertilityClass = "Low" | "Medium" | "High";

export interface PredictionInput {
  n: number;
  p: number;
  k: number;
  ndvi: number;
  rainfall: number;
}

export interface PredictionResult {
  fertilityClass: string;
  confidence: number;
}

// Helper function to normalize input data before prediction
export const normalizeInputData = (input: PredictionInput): PredictionInput => {
  return {
    n: Math.max(0, Math.min(400, input.n)),
    p: Math.max(0, Math.min(30, input.p)),
    k: Math.max(0, Math.min(400, input.k)),
    ndvi: Math.max(0, Math.min(1, input.ndvi)),
    rainfall: Math.max(0, Math.min(2000, input.rainfall)),
  };
};
