
// Define the API specific types

export interface ApiError {
  message: string;
  statusCode: number;
  details?: any;
}

export interface ModelInfo {
  name: string;
  version: string;
  accuracy: number;
  lastUpdated: string;
  features: string[];
  description: string;
}

export interface DatasetInfo {
  name: string;
  recordCount: number;
  years: [number, number]; // [startYear, endYear]
  source: string;
  lastUpdated: string;
}

// Define the structure expected for CSV uploads
export interface CsvUploadResponse {
  success: boolean;
  rowsProcessed: number;
  errors: string[];
  warningCount: number;
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

// Types for backend model management
export interface ModelTrainingRequest {
  datasetId: string;
  modelName: string;
  parameters: Record<string, any>;
  testSplit: number;
}

export interface ModelTrainingResponse {
  trainingId: string;
  estimatedTimeSeconds: number;
  status: "queued" | "processing" | "completed" | "failed";
}
