import React from "react";
import { TrendingUp } from "lucide-react";

const EquityFormHeader = () => {
  return (
    <div className="bg-white rounded-t-lg shadow-lg p-6 border-b-4 border-green-600">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2">
          <TrendingUp size={24} />
          <h1 className="text-xl font-bold">PACAM EQUITY FUND</h1>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        REDEMPTION FORM
      </h2>
      <p className="text-center text-green-600 mt-2 font-medium">
        Equity Fund Unit Redemption
      </p>
    </div>
  );
};

export default EquityFormHeader;
