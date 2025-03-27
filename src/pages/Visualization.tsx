import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeading from "@/components/ui/SectionHeading";
import { BarChart, LineChart, PieChart, BarChart2, LineChart as LineChartIcon, AreaChart, AreaChart as AreaChartIcon, Database } from "lucide-react";
import { districtData, stateData, getDistrictNames, getStateNames, DistrictData, StateData } from "@/lib/mockData";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as ReBarChart, Bar, AreaChart as ReAreaChart, Area, PieChart as RePieChart, Pie, Cell } from "recharts";

const COLORS = ["#3c9144", "#7065d4", "#d4a65d", "#d46558"];

// Helper function to get color based on fertility class
const getFertilityColor = (fertilityClass: string) => {
  switch (fertilityClass) {
    case "Low": return "#d46558";
    case "Medium": return "#d4a65d";
    case "High": return "#3c9144";
    default: return "#7065d4";
  }
};

// Helper to get data for fertility trend
const getFertilityTrendData = (data: DistrictData[] | StateData[]) => {
  return data.map(item => ({
    year: "year" in item ? item.year : item.year,
    fertilityClass: item.fertilityClass,
    value: item.fertilityClass === "High" ? 3 : item.fertilityClass === "Medium" ? 2 : 1,
    color: getFertilityColor(item.fertilityClass)
  }));
};

// Helper to get data for nutrient trends
const getNutrientTrendData = (data: DistrictData[] | StateData[]) => {
  return data.map(item => ({
    year: "year" in item ? item.year : item.year,
    N: item.n,
    P: item.p,
    K: item.k,
  }));
};

// Helper to get data for environmental trends
const getEnvironmentalTrendData = (data: DistrictData[] | StateData[]) => {
  return data.map(item => ({
    year: "year" in item ? item.year : item.year,
    NDVI: item.ndvi,
    Rainfall: item.rainfall / 100, // Scale down rainfall for better visualization
  }));
};

// Helper to count fertility classes
const getFertilityDistribution = (data: DistrictData[] | StateData[]) => {
  const counts = { High: 0, Medium: 0, Low: 0 };
  
  data.forEach(item => {
    counts[item.fertilityClass as keyof typeof counts] += 1;
  });
  
  return [
    { name: "High", value: counts.High, color: "#3c9144" },
    { name: "Medium", value: counts.Medium, color: "#d4a65d" },
    { name: "Low", value: counts.Low, color: "#d46558" },
  ];
};

