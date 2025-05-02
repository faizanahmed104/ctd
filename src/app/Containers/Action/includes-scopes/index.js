"use client";

import { useState } from "react";

const IncludesScopes = () => {
  const [activeTab, setActiveTab] = useState("scope1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scopeData = {
    scope1: {
      alignmentTitle: "Allignment to yearly target [2024]",
      alignmentValue: "-650.78 tCO2e",
      alignmentPercent: "-0.52%",
      alignmentStatus: "Aligned",
      costTitle: "Potential Cost of Compensation",
      costValue: "0 $",
      costSubtitle: "Emission over yearly target",
      intensityTitle: "Emission Intensity",
      intensityValue: "40.27 tCO2e Per Ite",
      intensityPercent: "-0.52%",
      intensitySubtitle: "By the end of 2024",
    },
    scope2: {
      alignmentTitle: "Allignment to yearly target [2025]",
      alignmentValue: "-480.22 tCO2e",
      alignmentPercent: "-0.40%",
      alignmentStatus: "On Track",
      costTitle: "Potential Cost of Compensation",
      costValue: "150 $",
      costSubtitle: "Emission over yearly target",
      intensityTitle: "Emission Intensity",
      intensityValue: "38.91 tCO2e Per Ite",
      intensityPercent: "-0.40%",
      intensitySubtitle: "By the end of 2025",
    },
    scope3: {
      alignmentTitle: "Allignment to yearly target [2026]",
      alignmentValue: "-700.00 tCO2e",
      alignmentPercent: "-0.60%",
      alignmentStatus: "Ahead",
      costTitle: "Potential Cost of Compensation",
      costValue: "0 $",
      costSubtitle: "Emission over yearly target",
      intensityTitle: "Emission Intensity",
      intensityValue: "42.00 tCO2e Per Ite",
      intensityPercent: "-0.60%",
      intensitySubtitle: "By the end of 2026",
    },
  };

  const {
    alignmentTitle,
    alignmentValue,
    alignmentPercent,
    alignmentStatus,
    costTitle,
    costValue,
    costSubtitle,
    intensityTitle,
    intensityValue,
    intensityPercent,
    intensitySubtitle,
  } = scopeData[activeTab];

  return (
    <div className="mt-10 md:p-10">
      <div className="flex items-center gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <div className="text-base font-semibold">Includes Scopes</div>

        <div className="flex space-x-2">
          {["scope1", "scope2", "scope3"].map((scope) => (
            <button
              key={scope}
              onClick={() => handleTabClick(scope)}
              className={`px-4 py-2 text-sm rounded-md transition-colors 
                ${
                  activeTab === scope
                    ? "bg-[#50B69A] text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }
              `}
            >
              {scope.replace("scope", "Scope ")}
            </button>
          ))}
        </div>

        <div className="text-xs text-gray-500">
          Derived from selected absolute reduction target
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-4 overflow-x-auto">
        <div className="bg-white border border-gray-200 rounded-[21px] p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-2">{alignmentTitle}</div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-semibold text-[#3F7855]">
              {alignmentValue}
            </div>
            <div className="text-sm text-black-400 font-bold py-[5px] px-[10px] border border-gray-300 rounded-[11px]">
              {alignmentPercent}
            </div>
          </div>
          <span className="inline-block px-2 py-1 text-xs rounded-[6px] bg-[#50B69A33] text-[#3F7855] border border-[#50B69A]">
            {alignmentStatus}
          </span>
        </div>
        <div className="bg-white border border-gray-200 rounded-[21px] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">{costTitle}</div>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Edit"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2-2L7 16v3h3l9.768-9.768a2.5 2.5 0 00-3.536-3.536z"
                />
              </svg>
            </button>
          </div>
          <div className="text-2xl font-semibold text-[#3F7855] mb-1">
            {costValue}
          </div>
          <div className="text-sm text-gray-400">{costSubtitle}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[21px] p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-2">{intensityTitle}</div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-semibold text-[#3F7855]">
              {intensityValue}
            </div>
            <div className="text-sm text-black-400 font-bold py-[8px] px-[10px] border border-gray-300 rounded-[11px]">
              {intensityPercent}
            </div>
          </div>
          <div className="text-sm text-gray-400 border-1 border-[#3F7855]">
            {intensitySubtitle}
          </div>
        </div>
      </div>
    </div>
  );
};
export default IncludesScopes;
