// InvestmentInfoStep.jsx
import React from "react";

const InvestmentInfoStep = ({ formData, handleInputChange }) => {
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

  const investorTypes = [
    { value: "retail_domestic", label: "Retail Investors (Domestic)" },
    { value: "retail_foreign", label: "Retail Investors (Foreign)" },
    {
      value: "institutional_domestic",
      label: "Institutional Investors (Domestic)",
    },
    {
      value: "institutional_foreign",
      label: "Institutional Investors (Foreign)",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Investment Information
      </h3>

      {/* Fund Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Mutual Fund Type *
        </label>
        <div className="space-y-3">
          {fundTypes.map((fund) => (
            <label
              key={fund.value}
              className="flex items-start p-4 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="fundType"
                value={fund.value}
                checked={formData.fundType === fund.value}
                onChange={(e) =>
                  handleInputChange(null, "fundType", e.target.value)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
              />
              <div className="ml-3">
                <span className="text-sm font-medium text-gray-700">
                  {fund.label}
                </span>
                <div className="text-xs text-gray-500">
                  UBA Account: {fund.account}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Dividend Mandate */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Dividend Mandate
        </label>
        <div className="flex gap-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="dividendMandate"
              value="reinvest"
              checked={formData.dividendMandate === "reinvest"}
              onChange={(e) =>
                handleInputChange(null, "dividendMandate", e.target.value)
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Re-invest
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="dividendMandate"
              value="payout"
              checked={formData.dividendMandate === "payout"}
              onChange={(e) =>
                handleInputChange(null, "dividendMandate", e.target.value)
              }
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Pay Out
            </span>
          </label>
        </div>
      </div>

      {/* Investment Value */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Investment Value *
        </label>
        <input
          type="text"
          value={formData.investmentValue}
          onChange={(e) =>
            handleInputChange(null, "investmentValue", e.target.value)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter investment amount"
          required
        />
      </div>

      {/* Investor Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Investor Type *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {investorTypes.map((type) => (
            <label
              key={type.value}
              className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="investorType"
                value={type.value}
                checked={formData.investorType === type.value}
                onChange={(e) =>
                  handleInputChange(null, "investorType", e.target.value)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                {type.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestmentInfoStep;
