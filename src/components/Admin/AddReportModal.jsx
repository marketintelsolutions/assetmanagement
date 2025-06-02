import React from "react";

const AddReportModal = ({
  show,
  onClose,
  onSubmit,
  reports,
  selectedYear,
  setSelectedYear,
  newReport,
  setNewReport,
  handleFileChange,
  isUploading,
  uploadProgress,
}) => {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-[999] flex items-center justify-center p-4">
      <div className="relative bg-white shadow-2xl rounded-2xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Add New Report
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent transition-all"
                required
              >
                <option value="">Select Year</option>
                {reports.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File
              </label>
              <input
                type="file"
                accept=".pdf,.ppt,.pptx"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent transition-all"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Accepted formats: PDF, PPT, PPTX (Max 50MB)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Title
              </label>
              <input
                type="text"
                value={newReport.title}
                onChange={(e) =>
                  setNewReport((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent transition-all"
                placeholder="e.g., March 2025 Fund Manager's Report"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Title auto-detected from filename, but you can edit it
              </p>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Uploading...</span>
                  <span className="text-primaryBlue font-medium">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primaryBlue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isUploading}
                className="px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primaryBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBlue disabled:opacity-50 transition-colors"
              >
                {isUploading ? "Uploading..." : "Add Report"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReportModal;
