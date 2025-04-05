import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Predictor = () => {
  const [formData, setFormData] = useState({
    n: "",
    p: "",
    k: "",
    ndvi: "",
    rainfall: "",
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrediction(null);
    setGeminiResponse(null);
    setError(null);

    console.log("Submitting Data:", formData);

    try {
      // Step 1: Fetch Prediction from Flask Backend
      const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          n: Number(formData.n),
          p: Number(formData.p),
          k: Number(formData.k),
          ndvi: Number(formData.ndvi),
          rainfall: Number(formData.rainfall),
        }),
      });

      if (!predictionResponse.ok) throw new Error("Failed to fetch prediction");

      const predictionData = await predictionResponse.json();
      setPrediction(predictionData.prediction);

      // Step 2: Fetch Gemini AI Response
      const geminiResponse = await fetch("http://127.0.0.1:5000/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          n: Number(formData.n),
          p: Number(formData.p),
          k: Number(formData.k),
          ndvi: Number(formData.ndvi),
          rainfall: Number(formData.rainfall),
        }),
      });

      if (!geminiResponse.ok) throw new Error("Failed to fetch Gemini response");

      const geminiData = await geminiResponse.json();
      setGeminiResponse(geminiData.gemini_response);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Error fetching prediction");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4 text-center">Predict Land Fertility</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">Nitrogen (N) Level</label>
            <Input type="number" name="n" value={formData.n} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-sm font-medium">Phosphorus (P) Level</label>
            <Input type="number" name="p" value={formData.p} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-sm font-medium">Potassium (K) Level</label>
            <Input type="number" name="k" value={formData.k} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-sm font-medium">NDVI (0-1)</label>
            <Input type="number" name="ndvi" value={formData.ndvi} onChange={handleChange} required min="0" max="1" step="0.01" />
          </div>

          <div>
            <label className="block text-sm font-medium">Annual Rainfall (mm)</label>
            <Input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required />
          </div>

          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Predict Fertility</Button>
        </form>

        {prediction && (
          <div className="mt-4 p-3 text-center bg-green-100 text-green-700 rounded">
            <strong>Predicted Fertility Class:</strong> {prediction}
          </div>
        )}
        {geminiResponse && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-3">💡 Insights</h3>
            <div className="prose space-y-2 text-sm leading-relaxed">
              {geminiResponse.split("\n").map((line, index) => (
                <p key={index} className="ml-4">{line.startsWith("**") ? <strong>{line.replace(/\*\*/g, "")}</strong> : line}</p>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 text-center bg-red-100 text-red-700 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}


        <div className="mt-6">
          <h3 className="text-lg font-semibold text-center">Threshold Values</h3>
          <div className="mt-2 bg-gray-100 p-4 rounded-lg text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2">Factors</th>
                  <th className="p-2">Low</th>
                  <th className="p-2">Medium</th>
                  <th className="p-2">High</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Nitrogen (N)</td>
                  <td className="p-2">&lt; 240</td>
                  <td className="p-2">240 - 480</td>
                  <td className="p-2">&gt; 480</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Phosphorus (P)</td>
                  <td className="p-2">&lt; 11</td>
                  <td className="p-2">11 - 22</td>
                  <td className="p-2">&gt; 22</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Potassium (K)</td>
                  <td className="p-2">&lt; 110</td>
                  <td className="p-2">110 - 280</td>
                  <td className="p-2">&gt; 280</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Mean NDVI</td>
                  <td className="p-2">&lt; 0.4</td>
                  <td className="p-2">0.4 - 0.6</td>
                  <td className="p-2">&gt; 0.6</td>
                </tr>
                <tr>
                  <td className="p-2">Annual Rainfall</td>
                  <td className="p-2">&lt; 400</td>
                  <td className="p-2">400 - 1600</td>
                  <td className="p-2">&gt; 1600</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predictor;
