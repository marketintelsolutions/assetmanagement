// SubmitSection.jsx
import React from "react";
import { Send, Download } from "lucide-react";

const SubmitSection = ({
  onSubmit,
  onPreviewPDF,
  isSubmitting,
  hasPrimarySignature,
}) => {
  return (
    <>
      {/* Submit Button */}
      <div className="border-t pt-6">
        <button
          onClick={onSubmit}
          disabled={isSubmitting || !hasPrimarySignature}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating PDF & Submitting...
            </>
          ) : (
            <>
              <Send size={20} />
              Submit Redemption Form
            </>
          )}
        </button>
        {!hasPrimarySignature && (
          <p className="text-sm text-red-600 text-center mt-2">
            Primary signature is required to submit the form
          </p>
        )}

        {/* PDF Preview Button */}
        {hasPrimarySignature && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onPreviewPDF}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download size={16} />
              Preview PDF
            </button>
            <p className="text-xs text-gray-500 mt-1">
              Preview how your form will look as a PDF
            </p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="border-t pt-6 bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">
          📧 What happens when you submit:
        </h4>
        <div className="text-sm text-blue-700 space-y-2">
          <div className="flex items-start gap-2">
            <span className="font-medium">1.</span>
            <span>
              A complete PDF copy of your form (with signatures embedded) will
              be generated
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium">2.</span>
            <span>
              Your signature images will be extracted as separate PNG files
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium">3.</span>
            <span>
              Fund manager receives: PDF form + signature images + summary email
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium">4.</span>
            <span>
              You receive (if email provided): Complete copy of PDF + signatures
              for your records
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitSection;
