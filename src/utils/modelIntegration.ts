export interface PredictionInput {
  n: number;
  p: number;
  k: number;
  ndvi: number;
  rainfall: number;
}

export interface PredictionResult {
  fertility_class: string;
}

const API_URL = "http://127.0.0.1:5000/predict"; // Flask backend URL

export const predictFertility = async (input: PredictionInput): Promise<PredictionResult> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input), // Ensures the correct order
  });

  if (!response.ok) throw new Error("Failed to fetch prediction");

  return response.json();
};
