"use client";

import React, { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { AddConsumptionForm } from "./AddConsumptionForm";
import { TemplatePart } from "./TemplatePart";

function AddMobileCombustion({ headerTitle }) {
  const [activeItem, setActiveItem] = useState(-1);

  return (
    <div>
      <div className="flex flex-row items-center justify-between mt-[52px] mb-[29px]">
        <span className="text-[22px] font-medium text-[0B0905]">
          Choose your prefered calculation method
        </span>
        <button className="bg-[#50B69A] rounded-md flex items-center justify-center w-[141px] h-[34px]">
          <span className="text-sm font-semibold font-poppins text-white">
            Requirements
          </span>
        </button>
      </div>
      <div className="rounded-lg border-2 border-[#C4C4C4] px-6 pt-6 pb-[18px] mb-[46px]">
        <div className="flex flex-row items-center justify-between mb-7">
          <div className="inline-flex">
            <span className="text-[22px] font-medium mr-7">
              Fuel Consumption Method
            </span>
            <button className="rounded-[30px] border border-gray-300 px-2 py-1">
              Recommended
            </button>
          </div>
          <span
            onClick={() => setActiveItem(activeItem === 1 ? 0 : 1)}
            className="cursor-pointer"
          >
            {activeItem === 1 || activeItem === -1 ? (
              <SlArrowUp color="#2D4C31" />
            ) : (
              <SlArrowDown color="#2D4C31" />
            )}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-700 ${
            activeItem === 1 || activeItem === -1 ? "max-h-[800px]" : "max-h-0"
          }`}
        >
          <span className="text-base text-black font-poppins">
            To apply this calculation method, you need data on your{" "}
            <strong>consumed amount</strong> per combustion fuel
            <strong> category</strong>. Note that Stationary Combustion often
            requires detail on your fuel type, location of combustion, and
            infrastructure use. Don't worry - we will guide you through this
            process.
          </span>{" "}
          <AddConsumptionForm text={"Fuel Consumption Method"} />
        </div>
      </div>
      <div className="rounded-lg border-2 border-[#C4C4C4] px-6 pt-6 pb-[18px] mb-[46px]">
        <div className="flex flex-row items-center justify-between mb-7">
          <div className="inline-flex">
            <span className="text-[22px] font-medium mr-7">
              Bring Your Own Emissions | {headerTitle}
            </span>
          </div>
          <span
            onClick={() => setActiveItem(activeItem === 3 ? 0 : 3)}
            className="cursor-pointer"
          >
            {activeItem === 3 || activeItem === -1 ? (
              <SlArrowUp color="#2D4C31" />
            ) : (
              <SlArrowDown color="#2D4C31" />
            )}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-700 ${
            activeItem === 3 || activeItem === -1 ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <span className="text-base text-black font-poppins">
            Carbon Track does <strong>neither test nor verify</strong> the
            methodology for any direct emission values entered on the Carbon
            Track platform, and it is your responsibility to ensure the
            underlying calculation methods are in line with your reporting needs
            (e.g. compliance with the GHG Protocol)
          </span>
          <TemplatePart text={"Bring Your Own Emissions"} />
        </div>
      </div>
    </div>
  );
}

export default AddMobileCombustion;
