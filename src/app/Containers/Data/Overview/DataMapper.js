"use client";
import React, { useState } from "react";
import HorizontalCard from "./HorizontalCard";

const DataMapper = ({ title, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={isOpen ? "pb-20" : ""}>
      <div className="flex flex-row items-center">
        <h2 className="text-[32px] font-bold text-[#0b0905] mr-5">{title}</h2>
      </div>
      <div
        className={`overflow-hidden transition-all duration-700 max-h-full opacity-100 pt-5 pb-10`}
      >
        {data?.map((item, index) => (
          <HorizontalCard
            key={index}
            icon={item.icon}
            heading={item.heading}
            headingIcon={item?.headingIcon}
            func={item.func}
          />
        ))}
      </div>
    </div>
  );
};

export default DataMapper;
