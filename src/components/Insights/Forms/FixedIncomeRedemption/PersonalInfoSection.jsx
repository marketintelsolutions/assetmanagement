import React from "react";
import { User } from "lucide-react";

const PersonalInfoSection = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <User className="text-purple-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">
          PERSONAL INFORMATION
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="md:col-start-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          FULL NAME (as printed on Fund Statement) *
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter your full name as on fund statement"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            CLIENT ID *
          </label>
          <input
            type="text"
            name="clientId"
            value={formData.clientId}
            onChange={onInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your client ID"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            TELEPHONE NUMBER
          </label>
          <input
            type="tel"
            name="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          EMAIL *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter your email address"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
