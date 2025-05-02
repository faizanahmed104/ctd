"use client";
import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";

const HorizontalCard = ({ icon, heading, headingIcon, func }) => {

  return (
    <div
      className="flex flex-row justify-between px-[18px] py-[30px] mb-6 "
      style={{
        boxShadow: "1px 10px 10px -5px #0000001a",
      }}
    >
      <div className="flex flex-row items-center">
        {icon}
        <h5 className="font-semibold text-2xl ml-9 text-black">{heading}</h5>
        {headingIcon && (
          <img src={headingIcon} className="w-6 h-6 object-contain ml-[14px]" />
        )}
      </div>
      <button className="flex flex-row items-center" onClick={func}>
        <span className="text-[#86ccb8] text-2xl font-semibold mr-4">
          Update Data
        </span>
        <RiArrowRightSLine color="#bae2d7" size={30} />
      </button>
    </div>
  );
};

export default HorizontalCard;