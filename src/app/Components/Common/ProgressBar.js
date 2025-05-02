import React from 'react';

const ProgressBar = ({ 
  progress, 
  height = "h-2",
  bgColor = "bg-gray-200",
  fillColor = "bg-[#50B69A]",
  className = "",
  showLabel = false,
  labelPosition = "below" // 'below' or 'inside'
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className={`w-full ${bgColor} rounded ${height} ${className}`}>
        <div
          className={`${fillColor} ${height} rounded transition-all duration-300`}
          style={{ width: `${progress}%` }}
        >
          {showLabel && labelPosition === 'inside' && (
            <span className="text-xs text-white px-2">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      </div>
      {showLabel && labelPosition === 'below' && (
        <span className="text-sm text-gray-600">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
