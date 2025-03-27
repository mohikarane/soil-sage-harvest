
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import SectionHeading from "@/components/ui/SectionHeading";
import { BarChart2, Droplets, LineChart, AlertCircle } from "lucide-react";
import { PredictionInput, PredictionResult, predictFertility } from "@/utils/modelUtils";
import { toast } from "sonner";

const createLabels = (
  min: number,
  max: number,
  count: number
): { value: number; label: string }[] => {
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, i) => ({
    value: min + step * i,
    label: (min + step * i).toString(),
  }));
};

const fertilizerRecommendations = {
  Low: [
    "Increase nitrogen application by 30-40% of standard recommendation",
    "Apply phosphorus-rich fertilizers like DAP",
    "Consider using slow-release fertilizers for better nutrient uptake",
    "Incorporate organic matter to improve soil structure",
  ],
  Medium: [
    "Apply balanced NPK fertilizer at standard rates",
    "Consider split application of nitrogen fertilizers",
    "Integrate organic compost with chemical fertilizers",
    "Monitor soil moisture levels for optimal nutrient absorption",
  ],
  High: [
    "Reduce fertilizer application by 10-20% from standard recommendation",
    "Focus on maintaining rather than increasing fertility levels",
    "Use precision agriculture techniques to apply fertilizers only where needed",
    "Implement crop rotation to prevent nutrient depletion",
  ],
};

