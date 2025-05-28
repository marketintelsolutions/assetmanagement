// EmailIndemnityForm.jsx
import React, { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  FileText,
  Building,
} from "lucide-react";
import { EmailTemplateGenerator } from "./EmailTemplateGenerator";
import { EmailService } from "./EmailService";

const EmailIndemnityForm = ({
  variant = "individual",
  onSubmit,
  apiKey = `${process.env.REACT_APP_PLUNK_API_KEY}`,
  adminEmail = `${process.env.REACT_APP_SUBMISSION_EMAIL}`,
}) => {
  const [formData, setFormData] = useState({
    preferredEmail: "",
    preferredPhone: "",
    accountHolderName: "",
    companyName: "",
    signatureDate: "",
    agreedToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "preferredEmail",
      "accountHolderName",
      "agreedToTerms",
    ];
    if (variant === "corporate") {
      requiredFields.push("companyName");
    }

    for (let field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }

    if (!EmailService.validateEmail(formData.preferredEmail)) {
      return false;
    }

    return true;
  };

  const createEmailTemplates = () => {
    const commonContactInfo = {
      email: "info@pacam.com",
      phone: "+234-XXX-XXXX",
      website: "www.pacam.com",
    };

    // Admin email template
    const adminSections = [
      EmailTemplateGenerator.createFormDataSection(
        "Indemnity Agreement Details",
        {
          "Preferred Email": formData.preferredEmail,
          "Preferred Phone": formData.preferredPhone || "Not provided",
          "Account Holder Name": formData.accountHolderName,
          ...(variant === "corporate" && {
            "Company Name": formData.companyName,
          }),
          "Agreement Date":
            formData.signatureDate || new Date().toLocaleDateString(),
          "Form Type": variant === "corporate" ? "Corporate" : "Individual",
        }
      ),
    ];

    const adminImportantNotes = `
      <ul>
        <li>The account holder has consented to electronic communication including email, SMS, WhatsApp, etc.</li>
        <li>Instructions transmitted electronically are binding for all purposes including evidence.</li>
        <li>The account holder indemnifies PAC Asset Management Limited against all losses from electronic communication.</li>
        <li>There are acknowledged risks with electronic communication including delays, non-receipt, and third-party interference.</li>
        <li>PAC Asset Management Limited is authorized to rely on electronic communications from the specified email account.</li>
      </ul>
    `;

    const adminTemplate = EmailTemplateGenerator.createTemplate({
      title: "Email Indemnity Agreement",
      subtitle: "Electronic Communication Consent - New Submission",
      greeting: "New email indemnity agreement has been submitted.",
      sections: adminSections,
      importantNotes: adminImportantNotes,
      isUserCopy: false,
      brandName: "PAC Asset Management Limited",
      contactInfo: commonContactInfo,
    });

    // User email template
    const userSections = [
      {
        title: "Agreement Confirmation",
        content: `
          <p>Thank you for submitting your Email Indemnity Agreement. This document confirms your consent to electronic communication with PAC Asset Management Limited.</p>
          <div class="info-grid">
            <div class="info-label">Your Email:</div>
            <div class="info-value">${formData.preferredEmail}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Agreement Date:</div>
            <div class="info-value">${new Date().toLocaleDateString()}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Agreement Type:</div>
            <div class="info-value">${
              variant === "corporate" ? "Corporate" : "Individual"
            }</div>
          </div>
        `,
      },
    ];

    const userTemplate = EmailTemplateGenerator.createTemplate({
      title: "Email Indemnity Agreement - Copy",
      subtitle: "Your Electronic Communication Consent",
      greeting: `Dear ${formData.accountHolderName},`,
      sections: userSections,
      importantNotes:
        "<p>Keep this email for your records. This agreement remains in effect until formally revoked in writing.</p>",
      isUserCopy: true,
      brandName: "PAC Asset Management Limited",
      contactInfo: commonContactInfo,
    });

    return { adminTemplate, userTemplate };
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields and agree to the terms.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { adminTemplate, userTemplate } = createEmailTemplates();

      // Send to admin
      await EmailService.sendEmail(
        adminEmail,
        "New Email Indemnity Agreement",
        adminTemplate,
        apiKey
      );

      // Send copy to user
      await EmailService.sendEmail(
        formData.preferredEmail,
        "Copy: Your Email Indemnity Agreement",
        userTemplate,
        apiKey
      );

      // Call parent onSubmit function if provided
      if (onSubmit) {
        await onSubmit(formData, { adminTemplate, userTemplate });
      }

      setSubmitStatus({
        type: "success",
        message: "Email indemnity agreement submitted successfully!",
      });

      // Reset form
      setTimeout(() => {
        setFormData({
          preferredEmail: "",
          preferredPhone: "",
          accountHolderName: "",
          companyName: "",
          signatureDate: "",
          agreedToTerms: false,
        });
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          "Failed to submit agreement. Please check your configuration and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const indemnityText = `
You hereby consent to the use of electronic communication (which includes but is not limited to written communication by email, SMS, WhatsApp, etc.). By this consent, you unequivocally agree that instructions transmitted by electronic communication be binding for all purposes, including for purposes of evidence. You irrevocably undertake and warrant that you shall not make any demand or claim or institute any action against PAC Asset Management Limited should you suffer any loss or liability as a result of your consent to the use of electronic communication.

You agree to irrevocably indemnify and hold PAC Asset Management Limited harmless against all costs, claims, demands, actions, and proceedings that may be made or instituted against PAC Asset Management Limited; and all liabilities, losses, and damages which may be suffered by PAC Asset Management Limited in connection with, or arising as a result of your consent to electronic communication or PAC Asset Management's reliance on electronic communication issued from your email account.

You acknowledge that there are certain risks associated with conveying instructions via electronic means, including, but not limited to the risk of delay, non-receipt (due to technical malfunction, disruption, connectivity issues, etc.), third party interception/interference, data corruption, etc., and hereby fully waive, discharge and indemnify PAC Asset Management in respect of any loss or damages resulting from any of the risks identified above.

You hereby authorize PAC Asset Management Limited to rely upon and act in accordance with any notice, demand or other communication which may from time to time be, or purport to be, given by email by you or on your behalf by any authorized persons, without inquiry on PAC Asset Management Limited's part as to the authority or identity of the person making or purporting to make such notice or demand from your email account.
  `;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          {variant === "corporate" ? (
            <Building className="text-blue-600" size={24} />
          ) : (
            <FileText className="text-blue-600" size={24} />
          )}
          <h1 className="text-2xl font-bold text-gray-800">
            Email Indemnity Agreement
          </h1>
        </div>
        <p className="text-gray-600">
          Electronic Communication Consent Form -{" "}
          {variant === "corporate" ? "Corporate" : "Individual"}
        </p>
      </div>

      {/* Status Messages */}
      {submitStatus && (
        <div
          className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
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
      )}

      {/* Indemnity Text */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Terms and Conditions
        </h3>
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {indemnityText}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Email Address *
          </label>
          <input
            type="email"
            name="preferredEmail"
            value={formData.preferredEmail}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your preferred email address"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Phone Number
          </label>
          <input
            type="tel"
            name="preferredPhone"
            value={formData.preferredPhone}
            onChange={handleInputChange}
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
            value={formData.accountHolderName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter the account holder's full name"
          />
        </div>

        {variant === "corporate" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the company name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Signature Date
          </label>
          <input
            type="date"
            name="signatureDate"
            value={formData.signatureDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <input
            type="checkbox"
            id="agreedToTerms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleInputChange}
            required
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="agreedToTerms" className="text-sm text-gray-700">
            <span className="font-semibold">
              I hereby acknowledge that I have read, understood, and agree to
              all the terms and conditions stated above.
            </span>{" "}
            I consent to electronic communication and indemnify PAC Asset
            Management Limited as described in this agreement.
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.agreedToTerms}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send size={20} />
              Submit Email Indemnity Agreement
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EmailIndemnityForm;
