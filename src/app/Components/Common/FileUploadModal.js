import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import ProgressBar from "./ProgressBar";

const FileUploadModal = ({ 
  isOpen,
  onClose,
  onFileUpload,
  title = "Upload File",
  acceptedFileTypes = ".xlsx,.xls",
  uploadButtonText = "Upload File",
  uploadingText = "Uploading...",
  successText = "Upload successful!",
  errorText = "Upload failed",
  animationDuration = 2000,
  showProgress = true,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  className = "",
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const progressTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (progressTimer.current) {
        clearInterval(progressTimer.current);
      }
    };
  }, []);

  const startProgressAnimation = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setError("");
    
    const startTime = Date.now();

    progressTimer.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / animationDuration) * 100, 99);
      
      if (elapsed >= animationDuration) {
        clearInterval(progressTimer.current);
      } else {
        setUploadProgress(progress);
      }
    }, 20);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    if (file.size > maxFileSize) {
      setError(`File size should be less than ${maxFileSize / (1024 * 1024)}MB`);
      return false;
    }
    if (acceptedFileTypes && !acceptedFileTypes.split(',').some(type => 
      file.name.toLowerCase().endsWith(type.trim().toLowerCase())
    )) {
      setError(`Accepted file types: ${acceptedFileTypes}`);
      return false;
    }
    return true;
  };

  const handleFile = (file) => {
    if (validateFile(file)) {
      setFile(file);
      setError("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      startProgressAnimation();
      await onFileUpload(file);
      setUploadProgress(100);
      
      setTimeout(() => {
        setFile(null);
        setIsUploading(false);
        onClose();
      }, 500);

    } catch (error) {
      setError(error.message || errorText);
      setUploadProgress(0);
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white p-6 rounded-lg w-[500px] relative ${className}`}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-2xl font-medium mb-6">{title}</h2>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="space-y-4">
              <p className="text-green-600">Selected file: {file.name}</p>
              
              {showProgress && isUploading && (
                <ProgressBar 
                  progress={uploadProgress}
                  showLabel
                  labelPosition="below"
                />
              )}

              {error && <p className="text-red-500">{error}</p>}

              <button
                onClick={handleUpload}
                disabled={isUploading}
                className={`bg-[#50B69A] text-white px-6 py-2 rounded ${
                  isUploading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#3d8f7a]"
                }`}
              >
                {isUploading ? uploadingText : uploadButtonText}
              </button>
            </div>
          ) : (
            <>
              <p className="mb-4">Drag and drop your file here</p>
              <p className="text-gray-500">or</p>
              <label className="mt-4 inline-block">
                <input
                  type="file"
                  className="hidden"
                  accept={acceptedFileTypes}
                  onChange={handleChange}
                />
                <span className="bg-[#50B69A] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#3d8f7a]">
                  Browse Files
                </span>
              </label>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;
