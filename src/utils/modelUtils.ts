
// Simulate model prediction using mock data

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

// Simplified mock prediction function (in real app, this would call the actual model)
export const predictFertility = (input: PredictionInput): PredictionResult => {
  const { n, p, k, ndvi, rainfall } = input;
  
  // Very simplified logic - in real app, this would use the actual model
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
  
  // Mock similar region (would be based on actual data)
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
