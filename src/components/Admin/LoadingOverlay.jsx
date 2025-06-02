import React from "react";

const LoadingOverlay = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryBlue"></div>
          <p className="text-gray-700 font-medium">Processing...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
