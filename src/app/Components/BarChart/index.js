"use client";
import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { apiUrl, endpoints } from "../../Helpers/Endpoints";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  getCategoryBasedEmissions,
  selectAnalyticsCEState,
} from "../../../store/slices/analytics";

const BarChart = ({ startDate, endDate }) => {
  const dispatch = useAppDispatch();
  const { analyticsCE } = useAppSelector(selectAnalyticsCEState);
  console.log("analyticsCE", analyticsCE);
  
  const [categories, setCategories] = useState([
    "Stationary Combustion",
    "Mobile Combustion",
    "Fugitive Emissions",
    "Purchased Electricity",
    "Purchased Heat/Cooling",
    "Purchased Goods & Services",
    "End Of Life Treatment of SO",
    "Upstream Leased Assets",
    "Downstream Leased Assets",
    "Franchises",
    "Investments",
    "Capital Goods",
    "Fuel and Energy Related Activities",
    "Upstream Transportation",
    "Downstream Transportation",
    "Business Travel",
    "Employee Commute",
    "Waste Generated",
  ]);

  const [data, setData] = useState([
    62, // Stationary Combustion
    8, // Mobile Combustion
    7, // Fugitive Emissions
    7, // Purchased Electricity
    4, // Purchased Heat/Cooling
    2, // Purchased Goods & Services
    2, // End Of Life Treatment of SO
    0, // Upstream Leased Assets
    0, // Downstream Leased Assets
    0, // Franchises
    0, // Investments
    0, // Capital Goods
    0, // Fuel and Energy Related Activities
    0, // Upstream Transportation
    0, // Downstream Transportation
    0, // Business Travel
    0, // Employee Commute
    0, // Waste Generated
  ]);
  useEffect(() => {
    console.log("startDate or endDate changed:", startDate, endDate);
    dispatch(getCategoryBasedEmissions({ startDate, endDate }));
  }, [startDate, endDate]);
  useEffect(() => {
    const categoriesData = analyticsCE?.map((item) => item?.category);
    const dt = analyticsCE?.map((item) => item?.percentage);
    setCategories(categoriesData);
    setData(dt);
  }, [analyticsCE]);
  return (
    <div className="w-full p-6">
      <ApexCharts
        options={{
          chart: {
            type: "bar",
            height: "auto",
            stacked: false,
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: true, // Make the bars horizontal
              borderRadius: 4, // Rounded bars
              distributed: true,
              columnWidth: "80%", // Adjust bar width
            },
          },
          colors: ["#4aa48b"], // Bar color
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return `${val}%`; // Show percentage on the bars
            },
            style: {
              colors: ["#fff"],
              fontSize: "12px",
              fontWeight: "bold",
            },
          },
          xaxis: {
            categories: categories,
            labels: {
              style: {
                colors: "#6F6E6F",
                fontSize: "12px",
                fontFamily: "font-poppins",

                whiteSpace: "nowrap",
                padding: 20,
                textAlign: "right",
              },
            },
          },
          yaxis: {
            labels: {
              show: true, // Hide y-axis labels (percentages)
              style: {
                colors: "#747375",
                fontSize: "12px",
                fontFamily: "font-poppins",
                fontWeight: "400",
                textAlign: "left",
                overflowWrap: "normal",
                whiteSpace: "nowrap",
              },
              // Add padding to the labels to avoid cutting
            },
          },
          grid: {
            show: false, // Hide grid lines
          },
          title: {
            text: undefined, // Remove the title
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return `${val}%`;
              },
            },
          },
          legend: {
            show: false, // Hide the legend below the chart
          },
        }}
        series={[
          {
            name: "Emissions",
            data: data,
          },
        ]}
        type="bar"
        height={562} // Adjust the overall height
      />
      <div className="text-center mt-4 mb-20" style={{ color: "#8e8d8e" }}>
        <span className="text-lg font-medium">Emissions (TC0²E)</span>
      </div>
    </div>
  );
};

export default BarChart;
