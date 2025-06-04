import React from "react";
import { AlertTriangle } from "lucide-react";

const ImportantNotesSection = () => {
  return (
    <div className="border-t pt-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-green-600" size={20} />
          <h4 className="font-semibold text-green-800">
            Important Notes for PACAM Equity Fund:
          </h4>
        </div>
        <ul className="text-sm text-green-700 space-y-1">
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
            • <strong>Equity Fund Focus:</strong> This fund invests primarily in
            equity securities for long-term capital growth.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImportantNotesSection;
