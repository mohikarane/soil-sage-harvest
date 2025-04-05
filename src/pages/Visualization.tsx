import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function Visualization() {
  const [category, setCategory] = useState<"state" | "district">("state");
  const [names, setNames] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchNames = async () => {
      const uniqueNames =
        category === "state"
          ? ["Maharashtra", "Punjab", "Assam", "Kerala", "Jharkhand"]
          : [
              "Pune", "Nasik", "Thane", "Jalgaon", "Nanded", "Ratnagiri",
              "Raigad", "Dhule", "Ahmednagar", "Satara", "Sangli", "Solapur",
              "Kolhapur", "Parbhani", "Beed", "Buldhana", "Akola", "Amravati",
              "Yavatmal", "Wardha", "Nagpur", "Bhandara", "Chandrapur",
            ];

      setNames(uniqueNames);
      setSelectedName(uniqueNames[0]);
    };

    fetchNames();
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_fertility_data?${category}=${selectedName}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      const sortedData = result.sort((a: any, b: any) => a.Year - b.Year);
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fertilityLevels = ["Low", "Medium", "High"];

  const renderMultiLineChart = () => (
    <div className="w-full p-4">
      <h3 className="text-lg font-semibold mb-2 text-center">
        {selectedName} - N, P, K, NDVI, Rainfall Level Over Years
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 50, left: 20, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          
          {/* X-Axis */}
          <XAxis dataKey="Year" tick={{ fontSize: 12 }} />
  
          {/* Left Y-Axis for N, P, K, NDVI */}
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12 }}
            label={{ value: "N, P, K, NDVI", angle: -90, position: "insideLeft" }}
          />
  
          {/* Right Y-Axis for Rainfall */}
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            label={{ value: "Rainfall", angle: -90, position: "insideRight" }}
          />
  
          <Tooltip />
  
          {/* Lines for N, P, K, NDVI (Left Y-Axis) */}
          <Line yAxisId="left" type="monotone" dataKey="N" stroke="#8884d8" strokeWidth={2} />
          <Line yAxisId="left" type="monotone" dataKey="P" stroke="#ff7300" strokeWidth={2} />
          <Line yAxisId="left" type="monotone" dataKey="K" stroke="#ffbb28" strokeWidth={2} />
          <Line yAxisId="left" type="monotone" dataKey="Mean_NDVI" stroke="#ff4560" strokeWidth={2} />
  
          {/* Line for Rainfall (Right Y-Axis) */}
          <Line yAxisId="right" type="monotone" dataKey="ANNUALRAIN" stroke="#00c49f" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderChart = (
    title: string,
    dataKey: string,
    color: string,
    isFertilityChart = false
  ) => (
    <div className="w-full md:w-1/2 p-4">
      <h3 className="text-lg font-semibold mb-2 text-center">
        {selectedName} - {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {isFertilityChart ? (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Year"
              tick={{ fontSize: 12 }}
              label={{ value: "Year", position: "insideBottom", offset: -5 }}
              tickFormatter={(year) => year.toString()}
              interval={0}
            />
            <YAxis
              type="category"
              dataKey="Fertility_Class"
              domain={fertilityLevels}
              ticks={fertilityLevels}
              tick={{ fontSize: 12 }}
              label={{ value: "Fertility Level", angle: -90, position: "insideLeft" }}
            />
            <Tooltip formatter={(value) => `Fertility: ${value}`} />
            <Bar dataKey="Fertility_Class" fill={color} isAnimationActive={false} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Year"
              tick={{ fontSize: 12 }}
              label={{ value: "Year", position: "insideBottom", offset: -5 }}
              tickFormatter={(year) => year.toString()}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ value: title, angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} activeDot={{ r: 6 }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">
        📊 Land Fertility Data Visualization
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-4 mb-8">
        {/* Category Selection */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-gray-700 font-medium">
            Select Category
          </label>
          <select
            id="category"
            aria-label="Select Category"
            title="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as "state" | "district")}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="state">State</option>
            <option value="district">District</option>
          </select>
        </div>

        {/* Name Selection */}
        <div className="flex flex-col">
          <label htmlFor="nameSelect" className="text-gray-700 font-medium">
            Select {category === "state" ? "State" : "District"}
          </label>
          <select
            id="nameSelect"
            aria-label={`Select ${category === "state" ? "State" : "District"}`}
            title={`Select ${category === "state" ? "State" : "District"}`}
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            {names.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
          Fetch Data
        </button>
      </form>

      {data.length > 0 ? (
        <div className="flex flex-wrap justify-center w-full">
          {renderChart("Fertility Level Over Years", "Fertility_Class", "#82ca9d", true)}
          {renderChart("Nitrogen (N) Level Over Years", "N", "#8884d8")}
          {renderChart("Phosphorus (P) Level Over Years", "P", "#ff7300")}
          {renderChart("Potassium (K) Level Over Years", "K", "#ffbb28")}
          {renderChart("Rainfall Level Over Years", "ANNUALRAIN", "#00c49f")}
          {renderChart("NDVI Level Over Years", "Mean_NDVI", "#ff4560")}
          {renderMultiLineChart("N, P, K, NDVI, Rainfall Level Over Years", [
            { key: "N", color: "#8884d8" },
            { key: "P", color: "#ff7300" },
            { key: "K", color: "#ffbb28" },
            { key: "ANNUALRAIN", color: "#00c49f" },
            { key: "Mean_NDVI", color: "#ff4560" },
          ])}
        </div>
      ) : (
        <p className="text-gray-600">No data to display. Please select and fetch data.</p>
      )}
    </div>
  );
}
