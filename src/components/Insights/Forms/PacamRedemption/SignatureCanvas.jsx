// SignatureCanvas.jsx - Enhanced with external clear support
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
      const ctx = canvas.getContext("2d");

      // Set up canvas
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Set canvas background to white
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const getCanvasPosition = (e) => {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const startDrawing = (e) => {
      setIsDrawing(true);
      const pos = getCanvasPosition(e);
      setLastPosition(pos);
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const currentPos = getCanvasPosition(e);

      ctx.beginPath();
      ctx.moveTo(lastPosition.x, lastPosition.y);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();

      setLastPosition(currentPos);

      // Convert to base64 and notify parent
      const signatureData = canvas.toDataURL("image/png");
      onSignatureChange(signatureData);
    };

    const stopDrawing = () => {
      setIsDrawing(false);
    };

    const clearSignature = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Clear and reset background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      onSignatureChange(null);
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousedown", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      startDrawing(mouseEvent);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      draw(mouseEvent);
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      stopDrawing();
    };

    return (
      <div className="signature-container">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border-2 border-gray-300 rounded-lg cursor-crosshair bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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
