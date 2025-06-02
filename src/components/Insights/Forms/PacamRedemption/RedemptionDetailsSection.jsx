// RedemptionDetailsSection.jsx
import React from "react";

const RedemptionDetailsSection = ({ formData, onInputChange }) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        REDEMPTION DETAILS
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Value/Number of Units to be redeemed (in figures) *
          </label>
          <input
            type="text"
            name="unitsToRedeemFigures"
            value={formData.unitsToRedeemFigures}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 1000"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Value/Number of Units to be redeemed (in words) *
          </label>
          <input
            type="text"
            name="unitsToRedeemWords"
            value={formData.unitsToRedeemWords}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., One Thousand Only"
          />
        </div>
      </div>
    </div>
  );
};

export default RedemptionDetailsSection;
