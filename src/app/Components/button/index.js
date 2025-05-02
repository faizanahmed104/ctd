import React from "react";

export const Button = ({
  onClick,
  children,
  type = "button",
  className = "",
  disabled = false,
  loading = false,
  variant = "filled",
  style = {},
}) => {
  const getVariantStyles = () => {
    if (disabled) {
      return {
        backgroundColor: variant === "filled" ? "#9CB5AD" : "white",
        color: variant === "filled" ? "white" : "#9CB5AD",
        border: variant === "outlined" ? "1px solid #9CB5AD" : "none",
      };
    }
    return {
      backgroundColor: variant === "filled" ? "#50B69A" : "white",
      color: variant === "filled" ? "white" : "#50B69A",
      border: variant === "outlined" ? "1px solid #50B69A" : "none",
      transition: "all 0.3s ease",
      ':hover': {
        transform: 'scale(1.02)',
        backgroundColor: variant === "filled" ? "#3da084" : "#f0f9f6",
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }
    };
  };

  const defaultStyles = {
    ...getVariantStyles(),
    borderRadius: "0.375rem",
    width: "141px",
    height: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    ...style,
  };

  return (
    <button
      type={type}
      className={`btn ${className} hover:scale-[1.02] transition-all duration-300 ease-in-out`}
      onClick={onClick}
      disabled={disabled || loading}
      style={defaultStyles}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.backgroundColor = variant === "filled" ? "#3da084" : "#f0f9f6";
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = variant === "filled" ? "#50B69A" : "white";
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {loading ? (
        <div className="flex items-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};
