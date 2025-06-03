// SignatureCanvas.jsx - Fixed coordinate scaling for accurate drawing
import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Trash2 } from "lucide-react";

const SignatureCanvas = forwardRef(
  ({ onSignatureChange, width = 400, height = 200 }, ref) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

    // Expose clear method to parent components
    useImperativeHandle(ref, () => ({
      clearSignature: () => {
        clearSignature();
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      // Set canvas internal dimensions
      canvas.width = width;
      canvas.height = height;

      // Set up canvas context
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Set canvas background to white
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ensure canvas CSS size matches internal dimensions to prevent scaling issues
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
    }, [width, height]);

    const getCanvasPosition = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();

      // Get the actual displayed size
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      // Calculate scaling factors
      const scaleX = canvas.width / displayWidth;
      const scaleY = canvas.height / displayHeight;

      // Get client coordinates relative to canvas
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      return {
        x: clientX * scaleX,
        y: clientY * scaleY,
      };
    };

    const getTouchCanvasPosition = (touch) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();

      // Get the actual displayed size
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      // Calculate scaling factors
      const scaleX = canvas.width / displayWidth;
      const scaleY = canvas.height / displayHeight;

      // Get touch coordinates relative to canvas
      const clientX = touch.clientX - rect.left;
      const clientY = touch.clientY - rect.top;

      return {
        x: clientX * scaleX,
        y: clientY * scaleY,
      };
    };

    const startDrawing = (e) => {
      e.preventDefault();
      setIsDrawing(true);
      const pos = getCanvasPosition(e);
      setLastPosition(pos);

      // Start a new path
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const draw = (e) => {
      if (!isDrawing) return;
      e.preventDefault();

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const currentPos = getCanvasPosition(e);

      // Draw line from last position to current position
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();

      setLastPosition(currentPos);

      // Convert to base64 and notify parent
      const signatureData = canvas.toDataURL("image/png");
      onSignatureChange(signatureData);
    };

    const stopDrawing = (e) => {
      if (isDrawing) {
        e.preventDefault();
        setIsDrawing(false);

        // End the current path
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.beginPath(); // Start a new path for the next stroke
      }
    };

    const clearSignature = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      // Clear and reset background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Reset stroke properties
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      onSignatureChange(null);
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const pos = getTouchCanvasPosition(touch);

      setIsDrawing(true);
      setLastPosition(pos);

      // Start a new path
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const handleTouchMove = (e) => {
      if (!isDrawing) return;
      e.preventDefault();

      const touch = e.touches[0];
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const currentPos = getTouchCanvasPosition(touch);

      // Draw line from last position to current position
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();

      setLastPosition(currentPos);

      // Convert to base64 and notify parent
      const signatureData = canvas.toDataURL("image/png");
      onSignatureChange(signatureData);
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      if (isDrawing) {
        setIsDrawing(false);

        // End the current path
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.beginPath(); // Start a new path for the next stroke
      }
    };

    return (
      <div className="signature-container">
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-300 rounded-lg cursor-crosshair bg-white touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            maxWidth: "100%",
            display: "block",
          }}
        />
        <button
          type="button"
          onClick={clearSignature}
          className="mt-2 flex items-center gap-2 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          <Trash2 size={16} />
          Clear Signature
        </button>
      </div>
    );
  }
);

SignatureCanvas.displayName = "SignatureCanvas";

export default SignatureCanvas;
