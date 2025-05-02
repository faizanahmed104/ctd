"use client";

import React from "react";
import { Controller } from "react-hook-form";

export const Input = ({
  name,
  control,
  label,
  type = "text",
  defaultValue = "",
  errors,
  required = false,
  disabled = false,
  placeholder = "",
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full border p-2 rounded  ${
              errors?.[name] ? "border-red-500" : ""
            } focus:border-[#50B69A] focus:ring-[#50B69A] sm:text-sm ${
              disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
          />
        )}
      />
      {errors?.[name] && (
        <p className="mt-2 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};
