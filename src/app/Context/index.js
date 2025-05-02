"use client";
import { format, subMonths } from "date-fns";
import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [activeHeader, setActiveHeader] = useState(1);
  const [activeItem, setActiveItem] = useState(0);
  const [monthlyEmissions, setMonthlyEmissions] = useState({
    heading: "Monthly Emissions",
    subHeading: format(subMonths(new Date(), 1), "MMM"),
    carbonEmission: 200,
    comparisionText: "+12",
    comparisionItem: format(subMonths(new Date(), 2), "MMM"),
    data: [10, 20, 30, 40, 50],
    labels: [],
  });

  return (
    <AppContext.Provider
      value={{
        activeHeader,
        setActiveHeader,
        activeItem,
        setActiveItem,
        monthlyEmissions,
        setMonthlyEmissions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

export const useAuth = () => {
  return useContext(AppContext);
};
