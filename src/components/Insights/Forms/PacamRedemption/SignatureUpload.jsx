// SignatureUpload.jsx
import React, { useRef } from "react";
import { Upload, Trash2 } from "lucide-react";

const SignatureUpload = ({ onSignatureChange, currentSignature }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        onSignatureChange(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file (PNG, JPG, etc.)");
    }
  };

  const removeSignature = () => {
    onSignatureChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="signature-upload">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        id="signature-upload"
      />

      {!currentSignature ? (
        <label
          htmlFor="signature-upload"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors border-2 border-dashed border-blue-300"
        >
          <Upload size={20} />
          <span>Upload Signature Image</span>
        </label>
      ) : (
        <div className="signature-preview bg-gray-50 rounded-lg p-4 border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">
              Signature Preview:
            </span>
            <button
              type="button"
              onClick={removeSignature}
              className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
              title="Remove signature"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="flex items-center justify-center bg-white rounded border p-2">
            <img
              src={currentSignature}
              alt="Signature"
              className="max-h-20 max-w-full object-contain"
            />
          </div>

          <label
            htmlFor="signature-upload"
            className="mt-3 inline-flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <Upload size={14} />
            Change Image
          </label>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-2">
        Supported formats: PNG, JPG, GIF (Max 5MB)
      </p>
    </div>
  );
};

export default SignatureUpload;
