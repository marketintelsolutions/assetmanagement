// DocumentUploadSection.jsx - Updated for Mutual Fund compatibility
import React, { useRef } from "react";
import { Upload, X, FileText, Image, File, CheckCircle } from "lucide-react";

const DocumentUploadSection = ({
  formData,
  onDocumentUpload,
  onRemoveDocument,
  documentContext = "corporate", // "corporate" or "mutualFund"
}) => {
  const fileInputRefs = {
    passportPhoto: useRef(null),
    utilityBill: useRef(null),
    validId: useRef(null),
    cacForms: useRef(null),
    boardResolution: useRef(null),
  };

  // Document types based on context
  const getDocumentTypes = () => {
    if (documentContext === "mutualFund") {
      return [
        {
          key: "passportPhoto",
          label: "Passport Photograph",
          description: "Passport photograph for all applicants",
          accept: ".jpg,.jpeg,.png",
          required: true,
        },
        {
          key: "utilityBill",
          label: "Recent Utility Bill",
          description: "Not more than 3 months old",
          accept: ".pdf,.jpg,.jpeg,.png",
          required: true,
        },
        {
          key: "validId",
          label: "Valid Means of Identification",
          description:
            "National ID, Driver's License, International passport, etc.",
          accept: ".pdf,.jpg,.jpeg,.png",
          required: true,
        },
      ];
    } else {
      // Corporate investment document types
      return [
        {
          key: "passportPhoto",
          label: "Passport Photograph",
          description: "Passport photograph for all signatories",
          accept: ".jpg,.jpeg,.png",
          required: false,
        },
        {
          key: "utilityBill",
          label: "Recent Utility Bill",
          description: "Not more than 3 months old",
          accept: ".pdf,.jpg,.jpeg,.png",
          required: false,
        },
        {
          key: "validId",
          label: "Valid Means of Identification",
          description:
            "National ID, Driver's License, International passport, etc.",
          accept: ".pdf,.jpg,.jpeg,.png",
          required: false,
        },
        {
          key: "cacForms",
          label: "Copy of CAC Forms",
          description: "CAC Forms (C07, C02)",
          accept: ".pdf,.jpg,.jpeg,.png",
          required: false,
        },
        {
          key: "boardResolution",
          label: "Board Resolution",
          description: "Official board resolution document",
          accept: ".pdf,.doc,.docx",
          required: false,
        },
      ];
    }
  };

  const documentTypes = getDocumentTypes();

  const handleFileSelect = (documentKey, file) => {
    if (!file) return;

    // Check file size (max 10MB per file)
    if (file.size > 10 * 1024 * 1024) {
      alert(`File "${file.name}" is too large. Maximum size is 10MB per file.`);
      return;
    }

    onDocumentUpload(documentKey, {
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    });
  };

  const handleFileInputChange = (documentKey, e) => {
    const file = e.target.files[0];
    handleFileSelect(documentKey, file);
    e.target.value = ""; // Reset input to allow same file selection again
  };

  const triggerFileInput = (documentKey) => {
    fileInputRefs[documentKey].current?.click();
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith("image/")) {
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

  const getUploadedDocument = (documentKey) => {
    return formData.uploadedDocuments?.[documentKey];
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          Required Documents
        </h4>
        <p className="text-sm text-gray-600 mb-6">
          Please upload supporting documents. Each document type should be
          uploaded separately.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {documentTypes.map((docType) => {
          const uploadedDoc = getUploadedDocument(docType.key);
          const isUploaded = !!uploadedDoc;

          return (
            <div
              key={docType.key}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      isUploaded ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    {isUploaded ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <Upload size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">
                      {docType.label}
                      {docType.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h5>
                    <p className="text-sm text-gray-500">
                      {docType.description}
                    </p>
                  </div>
                </div>
              </div>

              {!isUploaded ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload {docType.label.toLowerCase()}
                  </p>
                  <button
                    type="button"
                    onClick={() => triggerFileInput(docType.key)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Choose File
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Max 10MB • {docType.accept.replace(/\./g, "").toUpperCase()}
                  </p>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(uploadedDoc.type)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {uploadedDoc.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(uploadedDoc.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-green-600 font-medium">
                        Uploaded
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveDocument(docType.key)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerFileInput(docType.key)}
                    className="text-blue-600 hover:text-blue-700 text-xs underline mt-2"
                  >
                    Replace with different file
                  </button>
                </div>
              )}

              <input
                ref={fileInputRefs[docType.key]}
                type="file"
                accept={docType.accept}
                onChange={(e) => handleFileInputChange(docType.key, e)}
                className="hidden"
              />
            </div>
          );
        })}
      </div>

      {/* Upload Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h5 className="font-medium text-gray-900 mb-2">Upload Summary</h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Available Documents:</span>
            <span className="ml-2 font-medium">{documentTypes.length}</span>
          </div>
          <div>
            <span className="text-gray-600">Uploaded:</span>
            <span className="ml-2 font-medium text-green-600">
              {Object.keys(formData.uploadedDocuments || {}).length}
            </span>
          </div>
        </div>

        {formData.uploadedDocuments &&
          Object.keys(formData.uploadedDocuments).length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-gray-500">
                Total size:{" "}
                {formatFileSize(
                  Object.values(formData.uploadedDocuments).reduce(
                    (total, doc) => total + doc.size,
                    0
                  )
                )}
              </span>
            </div>
          )}
      </div>
    </div>
  );
};

export default DocumentUploadSection;