const Visualization = () => {
  // State for tab selection
  const [activeTab, setActiveTab] = useState("district");
  
  // State for district/state selection
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  
  // Data states
  const [districtNames, setDistrictNames] = useState<string[]>([]);
  const [stateNames, setStateNames] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<DistrictData[] | StateData[]>([]);
  
  // Animation state
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data
  useEffect(() => {
    const districts = getDistrictNames();
    const states = getStateNames();
    
    setDistrictNames(districts);
    setStateNames(states);
    
    if (districts.length > 0) {
      setSelectedDistrict(districts[0]);
    }
    
    if (states.length > 0) {
      setSelectedState(states[0]);
    }
    
    setIsLoaded(true);
  }, []);
  
  // Filter data based on selection
  useEffect(() => {
    if (activeTab === "district" && selectedDistrict) {
      const filtered = districtData.filter(d => d.district === selectedDistrict);
      setFilteredData(filtered);
    } else if (activeTab === "state" && selectedState) {
      const filtered = stateData.filter(s => s.state === selectedState);
      setFilteredData(filtered);
    }
  }, [activeTab, selectedDistrict, selectedState]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <SectionHeading
            pretitle="Data Analysis"
            title="Fertility Visualization"
            description="Explore historical trends of soil fertility parameters across states and districts"
            className="mb-12"
          />
        </div>
        
        <div className={`transition-all duration-1000 delay-100 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          {/* Data Selection Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-primary" />
                Data Selection
              </CardTitle>
              <CardDescription>
                Select the geographical level and location to visualize data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="district">District Data (2007-2017)</TabsTrigger>
                    <TabsTrigger value="state">State Data (2003-2013)</TabsTrigger>
                  </TabsList>
                  <TabsContent value="district" className="pt-4">
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districtNames.map(district => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TabsContent>
                  <TabsContent value="state" className="pt-4">
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {stateNames.map(state => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {filteredData.length > 0 && (
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1000 delay-200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            {/* Fertility Trend Chart */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChartIcon className="mr-2 h-5 w-5 text-primary" />
                  Fertility Trend Over Time
                </CardTitle>
                <CardDescription>
                  Changes in soil fertility classification over the years
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={getFertilityTrendData(filteredData)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 4]} ticks={[1, 2, 3]} tickFormatter={(value) => {
                      return value === 1 ? 'Low' : value === 2 ? 'Medium' : value === 3 ? 'High' : '';
                    }} />
                    <Tooltip
                      contentStyle={{ background: 'white', border: '1px solid #f1f1f1', borderRadius: '8px' }}
                      labelStyle={{ fontWeight: 'bold' }}
                      formatter={(value, name) => {
                        const valNum = Number(value);
                        return valNum === 1 ? 'Low' : valNum === 2 ? 'Medium' : 'High';
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Fertility Class"
                      stroke="#3c9144"
                      strokeWidth={2}
                      dot={{ r: 4, strokeWidth: 0, fill: "#3c9144" }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Nutrient Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-primary" />
                  Nutrient Trends (N, P, K)
                </CardTitle>
                <CardDescription>
                  Changes in soil nutrient levels over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart data={getNutrientTrendData(filteredData)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      domain={[0, 30]} 
                      tickFormatter={(value) => `${value}P`}
                    />
                    <Tooltip
                      contentStyle={{ background: 'white', border: '1px solid #f1f1f1', borderRadius: '8px' }}
                      labelStyle={{ fontWeight: 'bold' }}
                      formatter={(value, name) => [`${value} kg/ha`, name]}
                    />
                    <Legend />
                    <Bar 
                      yAxisId="left" 
                      dataKey="N" 
                      name="Nitrogen (N)" 
                      fill="#7065d4" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      yAxisId="right" 
                      dataKey="P" 
                      name="Phosphorus (P)" 
                      fill="#d4a65d" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      yAxisId="left" 
                      dataKey="K" 
                      name="Potassium (K)" 
                      fill="#d46558" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </ReBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Environmental Factors Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AreaChartIcon className="mr-2 h-5 w-5 text-primary" />
                  Environmental Factors
                </CardTitle>
                <CardDescription>
                  Changes in rainfall and NDVI over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ReAreaChart data={getEnvironmentalTrendData(filteredData)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                    <XAxis dataKey="year" />
                    <YAxis 
                      yAxisId="left"
                      orientation="left"
                      domain={[0, 1]}
                      tickFormatter={(value) => value.toFixed(1)}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      domain={[0, 20]}
                      tickFormatter={(value) => `${value * 100}mm`}
                    />
                    <Tooltip
                      contentStyle={{ background: 'white', border: '1px solid #f1f1f1', borderRadius: '8px' }}
                      labelStyle={{ fontWeight: 'bold' }}
                      formatter={(value, name) => [
                        name === "NDVI" ? value : `${(Number(value) * 100).toFixed(0)} mm`,
                        name === "NDVI" ? "NDVI" : "Rainfall"
                      ]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="NDVI"
                      yAxisId="left"
                      name="NDVI"
                      fill="#3c9144"
                      fillOpacity={0.2}
                      stroke="#3c9144"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="Rainfall"
                      yAxisId="right"
                      name="Rainfall"
                      fill="#7065d4"
                      fillOpacity={0.2}
                      stroke="#7065d4"
                      strokeWidth={2}
                    />
                  </ReAreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Fertility Distribution */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5 text-primary" />
                  Fertility Class Distribution
                </CardTitle>
                <CardDescription>
                  Distribution of fertility classifications over the years
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={getFertilityDistribution(filteredData)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {getFertilityDistribution(filteredData).map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: 'white', border: '1px solid #f1f1f1', borderRadius: '8px' }}
                        labelStyle={{ fontWeight: 'bold' }}
                        formatter={(value, name) => [`${value} years`, `${name} Fertility`]}
                      />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 p-4">
                  <h3 className="text-lg font-semibold mb-4">Summary</h3>
                  <div className="space-y-2">
                    {getFertilityDistribution(filteredData).map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span>{item.name} Fertility</span>
                        </div>
                        <div className="font-medium">
                          {item.value} years ({((item.value / filteredData.length) * 100).toFixed(0)}%)
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      {activeTab === "district" ? 
                        `${selectedDistrict} district shows predominantly ${
                          getFertilityDistribution(filteredData)[0].value > getFertilityDistribution(filteredData)[1].value && 
                          getFertilityDistribution(filteredData)[0].value > getFertilityDistribution(filteredData)[2].value ? 
                          getFertilityDistribution(filteredData)[0].name :
                          getFertilityDistribution(filteredData)[1].value > getFertilityDistribution(filteredData)[0].value && 
                          getFertilityDistribution(filteredData)[1].value > getFertilityDistribution(filteredData)[2].value ?
                          getFertilityDistribution(filteredData)[1].name :
                          getFertilityDistribution(filteredData)[2].name
                        } fertility over the 2007-2017 period.` : 
                        `${selectedState} state shows predominantly ${
                          getFertilityDistribution(filteredData)[0].value > getFertilityDistribution(filteredData)[1].value && 
                          getFertilityDistribution(filteredData)[0].value > getFertilityDistribution(filteredData)[2].value ? 
                          getFertilityDistribution(filteredData)[0].name :
                          getFertilityDistribution(filteredData)[1].value > getFertilityDistribution(filteredData)[0].value && 
                          getFertilityDistribution(filteredData)[1].value > getFertilityDistribution(filteredData)[2].value ?
                          getFertilityDistribution(filteredData)[1].name :
                          getFertilityDistribution(filteredData)[2].name
                        } fertility over the 2003-2013 period.`
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visualization;
