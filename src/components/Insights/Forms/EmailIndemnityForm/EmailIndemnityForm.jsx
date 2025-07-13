// EmailIndemnityForm.jsx - Updated with all fields required
import React from "react";
import { Building, FileText } from "lucide-react";
import Modal from "../PacamRedemption/Modal";
import SignatureInput from "./SignatureInput";
import { useEmailIndemnityLogic } from "./useEmailIndemnityLogic";

const EmailIndemnityForm = ({
  variant = "individual", // "individual" || "corporate"
  apiKey = process.env.REACT_APP_PLUNK_API_KEY,
  adminEmail = process.env.REACT_APP_SUBMISSION_EMAIL,
}) => {
  const {
    formData,
    isSubmitting,
    modal,
    signatureMode,
    handleInputChange,
    handleSignatureChange,
    handleSignatureModeChange,
    handleSubmit,
    handlePreviewPDF,
    closeModal,
  } = useEmailIndemnityLogic(variant, adminEmail);

  const indemnityText = `You hereby consent to the use of electronic communication (which includes but is not limited to written communication by email, SMS, WhatsApp, etc.). By this consent, you unequivocally agree that instructions transmitted by electronic communication be binding for all purposes, including for purposes of evidence. You irrevocably undertake and warrant that you shall not make any demand or claim or institute any action against PAC Asset Management Limited should you suffer any loss or liability as a result of your consent to the use of electronic communication.

You agree to irrevocably indemnify and hold PAC Asset Management Limited harmless against all costs, claims, demands, actions, and proceedings that may be made or instituted against PAC Asset Management Limited; and all liabilities, losses, and damages which may be suffered by PAC Asset Management Limited in connection with, or arising as a result of your consent to electronic communication or PAC Asset Management's reliance on electronic communication issued from your email account.

You acknowledge that there are certain risks associated with conveying instructions via electronic means, including, but not limited to the risk of delay, non-receipt (due to technical malfunction, disruption, connectivity issues, etc.), third party interception/interference, data corruption, etc., and hereby fully waive, discharge and indemnify PAC Asset Management in respect of any loss or damages resulting from any of the risks identified above.

You hereby authorize PAC Asset Management Limited to rely upon and act in accordance with any notice, demand or other communication which may from time to time be, or purport to be, given by email by you or on your behalf by any authorized persons, without inquiry on PAC Asset Management Limited's part as to the authority or identity of the person making or purporting to make such notice or demand from your email account.`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg p-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {variant === "corporate" ? (
              <Building size={32} />
            ) : (
              <FileText size={32} />
            )}
            <h1 className="text-3xl font-bold">Email Indemnity Agreement</h1>
          </div>
          <p className="text-center text-blue-100 text-lg">
            Electronic Communication Consent Form -{" "}
            {variant === "corporate" ? "Corporate" : "Individual"}
          </p>
        </div>

        {/* Form Content */}
        <div className="bg-white shadow-lg rounded-b-lg p-8 space-y-8">
          {/* Indemnity Text */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Terms and Conditions
            </h3>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {indemnityText}
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-200 pb-2">
              {variant === "corporate"
                ? "Company Information"
                : "Contact Information"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {variant === "corporate" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName || ""}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter the company name"
                  />
                </div>
              )}

              <div className={variant === "corporate" ? "md:col-span-2" : ""}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {variant === "corporate"
                    ? "Official Email Address *"
                    : "Preferred Email Address *"}
                </label>
                <input
                  type="email"
                  name="preferredEmail"
                  value={formData.preferredEmail || ""}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={
                    variant === "corporate"
                      ? "Enter official company email address"
                      : "Enter your preferred email address"
                  }
                />
              </div>

              {variant === "individual" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="preferredPhone"
                      value={formData.preferredPhone || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your preferred phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name of Account Holder *
                    </label>
                    <input
                      type="text"
                      name="accountHolderName"
                      value={formData.accountHolderName || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter the account holder's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Signature Date *
                    </label>
                    <input
                      type="date"
                      name="signatureDate"
                      value={formData.signatureDate || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Individual Signature Section */}
                  <div className="md:col-span-2">
                    <SignatureInput
                      label="Signature"
                      value={formData.signature}
                      onChange={(sig) =>
                        handleSignatureChange("signature", sig)
                      }
                      mode={signatureMode}
                      onModeChange={(mode) =>
                        handleSignatureModeChange("signature", mode)
                      }
                      required={true}
                    />
                  </div>
                </>
              )}

              {variant === "corporate" && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Signature Date *
                    </label>
                    <input
                      type="date"
                      name="signatureDate"
                      value={formData.signatureDate || ""}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Corporate Signature Section - Two signatures side by side */}
                  <div className="md:col-span-2">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Authorized Signatories
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <SignatureInput
                          label="First Authorized Signatory"
                          value={formData.primarySignature}
                          onChange={(sig) =>
                            handleSignatureChange("primarySignature", sig)
                          }
                          mode={signatureMode.primary || signatureMode}
                          onModeChange={(mode) =>
                            handleSignatureModeChange("primary", mode)
                          }
                          required={true}
                        />
                      </div>
                      <div>
                        <SignatureInput
                          label="Second Authorized Signatory"
                          value={formData.secondarySignature}
                          onChange={(sig) =>
                            handleSignatureChange("secondarySignature", sig)
                          }
                          mode={signatureMode.secondary || signatureMode}
                          onModeChange={(mode) =>
                            handleSignatureModeChange("secondary", mode)
                          }
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <input
              type="checkbox"
              id="agreedToTerms"
              name="agreedToTerms"
              checked={formData.agreedToTerms || false}
              onChange={handleInputChange}
              required
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="agreedToTerms" className="text-sm text-gray-700">
              <span className="font-semibold">
                I hereby acknowledge that I have read, understood, and agree to
                all the terms and conditions stated above. *
              </span>{" "}
              I consent to electronic communication and indemnify PAC Asset
              Management Limited as described in this agreement.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePreviewPDF}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FileText size={20} />
              Preview PDF
            </button>

            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !formData.agreedToTerms ||
                (variant === "individual" &&
                  (!formData.signature ||
                    !formData.accountHolderName ||
                    !formData.preferredPhone ||
                    !formData.signatureDate)) ||
                (variant === "corporate" &&
                  (!formData.primarySignature ||
                    !formData.secondarySignature ||
                    !formData.companyName ||
                    !formData.signatureDate)) ||
                !formData.preferredEmail
              }
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Building size={20} />
                  Submit Email Indemnity Agreement
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal for success/error messages */}
      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        type={modal.type}
        message={modal.message}
        title={modal.title}
      />
    </div>
  );
};

export default EmailIndemnityForm;