const Predictor = () => {
  const [input, setInput] = useState<PredictionInput>({
    n: 180,
    p: 15,
    k: 200,
    ndvi: 0.5,
    rainfall: 1000,
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSliderChange = (name: keyof PredictionInput, value: number[]) => {
    setInput((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleInputChange = (name: keyof PredictionInput, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setInput((prev) => ({ ...prev, [name]: numValue }));
    }
  };

  const handleSubmit = () => {
    try {
      const result = predictFertility(input);
      setPrediction(result);
      
      toast.success("Prediction generated successfully", {
        description: `Fertility class: ${result.fertilityClass} with ${result.confidence.toFixed(1)}% confidence`,
      });
    } catch (error) {
      toast.error("Error generating prediction", {
        description: "Please try again with different input values.",
      });
    }
  };

  const handleReset = () => {
    setInput({
      n: 180,
      p: 15,
      k: 200,
      ndvi: 0.5,
      rainfall: 1000,
    });
    setPrediction(null);
    toast.info("Input values reset to defaults");
  };

  const getFertilityColor = (className: string) => {
    switch (className) {
      case "Low":
        return "text-amber-500";
      case "Medium":
        return "text-blue-500";
      case "High":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getFertilityBgColor = (className: string) => {
    switch (className) {
      case "Low":
        return "bg-amber-50 border-amber-200";
      case "Medium":
        return "bg-blue-50 border-blue-200";
      case "High":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <SectionHeading
            pretitle="Soil Analysis"
            title="Land Fertility Prediction"
            description="Input soil parameters to predict fertility class and get recommendations"
            className="mb-12"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-2 transition-all duration-1000 delay-100 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-primary" />
                  Soil Parameters Input
                </CardTitle>
                <CardDescription>
                  Adjust the sliders or enter values directly to configure soil parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* N Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="n-input" className="text-base">
                      Nitrogen (N) - kg/ha
                    </Label>
                    <Input
                      id="n-input"
                      type="number"
                      className="w-20 text-center"
                      value={input.n}
                      onChange={(e) => handleInputChange("n", e.target.value)}
                    />
                  </div>
                  <Slider
                    id="n-slider"
                    min={0}
                    max={400}
                    step={1}
                    value={[input.n]}
                    onValueChange={(value) => handleSliderChange("n", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low (0)</span>
                    <span>Medium (200)</span>
                    <span>High (400)</span>
                  </div>
                </div>

                {/* P Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="p-input" className="text-base">
                      Phosphorus (P) - kg/ha
                    </Label>
                    <Input
                      id="p-input"
                      type="number"
                      className="w-20 text-center"
                      value={input.p}
                      onChange={(e) => handleInputChange("p", e.target.value)}
                    />
                  </div>
                  <Slider
                    id="p-slider"
                    min={0}
                    max={30}
                    step={0.1}
                    value={[input.p]}
                    onValueChange={(value) => handleSliderChange("p", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low (0)</span>
                    <span>Medium (15)</span>
                    <span>High (30)</span>
                  </div>
                </div>

                {/* K Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="k-input" className="text-base">
                      Potassium (K) - kg/ha
                    </Label>
                    <Input
                      id="k-input"
                      type="number"
                      className="w-20 text-center"
                      value={input.k}
                      onChange={(e) => handleInputChange("k", e.target.value)}
                    />
                  </div>
                  <Slider
                    id="k-slider"
                    min={0}
                    max={400}
                    step={1}
                    value={[input.k]}
                    onValueChange={(value) => handleSliderChange("k", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Low (0)</span>
                    <span>Medium (200)</span>
                    <span>High (400)</span>
                  </div>
                </div>

                {/* NDVI Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="ndvi-input" className="text-base">
                      NDVI (Vegetation Index)
                    </Label>
                    <Input
                      id="ndvi-input"
                      type="number"
                      className="w-20 text-center"
                      value={input.ndvi}
                      onChange={(e) => handleInputChange("ndvi", e.target.value)}
                    />
                  </div>
                  <Slider
                    id="ndvi-slider"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[input.ndvi]}
                    onValueChange={(value) => handleSliderChange("ndvi", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Poor (0)</span>
                    <span>Moderate (0.5)</span>
                    <span>Excellent (1)</span>
                  </div>
                </div>

                {/* Rainfall Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="rainfall-input" className="text-base">
                      Annual Rainfall (mm)
                    </Label>
                    <Input
                      id="rainfall-input"
                      type="number"
                      className="w-20 text-center"
                      value={input.rainfall}
                      onChange={(e) => handleInputChange("rainfall", e.target.value)}
                    />
                  </div>
                  <Slider
                    id="rainfall-slider"
                    min={0}
                    max={2000}
                    step={10}
                    value={[input.rainfall]}
                    onValueChange={(value) => handleSliderChange("rainfall", value)}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Arid (0)</span>
                    <span>Moderate (1000)</span>
                    <span>Heavy (2000)</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={handleSubmit} className="flex-1">
                    Generate Prediction
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="mr-2 h-5 w-5 text-primary" />
                  Prediction Results
                </CardTitle>
                <CardDescription>
                  Fertility class prediction based on input parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                {prediction ? (
                  <div className="space-y-6">
                    <div 
                      className={`text-center p-6 rounded-lg border-2 shadow-sm animate-scale-in ${getFertilityBgColor(prediction.fertilityClass)}`}>
                      <h3 className="text-2xl font-bold mb-2">
                        <span className={getFertilityColor(prediction.fertilityClass)}>
                          {prediction.fertilityClass}
                        </span> Fertility
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Prediction confidence: {prediction.confidence.toFixed(1)}%
                      </p>
                    </div>

                    {prediction.similarRegion && (
                      <div>
                        <h4 className="font-medium mb-2">Similar Region</h4>
                        <p className="text-sm">
                          Your soil parameters are similar to those found in{" "}
                          <span className="font-semibold">{prediction.similarRegion.name}</span> 
                          {" "}({Math.round(prediction.similarRegion.similarity)}% similarity)
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2">Fertilizer Recommendations</h4>
                      <ul className="text-sm space-y-2">
                        {fertilizerRecommendations[prediction.fertilityClass as keyof typeof fertilizerRecommendations].map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="mt-1 min-w-4">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                            </div>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-4 border border-dashed rounded-lg">
                    <Droplets className="h-12 w-12 text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Prediction Yet</h3>
                    <p className="text-muted-foreground text-sm">
                      Adjust the parameters and click "Generate Prediction" to see results
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <AlertCircle className="mr-2 h-4 w-4 text-primary" />
                  Interpretation Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Nitrogen (N)</h4>
                    <p className="text-muted-foreground">
                      Essential for leaf growth and protein formation. Values below 140 kg/ha are low, 140-280 kg/ha are moderate, above 280 kg/ha are high.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phosphorus (P)</h4>
                    <p className="text-muted-foreground">
                      Critical for root development and energy transfer. Values below 10 kg/ha are low, 10-25 kg/ha are moderate, above 25 kg/ha are high.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Potassium (K)</h4>
                    <p className="text-muted-foreground">
                      Important for overall plant health and drought resistance. Values below 140 kg/ha are low, 140-280 kg/ha are moderate, above 280 kg/ha are high.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">NDVI</h4>
                    <p className="text-muted-foreground">
                      Measures vegetation density and health. Values below 0.4 indicate poor vegetation, 0.4-0.6 moderate, above 0.6 indicate healthy vegetation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
