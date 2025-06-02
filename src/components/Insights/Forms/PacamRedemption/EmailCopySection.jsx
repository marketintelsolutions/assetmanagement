// EmailCopySection.jsx
import React from "react";
import { Mail } from "lucide-react";

const EmailCopySection = ({ formData, onInputChange }) => {
  return (
    <div className="border-t pt-6">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">
          EMAIL COPY (OPTIONAL)
        </h3>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Email (to receive a copy of this submission)
        </label>
        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          onChange={onInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your email to receive a copy"
        />
      </div>
    </div>
  );
};

export default EmailCopySection;
