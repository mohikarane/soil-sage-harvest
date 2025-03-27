
// Define fertility classes
export type FertilityClass = 'Low' | 'Medium' | 'High';

export interface PredictionInput {
  n: number;
  p: number;
  k: number;
  ndvi: number;
  rainfall: number;
}

export interface PredictionResult {
  fertilityClass: FertilityClass;
  confidence: number;
  similarRegion?: {
    name: string;
    similarity: number;
  }
}

// Simpler, more focused model prediction function
export const predictFertility = (input: PredictionInput): PredictionResult => {
  const { n, p, k, ndvi, rainfall } = input;
  
  // Simplified logic - in a real app, this would use the actual model
  let fertilityScore = 0;
  
  // N contribution (0-100 scale)
  if (n < 140) fertilityScore += (n / 140) * 33;
  else if (n <= 280) fertilityScore += ((n - 140) / 140) * 33 + 33;
  else fertilityScore += 66;
  
  // P contribution (0-100 scale)
  if (p < 10) fertilityScore += (p / 10) * 33;
  else if (p <= 25) fertilityScore += ((p - 10) / 15) * 33 + 33;
  else fertilityScore += 66;
  
  // K contribution (0-100 scale)
  if (k < 140) fertilityScore += (k / 140) * 33;
  else if (k <= 280) fertilityScore += ((k - 140) / 140) * 33 + 33;
  else fertilityScore += 66;
  
  // NDVI contribution
  if (ndvi < 0.4) fertilityScore += (ndvi / 0.4) * 50;
  else fertilityScore += 50;
  
  // Rainfall contribution
  if (rainfall < 800) fertilityScore += (rainfall / 800) * 50;
  else fertilityScore += 50;
  
  // Calculate final score (0-100)
  fertilityScore = Math.min(100, fertilityScore / 5);
  
  // Determine fertility class based on score
  let fertilityClass: FertilityClass;
  if (fertilityScore < 40) fertilityClass = 'Low';
  else if (fertilityScore < 70) fertilityClass = 'Medium';
  else fertilityClass = 'High';
  
  // Calculate confidence (60-95%)
  const confidence = 60 + (fertilityScore / 100) * 35;
  
  // Find similar region (would be based on actual data)
  const similarRegion = {
    name: fertilityClass === 'High' ? 'Punjab' : 
          fertilityClass === 'Medium' ? 'Maharashtra' : 'Rajasthan',
    similarity: confidence
  };
  
  return {
    fertilityClass,
    confidence,
    similarRegion
  };
};

// Helper function to normalize input data before prediction
export const normalizeInputData = (input: PredictionInput): PredictionInput => {
  return {
    n: Math.max(0, Math.min(400, input.n)),
    p: Math.max(0, Math.min(30, input.p)),
    k: Math.max(0, Math.min(400, input.k)),
    ndvi: Math.max(0, Math.min(1, input.ndvi)),
    rainfall: Math.max(0, Math.min(2000, input.rainfall))
  };
};

// Helper to classify a single nutrient value
export const classifyNutrient = (
  value: number, 
  type: 'n' | 'p' | 'k'
): 'Low' | 'Medium' | 'High' => {
  if (type === 'n') {
    if (value < 140) return 'Low';
    if (value <= 280) return 'Medium';
    return 'High';
  } else if (type === 'p') {
    if (value < 10) return 'Low';
    if (value <= 25) return 'Medium';
    return 'High';
  } else { // k
    if (value < 140) return 'Low';
    if (value <= 280) return 'Medium';
    return 'High';
  }
};

// Helper to get recommended nutrient levels based on fertility class
export const getRecommendedNutrientLevels = (
  fertilityClass: FertilityClass
): { n: [number, number], p: [number, number], k: [number, number] } => {
  switch (fertilityClass) {
    case 'Low':
      return {
        n: [200, 300],
        p: [15, 25],
        k: [200, 300]
      };
    case 'Medium':
      return {
        n: [150, 250],
        p: [10, 20],
        k: [150, 250]
      };
    case 'High':
      return {
        n: [100, 200],
        p: [5, 15],
        k: [100, 200]
      };
  }
};
