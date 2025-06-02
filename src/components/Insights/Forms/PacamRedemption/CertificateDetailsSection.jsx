// CertificateDetailsSection.jsx
import React from "react";

const CertificateDetailsSection = ({ formData, onInputChange }) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        DETAILS OF ATTACHED UNIT CERTIFICATE
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Certificate Numbers
          </label>
          <input
            type="text"
            name="certificateNumbers"
            value={formData.certificateNumbers}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter certificate numbers"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Previous Redemption
          </label>
          <input
            type="text"
            name="previousRedemption"
            value={formData.previousRedemption}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter previous redemption amount"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Total Number of Units
          </label>
          <input
            type="text"
            name="totalUnits"
            value={formData.totalUnits}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter total units"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Balance
          </label>
          <input
            type="text"
            name="balance"
            value={formData.balance}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter balance"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Redemption
          </label>
          <input
            type="text"
            name="currentRedemption"
            value={formData.currentRedemption}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter current redemption amount"
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateDetailsSection;
