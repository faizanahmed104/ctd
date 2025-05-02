"use client"
import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import { ApexOptions } from "apexcharts";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import ApexCharts from 'react-apexcharts';

const SingleColumnChart = () => {
  const data = [
    {
      label: "Waste",
      upper: 10,
      lower: 10,
    },
    {
      label: "Travel & Commute",
      upper: 20,
      lower: 60,
    },
    {
      label: "Service Purchase",
      upper: 5,
      lower: 8,
    },
    {
      label: "Product Purchase",
      upper: 70,
      lower: 20,
    },
    {
      label: "Nolmpact",
      upper: 15,
      lower: 55,
    },
    {
      label: "Freight",
      upper: 16,
      lower: 16,
    },
    {
      label: "Food & Drinks",
      upper: 5,
      lower: 7,
    },
    {
      label: "Energy & Water Supply",
      upper: 60,
      lower: 79,
    },
  ];
  return (
    <div className="flex flex-col gap-8 p-6  rounded-[24px] shadow-md">
      <div className="font-bold text-[18px]">Company Emissions</div>
      <div className="grid grid-cols-8 justify-center">
        {data.map((item, index) => {
          return (
            <div
              key={"item-" + index}
              className="w-full flex-col flex justify-center items-center gap-4"
            >
              <div className="h-[200px] flex flex-col justify-end w-6 rounded-full bg-[#C4C4C4]">
                <div
                  className={`w-full relative bg-[#50B69A] rounded-full flex justify-center items-center`}
                  style={{ height: item.upper + 10 + "%" }}
                >
                  <span className="-rotate-90 absolute text-sm text-white w-full flex justify-center items-center">
                    {/* {item.upper}% */}
                  </span>
                </div>
              </div>
              <div className="font-bold text-[12px] text-[#2D4C31] text-center">
                {item.label}
              </div>
              <div className="h-[200px] flex flex-col w-6 rounded-full bg-[#C4C4C4]">
                <div
                  className={`w-full h-[90%] relative bg-[#50B69A] rounded-full flex justify-center items-center`}
                  style={{ height: item.lower + 10 + "%" }}
                >
                  <span className="-rotate-90 absolute text-sm text-white w-full flex justify-center items-center">
                    {/* {item.lower}% */}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="font-bold text-[18px]">Sector Emission</div>
    </div>
  );
};

export default SingleColumnChart;
