// ComplianceStep.jsx
import React from "react";

const ComplianceStep = ({
  formData,
  handleInputChange,
  handleNestedInputChange,
  accountType,
}) => {
  const domicileZones = [
    { value: "north_central", label: "North - Central Zone" },
    { value: "north_east", label: "North - East Zone" },
    { value: "north_west", label: "North - West Zone" },
    { value: "south_east", label: "South - East Zone" },
    { value: "south_south", label: "South - South Zone" },
    { value: "south_west", label: "South - West Zone" },
    { value: "diaspora", label: "Diaspora Investors" },
  ];

  const renderPEPSection = (investorKey, title, bgColor) => (
    <div className={`${bgColor} rounded-lg p-6`}>
      <h4 className="text-lg font-semibold text-gray-800 mb-4">{title}</h4>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Are you currently / ever been a politically exposed person (PEP)? *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name={`${investorKey}Pep`}
                value="yes"
                checked={formData.pepInformation[investorKey].isPep === "yes"}
                onChange={(e) =>
                  handleNestedInputChange(
                    "pepInformation",
                    investorKey,
                    "isPep",
                    e.target.value
                  )
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Yes
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name={`${investorKey}Pep`}
                value="no"
                checked={formData.pepInformation[investorKey].isPep === "no"}
                onChange={(e) =>
                  handleNestedInputChange(
                    "pepInformation",
                    investorKey,
                    "isPep",
                    e.target.value
                  )
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">No</span>
            </label>
          </div>

          {formData.pepInformation[investorKey].isPep === "yes" && (
            <div className="mt-4">
              <textarea
                value={formData.pepInformation[investorKey].pepDetails}
                onChange={(e) =>
                  handleNestedInputChange(
                    "pepInformation",
                    investorKey,
                    "pepDetails",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide PEP details"
                rows="2"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Have you ever been a financially exposed person? *
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name={`${investorKey}Fep`}
                value="yes"
                checked={
                  formData.pepInformation[investorKey].isFinanciallyExposed ===
                  "yes"
                }
                onChange={(e) =>
                  handleNestedInputChange(
                    "pepInformation",
                    investorKey,
                    "isFinanciallyExposed",
                    e.target.value
                  )
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Yes
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name={`${investorKey}Fep`}
                value="no"
                checked={
                  formData.pepInformation[investorKey].isFinanciallyExposed ===
                  "no"
                }
                onChange={(e) =>
                  handleNestedInputChange(
                    "pepInformation",
                    investorKey,
                    "isFinanciallyExposed",
                    e.target.value
                  )
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">No</span>
            </label>
          </div>

          {formData.pepInformation[investorKey].isFinanciallyExposed ===
            "yes" && (
            <div className="mt-4">
              <textarea
                value={formData.pepInformation[investorKey].fepDetails}
                onChange={(e) =>
                  handleNestedInputChange(
                    "pepInformation",
                    investorKey,
                    "fepDetails",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide financial exposure details"
                rows="2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Compliance Information
      </h3>

      {/* PEP/FEP Information */}
      <div className="space-y-8">
        {accountType === "individual" ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Political & Financial Exposure Declaration
            </h4>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Are you currently / ever been a politically exposed person
                  (PEP) or a relative/close associate of a PEP? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="investor1Pep"
                      value="yes"
                      checked={
                        formData.pepInformation.investor1.isPep === "yes"
                      }
                      onChange={(e) =>
                        handleNestedInputChange(
                          "pepInformation",
                          "investor1",
                          "isPep",
                          e.target.value
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="investor1Pep"
                      value="no"
                      checked={formData.pepInformation.investor1.isPep === "no"}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "pepInformation",
                          "investor1",
                          "isPep",
                          e.target.value
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </span>
                  </label>
                </div>

                {formData.pepInformation.investor1.isPep === "yes" && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Please provide PEP details:
                    </label>
                    <textarea
                      value={formData.pepInformation.investor1.pepDetails}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "pepInformation",
                          "investor1",
                          "pepDetails",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Provide PEP details"
                      rows="3"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Have you ever been a financially exposed person? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="investor1Fep"
                      value="yes"
                      checked={
                        formData.pepInformation.investor1
                          .isFinanciallyExposed === "yes"
                      }
                      onChange={(e) =>
                        handleNestedInputChange(
                          "pepInformation",
                          "investor1",
                          "isFinanciallyExposed",
                          e.target.value
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="investor1Fep"
                      value="no"
                      checked={
                        formData.pepInformation.investor1
                          .isFinanciallyExposed === "no"
                      }
                      onChange={(e) =>
                        handleNestedInputChange(
                          "pepInformation",
                          "investor1",
                          "isFinanciallyExposed",
                          e.target.value
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </span>
                  </label>
                </div>

                {formData.pepInformation.investor1.isFinanciallyExposed ===
                  "yes" && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Please provide financial exposure details:
                    </label>
                    <textarea
                      value={formData.pepInformation.investor1.fepDetails}
                      onChange={(e) =>
                        handleNestedInputChange(
                          "pepInformation",
                          "investor1",
                          "fepDetails",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Provide financial exposure details"
                      rows="3"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {renderPEPSection(
              "investor1",
              "Investor 1 - Political & Financial Exposure",
              "bg-yellow-50 border border-yellow-200"
            )}
            {renderPEPSection(
              "investor2",
              "Investor 2 - Political & Financial Exposure",
              "bg-orange-50 border border-orange-200"
            )}
          </>
        )}
      </div>

      {/* Investor Domicile */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Investor Area of Domicile
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {domicileZones.map((zone) => (
            <label
              key={zone.value}
              className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                name="investorDomicile"
                value={zone.value}
                checked={formData.investorDomicile === zone.value}
                onChange={(e) =>
                  handleInputChange(null, "investorDomicile", e.target.value)
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                {zone.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* User Email for Copy */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Email (to receive a copy of this application)
        </label>
        <input
          type="email"
          value={formData.userEmail}
          onChange={(e) => handleInputChange(null, "userEmail", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your email to receive a copy"
        />
      </div>
    </div>
  );
};

export default ComplianceStep;
