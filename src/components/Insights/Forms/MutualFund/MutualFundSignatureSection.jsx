// MutualFundSignatureSection.jsx
import React from "react";
import SignatureInput from "../EmailIndemnityForm/SignatureInput";

const MutualFundSignatureSection = ({
  formData,
  signatureMode,
  onSignatureChange,
  onSignatureModeChange,
  handleInputChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Primary Applicant Signature */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Primary Applicant Signature
        </h4>
        <SignatureInput
          label="Primary Applicant Signature"
          value={formData.primaryApplicant.signature}
          onChange={(sig) => onSignatureChange("primarySignature", sig)}
          mode={signatureMode.primary || "draw"}
          onModeChange={(mode) => onSignatureModeChange("primary", mode)}
          required={true}
        />

        {/* Primary Signature Date */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Signature Date *
          </label>
          <input
            type="date"
            value={formData.primaryApplicant.signatureDate}
            onChange={(e) =>
              handleInputChange(
                "signatureDate",
                e.target.value,
                "primaryApplicant"
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      {/* Joint Applicant Signature (if joint account) */}
      {formData.isJointAccount && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Joint Applicant Signature
          </h4>
          <SignatureInput
            label="Joint Applicant Signature"
            value={formData.jointApplicant?.signature}
            onChange={(sig) => onSignatureChange("jointSignature", sig)}
            mode={signatureMode.joint || "draw"}
            onModeChange={(mode) => onSignatureModeChange("joint", mode)}
            required={true}
          />

          {/* Joint Signature Date */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Signature Date *
            </label>
            <input
              type="date"
              value={formData.jointApplicant?.signatureDate}
              onChange={(e) =>
                handleInputChange(
                  "signatureDate",
                  e.target.value,
                  "jointApplicant"
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MutualFundSignatureSection;
