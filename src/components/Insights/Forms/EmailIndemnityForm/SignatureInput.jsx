// SignatureInput.jsx - Enhanced with external clear support
import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Upload, Pen, Image as ImageIcon, X } from "lucide-react";
import SignatureCanvas from "../PacamRedemption/SignatureCanvas";

const SignatureInput = forwardRef(
  (
    {
      label,
      value,
      onChange,
      mode = "draw", // "draw" or "upload"
      onModeChange,
      required = false,
    },
    ref
  ) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);
    const signatureCanvasRef = useRef(null);

    // Expose clear method to parent components
    useImperativeHandle(ref, () => ({
      clearSignature: () => {
        clearSignature();
        // Also clear the canvas if in draw mode
        if (mode === "draw" && signatureCanvasRef.current) {
          signatureCanvasRef.current.clearSignature();
        }
      },
    }));

    const handleSignatureChange = (signatureData) => {
      onChange(signatureData);
    };

    const handleFileSelect = (file) => {
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (PNG, JPG, etc.)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to process the image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas size (similar to signature canvas)
          canvas.width = 400;
          canvas.height = 200;

          // Fill with white background
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Calculate scaling to fit image in canvas while maintaining aspect ratio
          const scale = Math.min(
            canvas.width / img.width,
            canvas.height / img.height
          );
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;

          // Draw the image
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

          // Convert to base64
          const signatureData = canvas.toDataURL("image/png");
          handleSignatureChange(signatureData);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      handleFileSelect(file);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const clearSignature = () => {
      handleSignatureChange(null);
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const triggerFileInput = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className="space-y-4">
        {/* Label and Mode Toggle */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onModeChange("draw")}
              className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-colors ${
                mode === "draw"
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Pen size={12} />
              Draw
            </button>
            <button
              type="button"
              onClick={() => onModeChange("upload")}
              className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-colors ${
                mode === "upload"
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <ImageIcon size={12} />
              Upload
            </button>
          </div>
        </div>

        {/* Signature Input Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          {mode === "draw" && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">
                Draw your signature using your mouse or finger
              </p>
              <SignatureCanvas
                ref={signatureCanvasRef}
                onSignatureChange={handleSignatureChange}
                width={400}
                height={200}
              />
            </div>
          )}

          {mode === "upload" && (
            <div
              className={`space-y-4 ${
                isDragOver ? "bg-blue-50 border-blue-300" : ""
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {!value ? (
                <div className="text-center py-8">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop your signature image here, or click to browse
                  </p>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Signature uploaded:</p>
                  <div className="relative inline-block">
                    <img
                      src={value}
                      alt="Uploaded signature"
                      className="max-w-full h-48 border border-gray-300 rounded bg-white"
                    />
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="text-blue-600 hover:text-blue-700 text-sm underline"
                  >
                    Replace with different image
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Signature Preview (if exists and in draw mode) */}
        {value && mode === "draw" && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Current signature:</p>
            <div className="relative inline-block">
              <img
                src={value}
                alt="Current signature"
                className="border border-gray-300 rounded bg-white"
                style={{ maxWidth: "400px", height: "auto" }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

SignatureInput.displayName = "SignatureInput";

export default SignatureInput;
