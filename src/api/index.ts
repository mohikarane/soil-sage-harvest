import { PredictionInput, PredictionResult } from "@/utils/modelUtils";

// Base URL for API calls
const API_BASE_URL = "/api";

// API endpoints
export const API_ENDPOINTS = {
  PREDICT_FERTILITY: `${API_BASE_URL}/predict`,
  DISTRICT_DATA: `${API_BASE_URL}/districts`,
  STATE_DATA: `${API_BASE_URL}/states`,
  MODEL_INFO: `${API_BASE_URL}/model/info`,
};

// Error handling helper
const handleApiError = (error: unknown): never => {
  console.error("API Error:", error);
  if (error instanceof Error) {
    throw new Error(`API request failed: ${error.message}`);
  }
  throw new Error("API request failed with unknown error");
};

// API function to predict fertility (Now always calls Flask API)
export const predictFertilityAPI = async (input: PredictionInput): Promise<PredictionResult> => {
  try {
    const response = await fetch(API_ENDPOINTS.PREDICT_FERTILITY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};
