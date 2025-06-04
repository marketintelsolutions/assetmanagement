import React from "react";
import { Send, FileText } from "lucide-react";

const SubmitSection = ({
  onSubmit,
  onPreviewPDF,
  isSubmitting,
  hasPrimarySignature,
}) => {
  return (
    <div className="border-t pt-6 space-y-4">
      {/* PDF Preview Button */}
      <button
        type="button"
        onClick={onPreviewPDF}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 border-2 border-gray-300"
      >
        <FileText size={20} />
        Preview PDF
      </button>

      {/* Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting || !hasPrimarySignature}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Submitting...
          </>
        ) : (
          <>
            <Send size={20} />
            Submit Equity Fund Redemption
          </>
        )}
      </button>

      {!hasPrimarySignature && (
        <p className="text-sm text-red-600 text-center">
          * Primary signature is required to submit the form
        </p>
      )}
    </div>
  );
};

export default SubmitSection;
