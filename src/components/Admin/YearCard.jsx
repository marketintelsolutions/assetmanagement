import React from "react";
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
  DocumentIcon,
  PresentationChartLineIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";

const YearCard = ({
  yearData,
  editingYear,
  editYearTitle,
  setEditingYear,
  setEditYearTitle,
  onEditYear,
  onDeleteYear,
  onDeleteReport,
}) => {
  return (
    <div className="bg-white shadow-lg overflow-hidden rounded-2xl border border-gray-200 year-card">
      {/* Year Header */}
      <div className="px-6 py-6 bg-gradient-to-r from-primaryBlue to-blue-600 text-white year-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {editingYear === yearData.id ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editYearTitle}
                  onChange={(e) => setEditYearTitle(e.target.value)}
                  className="text-lg font-semibold bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Year title"
                />
                <button
                  onClick={() => onEditYear(yearData.id, editYearTitle)}
                  className="p-1 hover:bg-white/20 rounded icon-hover"
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setEditingYear(null)}
                  className="p-1 hover:bg-white/20 rounded icon-hover"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold">{yearData.title}</h3>
                <button
                  onClick={() => {
                    setEditingYear(yearData.id);
                    setEditYearTitle(yearData.title);
                  }}
                  className="p-1 hover:bg-white/20 rounded transition-colors icon-hover"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {yearData.items?.length || 0} report
              {(yearData.items?.length || 0) !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => onDeleteYear(yearData.id)}
              className="p-2 hover:bg-red-500/20 rounded-full transition-colors icon-hover"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="divide-y divide-gray-200">
        {yearData.items?.map((report, index) => (
          <div
            key={index}
            className="px-6 py-6 hover:bg-gray-50 transition-colors report-row"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {report.ppt ? (
                    <div className="p-3 bg-orange-100 rounded-xl ppt-gradient">
                      <PresentationChartLineIcon className="h-8 w-8 text-orange-600" />
                    </div>
                  ) : (
                    <div className="p-3 bg-red-100 rounded-xl pdf-gradient">
                      <DocumentIcon className="h-8 w-8 text-red-600" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900">
                    {report.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Uploaded:{" "}
                    {new Date(
                      report.uploadDate?.toDate?.() || report.uploadDate
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    File: {report.fileName}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href={report.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-primaryBlue bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <CloudArrowUpIcon className="h-4 w-4 mr-2" />
                  View
                </a>
                <button
                  onClick={() => onDeleteReport(yearData.id, index)}
                  className="inline-flex items-center px-4 py-2 border border-red-200 text-sm font-medium rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )) || []}

        {(!yearData.items || yearData.items.length === 0) && (
          <div className="px-6 py-12 text-center">
            <DocumentIcon className="mx-auto h-12 w-12 text-gray-300" />
            <p className="mt-2 text-sm text-gray-500">
              No reports for this year
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .year-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .year-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .report-row {
          transition: all 0.2s ease;
        }

        .report-row:hover {
          background-color: #f8fafc;
          transform: translateX(4px);
          border-left: 4px solid #3b82f6;
        }

        .icon-hover {
          transition: transform 0.2s ease;
        }

        .icon-hover:hover {
          transform: scale(1.1);
        }

        .year-header {
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

        .pdf-gradient {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .ppt-gradient {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }
      `}</style>
    </div>
  );
};

export default YearCard;
