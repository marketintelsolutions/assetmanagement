// PersonalDetailsStep.jsx
import React from "react";

const PersonalDetailsStep = ({
  applicant,
  applicantKey,
  title,
  handleInputChange,
}) => {
  const idTypes = [
    { value: "national_id", label: "National ID" },
    { value: "drivers_license", label: "Driver's License" },
    { value: "international_passport", label: "International Passport" },
    { value: "voters_card", label: "Voter's Card" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Surname *
          </label>
          <input
            type="text"
            value={applicant.surname}
            onChange={(e) =>
              handleInputChange(applicantKey, "surname", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter surname"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={applicant.name}
            onChange={(e) =>
              handleInputChange(applicantKey, "name", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter first name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Other Name
          </label>
          <input
            type="text"
            value={applicant.otherName}
            onChange={(e) =>
              handleInputChange(applicantKey, "otherName", e.target.value)
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
          value={applicant.residentialAddress}
          onChange={(e) =>
            handleInputChange(
              applicantKey,
              "residentialAddress",
              e.target.value
            )
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter residential address"
          rows="3"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nationality
          </label>
          <input
            type="text"
            value={applicant.nationality}
            onChange={(e) =>
              handleInputChange(applicantKey, "nationality", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter nationality"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            value={applicant.dateOfBirth}
            onChange={(e) =>
              handleInputChange(applicantKey, "dateOfBirth", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Occupation
          </label>
          <input
            type="text"
            value={applicant.occupation}
            onChange={(e) =>
              handleInputChange(applicantKey, "occupation", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter occupation"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gender
          </label>
          <select
            value={applicant.gender}
            onChange={(e) =>
              handleInputChange(applicantKey, "gender", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            State of Origin
          </label>
          <input
            type="text"
            value={applicant.stateOfOrigin}
            onChange={(e) =>
              handleInputChange(applicantKey, "stateOfOrigin", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter state of origin"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Town/City
          </label>
          <input
            type="text"
            value={applicant.townCity}
            onChange={(e) =>
              handleInputChange(applicantKey, "townCity", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter town/city"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            value={applicant.mobileNumber}
            onChange={(e) =>
              handleInputChange(applicantKey, "mobileNumber", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter mobile number"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={applicant.emailAddress}
            onChange={(e) =>
              handleInputChange(applicantKey, "emailAddress", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter email address"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            BVN
          </label>
          <input
            type="text"
            value={applicant.bvn}
            onChange={(e) =>
              handleInputChange(applicantKey, "bvn", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter BVN"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tax Identification Number (TIN)
          </label>
          <input
            type="text"
            value={applicant.taxId}
            onChange={(e) =>
              handleInputChange(applicantKey, "taxId", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter TIN"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Signature Date
          </label>
          <input
            type="date"
            value={applicant.signatureDate}
            onChange={(e) =>
              handleInputChange(applicantKey, "signatureDate", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* ID Information */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          Means of Identification
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ID Type
            </label>
            <select
              value={applicant.idType}
              onChange={(e) =>
                handleInputChange(applicantKey, "idType", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select ID Type</option>
              {idTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ID Number
            </label>
            <input
              type="text"
              value={applicant.idNumber}
              onChange={(e) =>
                handleInputChange(applicantKey, "idNumber", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter ID number"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ID Issued Date
            </label>
            <input
              type="date"
              value={applicant.idIssuedDate}
              onChange={(e) =>
                handleInputChange(applicantKey, "idIssuedDate", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ID Expiry Date
            </label>
            <input
              type="date"
              value={applicant.idExpiryDate}
              onChange={(e) =>
                handleInputChange(applicantKey, "idExpiryDate", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          Bank Account Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Name
            </label>
            <input
              type="text"
              value={applicant.accountName}
              onChange={(e) =>
                handleInputChange(applicantKey, "accountName", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter account name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              value={applicant.accountNumber}
              onChange={(e) =>
                handleInputChange(applicantKey, "accountNumber", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter account number"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bank Name
            </label>
            <input
              type="text"
              value={applicant.bankName}
              onChange={(e) =>
                handleInputChange(applicantKey, "bankName", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter bank name"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
