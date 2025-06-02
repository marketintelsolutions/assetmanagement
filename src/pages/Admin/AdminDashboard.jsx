import React, { useState, useEffect } from "react";
import { PlusIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

// Import custom hooks and services
import { useAuth } from "../../hooks/useAuth";
import {
  getFundManagerReports,
  uploadFileWithProgress,
  addReport,
  updateYearTitle,
  deleteYear,
  deleteReport,
  extractTitleFromFilename,
} from "../../firebase/services";

// Import components
import AdminHeader from "../../components/Admin/AdminHeader";
import AddReportModal from "../../components/Admin/AddReportModal";
import AddYearModal from "../../components/Admin/AddYearModal";
import YearCard from "../../components/Admin/YearCard";
import LoadingOverlay from "../../components/Admin/LoadingOverlay";

const AdminDashboard = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // State management
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddYearModal, setShowAddYearModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [newReport, setNewReport] = useState({
    title: "",
    file: null,
  });
  const [newYearData, setNewYearData] = useState({
    year: "",
    title: "",
  });
  const [editingYear, setEditingYear] = useState(null);
  const [editYearTitle, setEditYearTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Effects
  useEffect(() => {
    if (user) {
      fetchReports();
    } else if (!authLoading) {
      navigate("/admin/login");
    }
  }, [user, authLoading, navigate]);

  // Data fetching
  const fetchReports = async () => {
    try {
      setLoading(true);
      const fetchedReports = await getFundManagerReports();
      console.log("reports", fetchedReports);
      setReports(fetchedReports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      alert("Error fetching reports. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // File handling
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const detectedTitle = extractTitleFromFilename(file.name);
      setNewReport((prev) => ({
        ...prev,
        file: file,
        title: detectedTitle,
      }));
    }
  };

  // Report management
  const handleAddReport = async (e) => {
    e.preventDefault();
    if (!newReport.title || !newReport.file || !selectedYear) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadResult = await uploadFileWithProgress(
        newReport.file,
        newReport.file.name.split(".")[0],
        setUploadProgress
      );

      const reportData = {
        title: newReport.title,
        file: uploadResult.fileName.split(".")[0],
        ppt: uploadResult.isPpt,
        uploadDate: new Date(),
        downloadUrl: uploadResult.downloadUrl,
        fileName: uploadResult.fileName,
      };

      await addReport(selectedYear, reportData);
      await fetchReports();

      // Reset form
      setShowAddModal(false);
      setNewReport({ title: "", file: null });
      setSelectedYear("");
      setUploadProgress(0);

      alert("Report added successfully!");
    } catch (error) {
      console.error("Error adding report:", error);
      alert(`Error adding report: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Year management
  const handleAddYear = async (e) => {
    e.preventDefault();
    if (!newYearData.year || !newYearData.title) return;

    setLoading(true);
    try {
      const { setDoc, doc } = await import("firebase/firestore");
      const { db } = await import("../../firebase/config");

      await setDoc(doc(db, "fundManagerReports", newYearData.year), {
        title: newYearData.title,
        year: parseInt(newYearData.year),
        items: [],
      });

      await fetchReports();
      setShowAddYearModal(false);
      setNewYearData({ year: "", title: "" });

      alert("Year added successfully!");
    } catch (error) {
      console.error("Error adding year:", error);
      alert(`Error adding year: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditYear = async (yearId, newTitle) => {
    try {
      setLoading(true);
      await updateYearTitle(yearId, newTitle);
      await fetchReports();
      setEditingYear(null);
      alert("Year title updated successfully!");
    } catch (error) {
      console.error("Error updating year:", error);
      alert(`Error updating year: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteYear = async (yearId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this entire year and all its reports?"
      )
    )
      return;

    setLoading(true);
    try {
      await deleteYear(yearId);
      await fetchReports();
      alert("Year deleted successfully!");
    } catch (error) {
      console.error("Error deleting year:", error);
      alert(`Error deleting year: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (yearId, reportIndex) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    setLoading(true);
    try {
      await deleteReport(yearId, reportIndex);
      await fetchReports();
      alert("Report deleted successfully!");
    } catch (error) {
      console.error("Error deleting report:", error);
      alert(`Error deleting report: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Auth handling
  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  // Modal handlers
  const closeAddReportModal = () => {
    setShowAddModal(false);
    setNewReport({ title: "", file: null });
    setSelectedYear("");
    setUploadProgress(0);
  };

  const closeAddYearModal = () => {
    setShowAddYearModal(false);
    setNewYearData({ year: "", title: "" });
  };

  // Loading states
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryBlue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <AdminHeader user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Action Buttons */}
          <div className="mb-8 flex flex-wrap gap-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-primaryBlue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 btn-hover"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Report
            </button>
            <button
              onClick={() => setShowAddYearModal(true)}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-xl shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBlue transition-all duration-200"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Year
            </button>
          </div>

          {/* Reports List */}
          <div className="space-y-8">
            {reports.length === 0 && !loading ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <DocumentIcon className="mx-auto h-16 w-16 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No reports found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Get started by adding a new year or report.
                </p>
              </div>
            ) : (
              reports.map((yearData) => (
                <YearCard
                  key={yearData.id}
                  yearData={yearData}
                  editingYear={editingYear}
                  editYearTitle={editYearTitle}
                  setEditingYear={setEditingYear}
                  setEditYearTitle={setEditYearTitle}
                  onEditYear={handleEditYear}
                  onDeleteYear={handleDeleteYear}
                  onDeleteReport={handleDeleteReport}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddReportModal
        show={showAddModal}
        onClose={closeAddReportModal}
        onSubmit={handleAddReport}
        reports={reports}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        newReport={newReport}
        setNewReport={setNewReport}
        handleFileChange={handleFileChange}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      />

      <AddYearModal
        show={showAddYearModal}
        onClose={closeAddYearModal}
        onSubmit={handleAddYear}
        newYearData={newYearData}
        setNewYearData={setNewYearData}
        loading={loading}
      />

      {/* Loading Overlay */}
      <LoadingOverlay show={loading} />

      {/* Global Styles */}
      <style jsx global>{`
        /* Smooth animations */
        * {
          transition: all 0.2s ease;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Button hover animations */
        .btn-hover {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-hover:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }

        .btn-hover::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        .btn-hover:hover::before {
          left: 100%;
        }

        /* File input custom styling */
        input[type="file"]:hover {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Form focus styles */
        .form-focus:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          transform: scale(1.02);
        }

        /* Enhanced shadows */
        .shadow-enhanced {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .shadow-enhanced:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        /* Progress bar animation */
        .progress-bar {
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          transition: width 0.3s ease-in-out;
          border-radius: 9999px;
        }

        /* Modal entrance animation */
        .modal-enter {
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Year card animations */
        .year-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .year-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        /* Report row hover effects */
        .report-row {
          transition: all 0.2s ease;
        }

        .report-row:hover {
          background-color: #f8fafc;
          transform: translateX(4px);
          border-left: 4px solid #3b82f6;
        }

        /* Icon animations */
        .icon-hover {
          transition: transform 0.2s ease;
        }

        .icon-hover:hover {
          transform: scale(1.1);
        }

        /* Year header gradient */
        .year-header {
          background: linear-gradient(
            135deg,
            #3b82f6 0%,
            #1d4ed8 50%,
            #1e40af 100%
          );
          position: relative;
        }

        .year-header::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 49%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 51%
          );
          background-size: 20px 20px;
          animation: shimmer 3s linear infinite;
          opacity: 0.3;
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        /* File type icon gradients */
        .pdf-gradient {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .ppt-gradient {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .mobile-stack {
            flex-direction: column;
            align-items: stretch;
          }

          .mobile-full {
            width: 100%;
          }

          .mobile-text-sm {
            font-size: 0.875rem;
          }
        }

        /* Upload progress styling */
        .upload-progress {
          background: linear-gradient(
            90deg,
            #10b981 0%,
            #059669 50%,
            #047857 100%
          );
          background-size: 200% 100%;
          animation: progressShimmer 2s linear infinite;
        }

        @keyframes progressShimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Loading spinner */
        .spinner {
          border: 3px solid #f3f4f6;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Enhanced button styles */
        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background-color: #f8fafc;
          border-color: #3b82f6;
          color: #3b82f6;
          transform: translateY(-1px);
        }

        /* Delete confirmation animation */
        .delete-confirm {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(2px);
          }
        }

        /* Success animation */
        .success-pulse {
          animation: successPulse 0.6s ease-in-out;
        }

        @keyframes successPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Enhanced typography */
        .text-gradient {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Backdrop blur effect */
        .backdrop-blur {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* Hover effects for interactive elements */
        .interactive-hover:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Focus states for accessibility */
        .focus-visible:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Card entrance animations */
        .card-animate {
          animation: slideIn 0.6s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
