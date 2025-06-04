// FormSelector.jsx - Component to choose between different form types
import React, { useState } from "react";
import {
  Building,
  Users,
  ArrowRight,
  FileText,
  DollarSign,
} from "lucide-react";
import CorporateInvestmentForm from "./CorporateInvestmentForm/CorporateInvestmentForm";
import MutualFundForm from "./MutualFundForm/MutualFundForm";

const FormSelector = ({
  adminEmail = process.env.REACT_APP_SUBMISSION_EMAIL,
}) => {
  const [selectedForm, setSelectedForm] = useState(null);

  const formOptions = [
    {
      id: "corporate",
      title: "Corporate Investment",
      subtitle: "For corporate entities and businesses",
      description:
        "Investment applications for companies, partnerships, and other corporate entities with multiple signatories.",
      icon: Building,
      features: [
        "Company information and registration details",
        "Multiple account signatories (up to 3)",
        "Corporate documentation requirements",
        "Business-focused investment options",
        "Board resolution requirements",
      ],
      color: "blue",
    },
    {
      id: "mutual-fund",
      title: "Mutual Fund",
      subtitle: "For individual and joint accounts",
      description:
        "Mutual fund applications for individual investors or joint account holders with various fund options.",
      icon: DollarSign,
      features: [
        "Individual or joint account options",
        "Multiple fund type selections",
        "Dividend mandate preferences",
        "Personal investor information",
        "Simplified documentation process",
      ],
      color: "green",
    },
  ];

  if (selectedForm === "corporate") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedForm(null)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowRight size={16} className="mr-2 rotate-180" />
              Back to Form Selection
            </button>
          </div>
        </div>
        <CorporateInvestmentForm adminEmail={adminEmail} />
      </div>
    );
  }

  if (selectedForm === "mutual-fund") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedForm(null)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowRight size={16} className="mr-2 rotate-180" />
              Back to Form Selection
            </button>
          </div>
        </div>
        <MutualFundForm adminEmail={adminEmail} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold">PAC Asset Management</h1>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Investment Applications
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the appropriate application form based on your investment
            needs and account type.
          </p>
        </div>

        {/* Form Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {formOptions.map((option) => {
            const IconComponent = option.icon;
            const colorClasses = {
              blue: {
                bg: "bg-blue-50",
                border: "border-blue-200",
                hover: "hover:border-blue-300 hover:bg-blue-100",
                icon: "text-blue-600",
                button: "bg-blue-600 hover:bg-blue-700",
                accent: "text-blue-600",
              },
              green: {
                bg: "bg-green-50",
                border: "border-green-200",
                hover: "hover:border-green-300 hover:bg-green-100",
                icon: "text-green-600",
                button: "bg-green-600 hover:bg-green-700",
                accent: "text-green-600",
              },
            }[option.color];

            return (
              <div
                key={option.id}
                className={`${colorClasses.bg} ${colorClasses.border} ${colorClasses.hover} border-2 rounded-xl p-8 transition-all duration-200 cursor-pointer group`}
                onClick={() => setSelectedForm(option.id)}
              >
                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${colorClasses.bg} rounded-full mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <IconComponent size={32} className={colorClasses.icon} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {option.title}
                  </h3>
                  <p
                    className={`text-sm font-medium ${colorClasses.accent} mb-3`}
                  >
                    {option.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {option.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-gray-800 text-sm">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {option.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <div
                          className={`w-1.5 h-1.5 ${colorClasses.icon} rounded-full mt-2 mr-3 flex-shrink-0`}
                        ></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full ${colorClasses.button} text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center group-hover:shadow-lg`}
                >
                  <span>Start {option.title} Application</span>
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto mt-12">
          <div className="text-center mb-6">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Need Help Choosing?
            </h3>
            <p className="text-gray-600">
              Here's a quick guide to help you select the right application
              form:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">
                Choose Corporate Investment if:
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• You're applying on behalf of a company or business</li>
                <li>• You need multiple authorized signatories</li>
                <li>
                  • You have corporate documentation (CAC forms, board
                  resolutions)
                </li>
                <li>• You're making institutional-level investments</li>
                <li>• You need specific investment products for businesses</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-600 mb-3">
                Choose Mutual Fund if:
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• You're an individual investor</li>
                <li>• You want to open a joint account with another person</li>
                <li>• You're interested in mutual fund products</li>
                <li>• You want dividend reinvestment or payout options</li>
                <li>• You prefer a simplified application process</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Still unsure?</strong> Contact our customer service team
              at{" "}
              <a
                href="mailto:info@pacassetmanagement.com"
                className="text-blue-600 hover:underline"
              >
                info@pacassetmanagement.com
              </a>{" "}
              or call +234-XXX-XXXX for personalized assistance.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PAC Asset Management. A member of
            PanAfrican Capital Holdings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormSelector;
