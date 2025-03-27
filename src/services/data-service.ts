
import { districtData, stateData, DistrictData, StateData } from "@/lib/mockData";

/**
 * Service for handling data operations
 * In a real implementation, this would fetch data from an API
 */
class DataService {
  private districtDataCache: Map<string, DistrictData[]> = new Map();
  private stateDataCache: Map<string, StateData[]> = new Map();
  
  constructor() {
    this.initializeCache();
  }
  
  /**
   * Preload data into cache for faster access
   */
  private initializeCache() {
    // Group district data by district name
    const districts = new Set(districtData.map(item => item.district));
    districts.forEach(district => {
      this.districtDataCache.set(
        district, 
        districtData.filter(item => item.district === district)
      );
    });
    
    // Group state data by state name
    const states = new Set(stateData.map(item => item.state));
    states.forEach(state => {
      this.stateDataCache.set(
        state, 
        stateData.filter(item => item.state === state)
      );
    });
  }
  
  /**
   * Get data for a specific district
   */
  getDistrictData(districtName: string): DistrictData[] {
    return this.districtDataCache.get(districtName) || [];
  }
  
  /**
   * Get data for a specific state
   */
  getStateData(stateName: string): StateData[] {
    return this.stateDataCache.get(stateName) || [];
  }
  
  /**
   * Get all district names
   */
  getDistrictNames(): string[] {
    return Array.from(this.districtDataCache.keys());
  }
  
  /**
   * Get all state names
   */
  getStateNames(): string[] {
    return Array.from(this.stateDataCache.keys());
  }
  
  /**
   * Get all district data
   */
  getAllDistrictData(): DistrictData[] {
    return districtData;
  }
  
  /**
   * Get all state data
   */
  getAllStateData(): StateData[] {
    return stateData;
  }
  
  /**
   * Find similar regions based on input parameters
   */
  findSimilarRegions(params: {
    n: number;
    p: number;
    k: number;
    ndvi: number;
    rainfall: number;
  }, limit = 3): Array<{ name: string; similarity: number; type: 'district' | 'state' }> {
    const allData = [
      ...districtData.map(d => ({ ...d, type: 'district' as const, name: d.district })),
      ...stateData.map(s => ({ ...s, type: 'state' as const, name: s.state }))
    ];
    
    // Calculate similarity score (Euclidean distance)
    const withSimilarity = allData.map(item => {
      // Calculate normalized distance for each parameter
      const nDiff = Math.abs(item.n - params.n) / 400; // Max N is around 400
      const pDiff = Math.abs(item.p - params.p) / 30;  // Max P is around 30
      const kDiff = Math.abs(item.k - params.k) / 400; // Max K is around 400
      const ndviDiff = Math.abs(item.ndvi - params.ndvi);
      const rainfallDiff = Math.abs(item.rainfall - params.rainfall) / 2000; // Max rainfall is around 2000
      
      // Combined distance (lower is more similar)
      const distance = Math.sqrt(
        nDiff * nDiff + 
        pDiff * pDiff + 
        kDiff * kDiff + 
        ndviDiff * ndviDiff +
        rainfallDiff * rainfallDiff
      );
      
      // Convert to similarity score (higher is more similar)
      const similarity = Math.max(0, 100 - (distance * 100));
      
      return {
        name: item.name,
        type: item.type,
        similarity: similarity,
        fertilityClass: item.fertilityClass
      };
    });
    
    // Sort by similarity (descending) and return top matches
    return withSimilarity
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  }
}

// Create singleton instance
export const dataService = new DataService();

export default dataService;
