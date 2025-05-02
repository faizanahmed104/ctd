"use client";

import React from "react";
import InfoCardSlider from "./info-card-slider";
import EmissionsForecastChart from "./emissions-forcast-chart";
import IncludesScopes from "./includes-scopes";

const data = [
  {
    companyName: "example: Carbon Track",
    targetType: "SBT",
    reduceAmbition: "42%",
    scopes: "Scopes 1&2",
    baseTargetYears: "2023-2030",
  },
];

const Action = () => {
  const targetHandler = () => {
    console.log("target");
  };

  return (
    <div className="p-4">
      <h1 className="text-[32px] text-[#0b0905] font-bold">
        Reduce Your Emissions
      </h1>
      <span className="text-xl font-medium text-black pt-6 block">
        Carbon Track allows you to drive real emissions reductions. We provide
        dynamic emissions forecasts, helping you visualize when you can achieve
        your targets—ensuring that every action taken moves your company closer
        to a more sustainable future. By setting clear targets aligned with your
        sustainability goals and selecting the right decarbonization strategies,
        you create a structured path toward net-zero.
      </span>
      <div className="flex justify-between items-center mb-4 mt-16">
        <h2 className="text-[32px] font-bold text-[#0b0905]">Targets</h2>
        <button
          className="flex items-center justify-center text-sm font-semibold bg-tealCustom text-white rounded-md w-40 h-8"
          onClick={targetHandler}
        >
          Set Target
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Company Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Target Type
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Reduce Ambition
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Scopes
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Base-Target Years
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {row.companyName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {row.targetType}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {row.reduceAmbition}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {row.scopes}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {row.baseTargetYears}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">
          Getting Started With Target Setting
        </h2>
        <div className="border-2 border-[#50B69A] rounded-lg p-5 flex items-center">
          <div className="w-1/2">
            <div className="bg-blue-100 h-48 flex items-center justify-center">
              <div className="bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center">
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <span className="py-[7px] px-[20px] font-bold rounded-[6px] mb-5 border-2 border-[#50B69A]">
              Introductory Video
            </span>
            <p className="font-medium mt-7">
              Carbon Track helps your organization to be ambitious and
              successful in your decarbonization journey. Get an overview of the
              steps necessary to succeed in our introductory video, and learn
              more about decarbonization action.
            </p>
            <div className="flex justify-end">
              <button className="mt-4 bg-[#50B69A] font-bold text-white px-4 py-2 rounded">
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>
      <InfoCardSlider />
      <div className="overflow-x-auto">
        <h4 className="text-2xl font-bold my-6">Forecast Dashboard</h4>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[22px] text-[#0b0905]">Selected Targets</h4>
          <button
            className="flex items-center justify-center text-sm font-semibold bg-tealCustom text-white rounded-md w-40 h-8"
            onClick={targetHandler}
          >
            Changed Target
          </button>
        </div>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Company Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Target Type
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Reduce Ambition
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Scopes
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Base-Target Years
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {row.companyName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {row.targetType}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {row.reduceAmbition}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {row.scopes}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                  {row.baseTargetYears}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <IncludesScopes />
      <EmissionsForecastChart />
    </div>
  );
};

export default Action;
