// Mock data for visualization purposes

// District data (2007-2017)
export interface DistrictData {
  year: number;
  district: string;
  n: number;
  p: number;
  k: number;
  ndvi: number;
  rainfall: number;
  fertilityClass: 'Low' | 'Medium' | 'High';
}

// State data (2003-2013)
export interface StateData {
  year: number;
  state: string;
  rainfall: number;
  ndvi: number;
  n: number;
  p: number;
  k: number;
  fertilityClass: 'Low' | 'Medium' | 'High';
}

// Generate mock data for districts
export const generateDistrictData = (): DistrictData[] => {
  const districts = ['Pune', 'Mumbai', 'Nagpur', 'Thane', 'Nashik'];
  const years = Array.from({ length: 11 }, (_, i) => 2007 + i);
  
  return districts.flatMap(district => 
    years.map(year => {
      // Add some randomness but keep trends
      const yearIndex = year - 2007;
      const districtFactor = districts.indexOf(district) / districts.length;
      
      // N, P, K values increase slightly over time with random fluctuations
      const n = Math.round(150 + yearIndex * 5 * (1 + districtFactor) + Math.random() * 50 - 25);
      const p = Math.round(15 + yearIndex * 0.5 * (1 + districtFactor) + Math.random() * 5 - 2.5);
      const k = Math.round(160 + yearIndex * 6 * (1 + districtFactor) + Math.random() * 40 - 20);
      
      // NDVI increases slightly over time (0-1 scale)
      const ndvi = +(0.4 + yearIndex * 0.01 * (1 + districtFactor) + Math.random() * 0.05 - 0.025).toFixed(2);
      
      // Rainfall fluctuates around baseline
      const rainfall = Math.round(1000 + (Math.random() * 400 - 200) * (1 + districtFactor * 0.5));
      
      // Determine fertility class based on parameters
      let fertilityClass: 'Low' | 'Medium' | 'High';
      const fertScore = n/280 + p/25 + k/280 + ndvi + rainfall/2000;
      
      if (fertScore < 2.5) fertilityClass = 'Low';
      else if (fertScore < 3.5) fertilityClass = 'Medium';
      else fertilityClass = 'High';
      
      return {
        year,
        district,
        n,
        p,
        k,
        ndvi,
        rainfall,
        fertilityClass,
      };
    })
  );
};

// Generate mock data for states
export const generateStateData = (): StateData[] => {
  const states = ['Maharashtra', 'Punjab', 'Gujarat', 'Karnataka', 'Rajasthan'];
  const years = Array.from({ length: 11 }, (_, i) => 2003 + i);
  
  return states.flatMap(state => 
    years.map(year => {
      // Add some randomness but keep trends
      const yearIndex = year - 2003;
      const stateFactor = states.indexOf(state) / states.length;
      
      // N, P, K values with trends specific to each state
      const n = Math.round(140 + yearIndex * 4 * (1 + stateFactor) + Math.random() * 40 - 20);
      const p = Math.round(12 + yearIndex * 0.6 * (1 + stateFactor) + Math.random() * 4 - 2);
      const k = Math.round(150 + yearIndex * 5 * (1 + stateFactor) + Math.random() * 30 - 15);
      
      // NDVI with slight upward trend
      const ndvi = +(0.35 + yearIndex * 0.015 * (1 + stateFactor) + Math.random() * 0.04 - 0.02).toFixed(2);
      
      // Rainfall with state-specific patterns
      const rainfall = Math.round(900 + stateFactor * 400 + (Math.random() * 300 - 150));
      
      // Determine fertility class
      let fertilityClass: 'Low' | 'Medium' | 'High';
      const fertScore = n/280 + p/25 + k/280 + ndvi + rainfall/2000;
      
      if (fertScore < 2.5) fertilityClass = 'Low';
      else if (fertScore < 3.5) fertilityClass = 'Medium';
      else fertilityClass = 'High';
      
      return {
        year,
        state,
        rainfall,
        ndvi,
        n,
        p,
        k,
        fertilityClass,
      };
    })
  );
};

// Cache the generated data
export const districtData = generateDistrictData();
export const stateData = generateStateData();

// Methods to get data subsets
export const getDistrictData = (district: string) => 
  districtData.filter(d => d.district === district);

export const getStateData = (state: string) => 
  stateData.filter(s => s.state === state);

export const getDistrictNames = () => 
  [...new Set(districtData.map(d => d.district))];

export const getStateNames = () => 
  [...new Set(stateData.map(s => s.state))];
