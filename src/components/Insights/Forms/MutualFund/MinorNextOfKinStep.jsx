// MinorNextOfKinStep.jsx - FIXED VERSION
import React from "react";
import { Baby, Heart } from "lucide-react";

const MinorNextOfKinStep = ({ formData, handleInputChange }) => {
  const relationshipTypes = [
    "Spouse",
    "Child",
    "Parent",
    "Sibling",
    "Guardian",
    "Friend",
    "Business Partner",
    "Other",
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Minor Investment & Next of Kin
      </h3>

      {/* Minor Investment Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Baby className="text-blue-600" size={20} />
          <h4 className="text-lg font-semibold text-blue-800">
            Investment on Behalf of a Minor
          </h4>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            id="isForMinor"
            checked={formData.minorDetails.isForMinor}
            onChange={(e) =>
              handleInputChange("minorDetails", "isForMinor", e.target.checked)
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isForMinor"
            className="text-sm font-medium text-gray-700"
          >
            This investment is on behalf of a minor (under 18 years old)
          </label>
        </div>

        {formData.minorDetails.isForMinor && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minor Surname
                </label>
                <input
                  type="text"
                  value={formData.minorDetails.surname}
                  onChange={(e) =>
                    handleInputChange("minorDetails", "surname", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter minor's surname"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minor First Name
                </label>
                <input
                  type="text"
                  value={formData.minorDetails.name}
                  onChange={(e) =>
                    handleInputChange("minorDetails", "name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter minor's first name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minor Other Name
                </label>
                <input
                  type="text"
                  value={formData.minorDetails.otherName}
                  onChange={(e) =>
                    handleInputChange(
                      "minorDetails",
                      "otherName",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter minor's other name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minor Residential Address
              </label>
              <textarea
                value={formData.minorDetails.residentialAddress}
                onChange={(e) =>
                  handleInputChange(
                    "minorDetails",
                    "residentialAddress",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter minor's address"
                rows="2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minor Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.minorDetails.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange(
                      "minorDetails",
                      "dateOfBirth",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Relationship to Applicant
                </label>
                <select
                  value={formData.minorDetails.relationshipToApplicant}
                  onChange={(e) =>
                    handleInputChange(
                      "minorDetails",
                      "relationshipToApplicant",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Relationship</option>
                  {relationshipTypes.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minor Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.minorDetails.mobileNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "minorDetails",
                      "mobileNumber",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Minor Email Address
              </label>
              <input
                type="email"
                value={formData.minorDetails.emailAddress}
                onChange={(e) =>
                  handleInputChange(
                    "minorDetails",
                    "emailAddress",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
          </div>
        )}
      </div>

      {/* Next of Kin Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Heart className="text-red-600" size={20} />
          <h4 className="text-lg font-semibold text-gray-800">
            Next of Kin Information
          </h4>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Surname *
              </label>
              <input
                type="text"
                value={formData.nextOfKin.surname}
                onChange={(e) =>
                  handleInputChange("nextOfKin", "surname", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter surname"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.nextOfKin.name}
                onChange={(e) =>
                  handleInputChange("nextOfKin", "name", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Other Name
              </label>
              <input
                type="text"
                value={formData.nextOfKin.otherName}
                onChange={(e) =>
                  handleInputChange("nextOfKin", "otherName", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter other name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Residential Address
            </label>
            <textarea
              value={formData.nextOfKin.residentialAddress}
              onChange={(e) =>
                handleInputChange(
                  "nextOfKin",
                  "residentialAddress",
                  e.target.value
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter address"
              rows="2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nationality
              </label>
              <input
                type="text"
                value={formData.nextOfKin.nationality}
                onChange={(e) =>
                  handleInputChange("nextOfKin", "nationality", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter nationality"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State of Origin
              </label>
              <input
                type="text"
                value={formData.nextOfKin.stateOfOrigin}
                onChange={(e) =>
                  handleInputChange(
                    "nextOfKin",
                    "stateOfOrigin",
                    e.target.value
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter state of origin"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Relationship
              </label>
              <select
                value={formData.nextOfKin.relationship}
                onChange={(e) =>
                  handleInputChange("nextOfKin", "relationship", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Relationship</option>
                {relationshipTypes.map((rel) => (
                  <option key={rel} value={rel}>
                    {rel}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={formData.nextOfKin.mobileNumber}
                onChange={(e) =>
                  handleInputChange("nextOfKin", "mobileNumber", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.nextOfKin.emailAddress}
                onChange={(e) =>
                  handleInputChange("nextOfKin", "emailAddress", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinorNextOfKinStep;
