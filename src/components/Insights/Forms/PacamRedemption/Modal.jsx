// Modal.jsx
import React from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

const Modal = ({ isOpen, onClose, type, message, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          {/* Close button */}
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div
              className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                type === "success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {type === "success" ? (
                <CheckCircle
                  className={`h-6 w-6 ${
                    type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                />
              ) : (
                <AlertCircle
                  className={`h-6 w-6 ${
                    type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                />
              )}
            </div>

            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                className={`text-base font-semibold leading-6 ${
                  type === "success" ? "text-green-900" : "text-red-900"
                }`}
              >
                {title || (type === "success" ? "Success!" : "Error")}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500 whitespace-pre-line">
                  {message}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                type === "success"
                  ? "bg-green-600 hover:bg-green-500 focus-visible:outline-green-600"
                  : "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
              }`}
              onClick={onClose}
            >
              {type === "success" ? "Great!" : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
