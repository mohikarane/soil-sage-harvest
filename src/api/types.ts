// Define the API response format
export interface PredictionResult {
  fertilityClass: "Low" | "Medium" | "High";
  confidence: number;
}

// API response for batch predictions
export interface BatchPredictionResponse {
  predictions: Array<{
    id: string;
    fertilityClass: string;
    confidence: number;
    parameters: Record<string, number>;
  }>;
  totalProcessed: number;
  processingTimeMs: number;
}
