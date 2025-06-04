import React from "react";
import { AlertTriangle } from "lucide-react";

const ImportantNotesSection = () => {
  return (
    <div className="border-t pt-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-emerald-600" size={20} />
          <h4 className="font-semibold text-emerald-800">
            Important Notes for PACAM Money Market Fund:
          </h4>
        </div>
        <ul className="text-sm text-emerald-700 space-y-1">
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
            • <strong>High Liquidity Focus:</strong> This fund is designed for
            capital preservation and quick access to your funds.
          </li>
          <li>
            • <strong>Money Market Benefits:</strong> Low risk investment with
            stable returns and high liquidity for immediate cash needs.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImportantNotesSection;
