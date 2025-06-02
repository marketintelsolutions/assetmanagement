// SignatureSection.jsx
import React from "react";
import { Upload, Pen } from "lucide-react";
import SignatureCanvas from "./SignatureCanvas";
import SignatureUpload from "./SignatureUpload";

const SignatureSection = ({
  formData,
  signatureMode,
  onSignatureChange,
  onSignatureModeChange,
}) => {
  return (
    <div className="border-t pt-6">
      <div className="flex items-center gap-2 mb-6">
        <Pen className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">SIGNATURES</h3>
      </div>

      {/* Primary Signature */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Signature of Redeeming Unit Holder *
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => onSignatureModeChange("primary", "draw")}
              className={`px-3 py-1 rounded text-sm ${
                signatureMode.primary === "draw"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Pen size={16} className="inline mr-1" />
              Draw
            </button>
            <button
              type="button"
              onClick={() => onSignatureModeChange("primary", "upload")}
              className={`px-3 py-1 rounded text-sm ${
                signatureMode.primary === "upload"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Upload size={16} className="inline mr-1" />
              Upload
            </button>
          </div>
        </div>

        {signatureMode.primary === "draw" ? (
          <SignatureCanvas
            onSignatureChange={(sig) =>
              onSignatureChange("primarySignature", sig)
            }
            width={400}
            height={150}
          />
        ) : (
          <SignatureUpload
            onSignatureChange={(sig) =>
              onSignatureChange("primarySignature", sig)
            }
            currentSignature={formData.primarySignature}
          />
        )}
      </div>

      {/* Joint Signature */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-semibold text-gray-700">
            Signature of Joint Redeeming Unit Holder (Optional)
          </label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => onSignatureModeChange("joint", "draw")}
              className={`px-3 py-1 rounded text-sm ${
                signatureMode.joint === "draw"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Pen size={16} className="inline mr-1" />
              Draw
            </button>
            <button
              type="button"
              onClick={() => onSignatureModeChange("joint", "upload")}
              className={`px-3 py-1 rounded text-sm ${
                signatureMode.joint === "upload"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Upload size={16} className="inline mr-1" />
              Upload
            </button>
          </div>
        </div>

        {signatureMode.joint === "draw" ? (
          <SignatureCanvas
            onSignatureChange={(sig) =>
              onSignatureChange("jointSignature", sig)
            }
            width={400}
            height={150}
          />
        ) : (
          <SignatureUpload
            onSignatureChange={(sig) =>
              onSignatureChange("jointSignature", sig)
            }
            currentSignature={formData.jointSignature}
          />
        )}
      </div>

      {/* Signature Requirements */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
        <h4 className="font-semibold text-blue-800 mb-2">
          Signature Requirements:
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Primary signature is required for all redemption requests</li>
          <li>• Joint signature is only required if this is a joint account</li>
          <li>• You can either draw your signature or upload an image file</li>
          <li>• Ensure signatures match those on file with your account</li>
        </ul>
      </div>
    </div>
  );
};

export default SignatureSection;
