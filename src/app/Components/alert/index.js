"use client";
import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";

const Alert = ({ isOpen, onClose, message }) => {
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative shadow-2xl transform transition-all duration-300 ease-in-out animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <IoMdClose size={24} className="text-gray-600" />
        </button>

        {/* Alert content */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-red-100 p-3 rounded-full">
            <IoWarningOutline size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Access Denied</h3>
          <div className="text-center">
            <p className="text-gray-600">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="mt-2 bg-tealCustom text-white px-6 py-2 rounded-lg hover:bg-tealCustom/90 transition-colors duration-200 font-medium"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
