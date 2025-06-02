import React from "react";

const AddYearModal = ({
  show,
  onClose,
  onSubmit,
  newYearData,
  setNewYearData,
  loading,
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
          <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Year</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <input
                type="number"
                value={newYearData.year}
                onChange={(e) =>
                  setNewYearData((prev) => ({
                    ...prev,
                    year: e.target.value,
                    title: e.target.value ? `${e.target.value} Reports` : "",
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent transition-all"
                placeholder="e.g., 2026"
                min="2000"
                max="2100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={newYearData.title}
                onChange={(e) =>
                  setNewYearData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-transparent transition-all"
                placeholder="e.g., 2026 Reports"
                required
              />
            </div>

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
                disabled={loading}
                className="px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primaryBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBlue disabled:opacity-50 transition-colors"
              >
                {loading ? "Adding..." : "Add Year"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddYearModal;
