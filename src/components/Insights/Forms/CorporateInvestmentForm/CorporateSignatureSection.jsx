// CorporateSignatureSection.jsx
import React from "react";
import SignatureInput from "../EmailIndemnityForm/SignatureInput";

const CorporateSignatureSection = ({
  formData,
  signatureMode,
  onSignatureChange,
  onSignatureModeChange,
  handleInputChange,
}) => {
  return (
    <div className="space-y-8">
      {/* Company Signature */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Company Signature
        </h4>
        <SignatureInput
          label="Company Representative Signature"
          value={formData.companySignature}
          onChange={(sig) => onSignatureChange("companySignature", sig)}
          mode={signatureMode.company || "draw"}
          onModeChange={(mode) => onSignatureModeChange("company", mode)}
          required={true}
        />

        {/* Company Signature Date */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Signature Date *
          </label>
          <input
            type="date"
            value={formData.companySignatureDate}
            // onChange={(e) =>
            //   onSignatureChange("companySignatureDate", e.target.value)
            // }
            onChange={(e) =>
              formData.signatories && handleInputChange
                ? handleInputChange("companySignatureDate", e.target.value)
                : null
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      {/* Signatories */}
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Account Signatory Signatures
        </h4>
        <div className="space-y-6">
          {formData.signatories.map((signatory, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6"
            >
              <h5 className="font-medium text-gray-700 mb-4">
                Signatory {index + 1}: {signatory.surname} {signatory.name}
                {index === 0 && <span className="text-red-500 ml-1">*</span>}
              </h5>

              <div className="space-y-4">
                {/* Signatory Signature */}
                <SignatureInput
                  label={`Signature for ${signatory.surname} ${
                    signatory.name || "Signatory"
                  }`}
                  value={signatory.signature}
                  onChange={(sig) =>
                    onSignatureChange("signatorySignature", sig, index)
                  }
                  mode={signatureMode.signatories?.[index] || "draw"}
                  onModeChange={(mode) =>
                    onSignatureModeChange("signatory", mode, index)
                  }
                  required={index === 0} // First signatory signature is required
                />

                {/* Signatory Signature Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Signature Date{" "}
                    {index === 0 && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="date"
                    value={signatory.signatureDate}
                    onChange={(e) =>
                      formData.signatories && handleInputChange
                        ? handleInputChange(
                            "signatureDate",
                            e.target.value,
                            index
                          )
                        : null
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={index === 0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CorporateSignatureSection;
