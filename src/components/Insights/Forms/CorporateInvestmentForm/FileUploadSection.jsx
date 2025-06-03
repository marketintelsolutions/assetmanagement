// FileUploadSection.jsx
import React, { useRef, useState } from "react";
import { Upload, X, FileText, Image, File } from "lucide-react";

const FileUploadSection = ({
  attachments = [], // Add default empty array
  onFileUpload,
  onRemoveAttachment,
}) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter((file) => {
      // Check file size (max 10MB per file)
      if (file.size > 10 * 1024 * 1024) {
        alert(
          `File "${file.name}" is too large. Maximum size is 10MB per file.`
        );
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onFileUpload(validFiles);
    }
  };

  const handleFileInputChange = (e) => {
    handleFileSelect(e.target.files);
    e.target.value = ""; // Reset input to allow same file selection again
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return <Image size={16} className="text-blue-600" />;
    } else if (fileType === "application/pdf") {
      return <FileText size={16} className="text-red-600" />;
    } else {
      return <File size={16} className="text-gray-600" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">
        Document Attachments
      </h4>
      <p className="text-sm text-gray-600">
        Please upload the required documents: Passport photograph, Recent
        utility bill, Valid ID, CAC Forms (C07, C02), Board Resolution
      </p>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop your files here, or click to browse
        </p>
        <button
          type="button"
          onClick={triggerFileInput}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Choose Files
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Attached Files List */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          <h5 className="font-medium text-gray-700">Attached Files:</h5>
          <div className="space-y-2">
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(attachment.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(attachment.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveAttachment(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500">
            Total files: {attachments.length} | Total size:{" "}
            {formatFileSize(
              attachments.reduce((total, file) => total + file.size, 0)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;
