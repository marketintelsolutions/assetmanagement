import React from "react";
import { AlertTriangle } from "lucide-react";

const ImportantNotesSection = () => {
  return (
    <div className="border-t pt-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-blue-600" size={20} />
          <h4 className="font-semibold text-blue-800">
            Important Notes for PACAM Eurobond Fund:
          </h4>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • <strong>Early Redemption Charge:</strong> For redemptions within
            90 days, 10% of the positive total returns will be charged.
          </li>
          <li>
            • Payment will only be made in the name of the unit holder(s).
          </li>
          <li>
            • For partial redemption, the balance Fund Statement will be sent to
            the provided email address.
          </li>
          <li>
            • Please attach the relevant unit Certificate evidencing your unit
            holding.
          </li>
          <li>
            • <strong>International Exposure:</strong> This fund invests in
            international bonds and is subject to foreign exchange rate
            fluctuations.
          </li>
          <li>
            • <strong>Currency Risk:</strong> Eurobond investments provide
            diversification but carry currency conversion risks.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImportantNotesSection;
