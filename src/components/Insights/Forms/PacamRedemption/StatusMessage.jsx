// StatusMessage.jsx
import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

const StatusMessage = ({ submitStatus }) => {
  if (!submitStatus) return null;

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg ${
        submitStatus.type === "success"
          ? "bg-green-50 text-green-800 border border-green-200"
          : "bg-red-50 text-red-800 border border-red-200"
      }`}
    >
      {submitStatus.type === "success" ? (
        <CheckCircle size={20} />
      ) : (
        <AlertCircle size={20} />
      )}
      <span>{submitStatus.message}</span>
    </div>
  );
};

export default StatusMessage;
