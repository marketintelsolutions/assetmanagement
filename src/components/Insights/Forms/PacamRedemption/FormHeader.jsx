// FormHeader.jsx
import React from "react";

const FormHeader = () => {
  return (
    <div className="bg-white rounded-t-lg shadow-lg p-6 border-b-4 border-blue-600">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md">
          <h1 className="text-xl font-bold">PACAM Balanced Fund</h1>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800">
        REDEMPTION FORM
      </h2>
    </div>
  );
};

export default FormHeader;
