import React from "react";
import { Globe } from "lucide-react";

const EurobondFormHeader = () => {
  return (
    <div className="bg-white rounded-t-lg shadow-lg p-6 border-b-4 border-blue-600">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2">
          <Globe size={24} />
          <h1 className="text-xl font-bold">PACAM EUROBOND FUND</h1>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        REDEMPTION FORM
      </h2>
      <p className="text-center text-blue-600 mt-2 font-medium">
        International Bond Fund Unit Redemption
      </p>
    </div>
  );
};

export default EurobondFormHeader;
