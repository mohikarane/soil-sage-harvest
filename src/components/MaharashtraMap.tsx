import React from "react";

const districts = ["Pune", "Mumbai", "Nagpur", "Nashik", "Jalgaon"];

interface MaharashtraMapProps {
  onDistrictSelect: (district: string) => void;
}

const MaharashtraMap: React.FC<MaharashtraMapProps> = ({ onDistrictSelect }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Select a District</h2>
      <div className="grid grid-cols-3 gap-2">
        {districts.map((district) => (
          <button
            key={district}
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
            onClick={() => onDistrictSelect(district)}
          >
            {district}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MaharashtraMap;
