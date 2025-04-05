import React from "react";

const states = ["Maharashtra", "Punjab", "Assam", "Kerala", "Jharkhand"];

interface IndiaMapProps {
  onStateSelect: (state: string) => void;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ onStateSelect }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Select a State</h2>
      <div className="grid grid-cols-3 gap-2">
        {states.map((state) => (
          <button
            key={state}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => onStateSelect(state)}
          >
            {state}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IndiaMap;
