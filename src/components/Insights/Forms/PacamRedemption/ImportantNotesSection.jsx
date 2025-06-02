// ImportantNotesSection.jsx
import React from "react";

const ImportantNotesSection = () => {
  return (
    <div className="border-t pt-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>
            • 10% of the positive total returns of the units being redeemed will
            be charged on the date of redemption.
          </li>
          <li>
            • Upon redemption, payment will only be made in the name of the unit
            holder(s).
          </li>
          <li>
            • In the case of partial redemption, the balance Fund Statement will
            be sent to the email address provided.
          </li>
          <li>
            • Please ensure you have attached the relevant unit Certificate
            evidencing your unit holding.
          </li>
          <li>
            • By submitting this form with your signature, you confirm the
            accuracy of all information provided.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImportantNotesSection;
