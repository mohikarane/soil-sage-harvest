
import { PredictionInput, PredictionResult } from "@/utils/modelUtils";

// Base URL for API calls
const API_BASE_URL = "/api";

// Check if we're in development mode and use mock API
const isDevelopment = import.meta.env.DEV;

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

// API function to predict fertility
export const predictFertilityAPI = async (input: PredictionInput): Promise<PredictionResult> => {
  try {
    // In development, use the local mock implementation
    if (isDevelopment) {
      // Import dynamically to avoid circular dependencies
      const { predictFertility } = await import("@/utils/modelUtils");
      return predictFertility(input);
    }

    // In production, make the actual API call
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

// Get district data
export const getDistrictDataAPI = async (districtName: string): Promise<any[]> => {
  try {
    // In development, use mock data
    if (isDevelopment) {
      const { getDistrictData } = await import("@/lib/mockData");
      return getDistrictData(districtName);
    }

    // Production API call
    const response = await fetch(`${API_ENDPOINTS.DISTRICT_DATA}?name=${encodeURIComponent(districtName)}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Get state data
export const getStateDataAPI = async (stateName: string): Promise<any[]> => {
  try {
    // In development, use mock data
    if (isDevelopment) {
      const { getStateData } = await import("@/lib/mockData");
      return getStateData(stateName);
    }

    // Production API call
    const response = await fetch(`${API_ENDPOINTS.STATE_DATA}?name=${encodeURIComponent(stateName)}`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Get all district names
export const getDistrictNamesAPI = async (): Promise<string[]> => {
  try {
    // In development, use mock data
    if (isDevelopment) {
      const { getDistrictNames } = await import("@/lib/mockData");
      return getDistrictNames();
    }

    // Production API call
    const response = await fetch(`${API_ENDPOINTS.DISTRICT_DATA}/names`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Get all state names
export const getStateNamesAPI = async (): Promise<string[]> => {
  try {
    // In development, use mock data
    if (isDevelopment) {
      const { getStateNames } = await import("@/lib/mockData");
      return getStateNames();
    }

    // Production API call
    const response = await fetch(`${API_ENDPOINTS.STATE_DATA}/names`);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

// Get model information
export const getModelInfoAPI = async (): Promise<{
  name: string;
  version: string;
  accuracy: number;
  lastUpdated: string;
}> => {
  try {
    // In development, return mock data
    if (isDevelopment) {
      return {
        name: "XGBoost Land Fertility Predictor",
        version: "1.0.0",
        accuracy: 0.92,
        lastUpdated: "2023-12-15",
      };
    }

    // Production API call
    const response = await fetch(API_ENDPOINTS.MODEL_INFO);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};
