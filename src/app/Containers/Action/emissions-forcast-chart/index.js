"use client";

import React from "react";
import Chart from "react-apexcharts";

const EmissionsForecastChart = () => {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        columnWidth: "70%",
        dataLabels: {
          position: "top", // Show data labels on top
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}%`,
      offsetY: 0,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    colors: ["#1E497D", "#A9C8E8", "#FFC72C"], // Blue for past, light blue for forecasted, yellow for above target
    xaxis: {
      categories: [
        "2020",
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
      ],
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toLocaleString(),
      },
    },
    legend: {
      show: true,
      position: "bottom",
      markers: {
        radius: 12,
      },
      labels: {
        colors: "#000",
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
  };

  const series = [
    {
      name: "Past Emissions",
      data: [22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      color: "#1E497D",
    },
    {
      name: "Forecasted Emissions",
      data: [0, 25, 22, 30, 25, 0, 30, 25, 40, 22, 30],
      color: "#A9C8E8",
    },
    {
      name: "Emissions Above Target",
      data: [0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0],
      color: "#FFC72C",
    },
  ];

  return (
    <div className="p-4 mt-6 border border-gray-300 rounded-lg bg-white shadow-md">
      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-bold">Emissions Forecast</h2>
        <h3 className="text-lg font-semibold">Configure Growth Data</h3>
      </div>
      <Chart options={options} series={series} type="bar" height={400} />
    </div>
  );
};

export default EmissionsForecastChart;
