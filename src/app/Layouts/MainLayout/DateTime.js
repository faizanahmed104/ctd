"use client";

import React, { useState, useEffect } from "react";
import { FiClock, FiCalendar } from "react-icons/fi";

const DateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-lg p-4 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-tealCustom">
          <FiCalendar className="w-5 h-5" />
          <p className="text-sm font-medium">{formatDate(dateTime)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <FiClock className="w-5 h-5 text-tealCustom" />
          <p className="text-2xl font-bold text-darkGreenCustom tracking-wider">
            {formatTime(dateTime)}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-green-700 rounded-b-lg" />
    </div>
  );
};

export default DateTime;