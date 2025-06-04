import React from "react";
import { DollarSign } from "lucide-react";

const MoneyMarketFormHeader = () => {
  return (
    <div className="bg-white rounded-t-lg shadow-lg p-6 border-b-4 border-emerald-600">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-emerald-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2">
          <DollarSign size={24} />
          <h1 className="text-xl font-bold">PACAM MONEY MARKET FUND</h1>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        REDEMPTION FORM
      </h2>
      <p className="text-center text-emerald-600 mt-2 font-medium">
        High Liquidity Fund Unit Redemption
      </p>
    </div>
  );
};

export default MoneyMarketFormHeader;
