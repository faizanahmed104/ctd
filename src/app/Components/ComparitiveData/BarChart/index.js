"use client"
import React, { useState } from "react";
// import dynamic from "next/dynamic";
import ApexCharts from 'react-apexcharts';

const Barchart = () => {
  const [filter, setFilter] = useState("week"); // State for the filter selection
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Series 1",
        data: [60, 85],
      },
    ],
    options: {
      chart: {
        id: "basic-area",
        type: "bar",

        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          borderRadiusApplication: "end",
          horizontal: true,

          colors: {
            ranges: [
              {
                from: 0,
                to: 60,
                color: "#96D3C3", // Change this color to what you prefer for the bars
              },
              {
                from: 61,
                to: 90,
                color: "#75C4AE", // Change this color to what you prefer for the bars
              },
            ],
          },
        },
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "18px",
            fontWeight: 700, // Make y-axis labels bold
            colors: "#000000",
          },
        },
        categories: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      },

      xaxis: {
        categories: ["Your Company-", "Sector Median-"],
      },
      grid: {
        show: false, // Remove the grid background
      },
    }
  });

  return (
    <div className="rounded-xl w-full py-3">
      <ApexCharts
        options={chartData.options}
        series={chartData.series}
        type="bar"
        width="100%"
        height={200}
      />
    </div>
  );
};

export default Barchart;
