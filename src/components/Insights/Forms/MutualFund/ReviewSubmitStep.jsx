// ReviewSubmitStep.jsx
import React from "react";

const ReviewSubmitStep = ({ formData, handleInputChange, accountType }) => {
  const fundTypes = [
    {
      value: "money_market",
      label: "PACAM Money Market Fund (₦)",
      account: "*1019535675",
    },
    {
      value: "fixed_income",
      label: "PACAM Fixed Income Fund (₦)",
      account: "*1019535682",
    },
    {
      value: "balanced",
      label: "PACAM Balanced Fund (₦)",
      account: "*1019045402",
    },
    { value: "equity", label: "PACAM Equity Fund (₦)", account: "*1021941770" },
    {
      value: "eurobond",
      label: "PACAM Eurobond Fund ($)",
      account: "*1021941866",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Review & Submit
      </h3>

      {/* Application Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Application Summary
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Account Type:</span>
            <span className="ml-2">
              {accountType === "individual"
                ? "Individual Account"
                : "Joint Account"}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Fund Type:</span>
            <span className="ml-2">
              {fundTypes.find((fund) => fund.value === formData.fundType)
                ?.label || "Not selected"}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              Investment Value:
            </span>
            <span className="ml-2">
              {formData.investmentValue || "Not provided"}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              Dividend Mandate:
            </span>
            <span className="ml-2">
              {formData.dividendMandate === "reinvest"
                ? "Re-invest"
                : "Pay Out"}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">
              Primary Applicant:
            </span>
            <span className="ml-2">
              {`${formData.primaryApplicant.surname} ${formData.primaryApplicant.name}` ||
                "Not provided"}
            </span>
          </div>
          {accountType === "joint" && (
            <div>
              <span className="font-semibold text-gray-700">
                Secondary Applicant:
              </span>
              <span className="ml-2">
                {`${formData.secondaryApplicant.surname} ${formData.secondaryApplicant.name}` ||
                  "Not provided"}
              </span>
            </div>
          )}
          <div>
            <span className="font-semibold text-gray-700">Email Address:</span>
            <span className="ml-2">
              {formData.primaryApplicant.emailAddress || "Not provided"}
            </span>
          </div>
        </div>
      </div>

      {/* Fund Account Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-4">
          Fund Account Information
        </h4>
        <p className="text-sm text-blue-700 mb-3">
          All mutual fund accounts are held with United Bank for Africa (UBA)
          PLC:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
          {fundTypes.map((fund) => (
            <div key={fund.value}>
              <span className="font-medium">{fund.label}:</span>
              <span className="ml-2">{fund.account}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Documentation Checklist */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-green-800 mb-4">
          Documentation Checklist
        </h4>
        <p className="text-sm text-green-700 mb-3">
          Please ensure you have the following documents ready:
        </p>
        <ul className="text-sm text-green-700 space-y-1">
          <li>
            • Passport photograph
            {accountType === "joint" ? " (for both investors)" : ""}
          </li>
          <li>• Recent utility bill (not more than 3 months old)</li>
          <li>
            • Valid means of identification (National ID, Driver's License,
            International passport, etc.)
          </li>
          {accountType === "joint" && (
            <>
              <li>• Board Resolution (if applicable)</li>
              <li>• Copy of CAC Forms (C07, C02) (if applicable)</li>
            </>
          )}
        </ul>
      </div>

      {/* Attestations */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">Attestations</h4>

        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <input
            type="checkbox"
            id="agreedToCharges"
            checked={formData.agreedToCharges}
            onChange={(e) =>
              handleInputChange(null, "agreedToCharges", e.target.checked)
            }
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="agreedToCharges" className="text-sm text-gray-700">
            <span className="font-semibold">
              On the first investment, I/We agree that if these units are
              redeemed within 30, 90 and 180 days of the date of purchase, the
              fund manager shall deduct a handling charge equivalent to 20% of
              the redemption proceeds.
            </span>
          </label>
        </div>

        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <input
            type="checkbox"
            id="agreedToRisks"
            checked={formData.agreedToRisks}
            onChange={(e) =>
              handleInputChange(null, "agreedToRisks", e.target.checked)
            }
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="agreedToRisks" className="text-sm text-gray-700">
            <span className="font-semibold">
              I/We understand that prices fluctuate and losses in the value of
              my/our investment may occur and the past performance is not
              necessarily an indication of future performance.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmitStep;
