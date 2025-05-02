"use client"
import React, { useState } from 'react';
import { SlArrowDown } from "react-icons/sl";

const CustomDropDown = ({ options, placeholder = 'Select an option' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Dropdown Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer mr-10 flex items-center justify-center"
      >
        <span className='text-[#08120F] text-lg font-medium font-poppins hover:text-gray-900 pb-1'>{selected || placeholder}</span>
        <img src="/chevron-down.png" className='w-4 h-2 object-contain ml-2' />

      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white shadow-md border border-gray-200 rounded-md w-40 z-10">
          <ul className="text-gray-700">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropDown;
