import React, { memo, useMemo } from 'react';
import Chart from 'react-apexcharts';

function EmissionsOverTime({ data, categories }) {
  const options = useMemo(() => ({
    chart: {
      type: 'area',
      toolbar: { show: false },
    },
    xaxis: {
      labels: {
        enabled: true,
        style: {
          colors: '#333',
          fontSize: '9px',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'medium',
        },
        offsetX: 10,
      },
      tickPlacement: 'on',
      tickAmount: 12,
      categories: categories,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#50B69A'],
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    yaxis: {
      labels: {
        show: true,
        enabled: true,
      },
    },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 8,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        show: true,
        enabled: true,
      },
    },
    colors: ['#34a853'],
    stroke: {
      curve: 'smooth',
    },
  }), [categories]);

  return (
    <Chart
      key={`${data.length}-${categories.length}`} // Force rerender on data or categories change
      options={options}
      series={[{ name: 'Emissions Over Time', data }]}
      type="area"
      height={480}
    />
  );
}

export default memo(EmissionsOverTime);


// import React, { memo, useMemo } from 'react';
// import Chart from 'react-apexcharts';

// function EmissionsOverTime({ data, categories }) {
//   // Log the data and categories
//   console.log("Data:", data);
//   console.log("Categories:", categories);

//   // Ensure valid data and categories before rendering
//   if (!data || !categories || data.length === 0 || categories.length === 0) {
//     return <div>Loading chart...</div>; // Placeholder for missing data
//   }

  // Memoized chart options
//   const chartOptions = {
//     chart: {
//       id: 'area-chart',
//       type: 'area',
//       toolbar: { show: false },
//     },
//     xaxis: {
//       categories, // X-axis labels
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 2,
//       colors: ['#50B69A'], // Line color
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         shade: 'light',
//         gradientToColors: ['#50B69A'],
//         opacityFrom: 0.6,
//         opacityTo: 0,
//       },
//     },
//     dataLabels: { enabled: false },
//     legend: { show: false },
//     tooltip: { enabled: true }, // Enable tooltips for better UX
//     grid: { show: false },
//     colors: ['#50B69A'],
//   }
// ), [categories]);

  // Memoized series
//   const chartSeries = [
//     { name: 'Emissions Over Time', data }] // Y-axis data values
//   ], [data]);

  // Render the chart
//                     options={{
//     chart: {
//         type: 'area', // Using area chart instead of line chart
//         toolbar: { show: false },
//     },
//     grid: {
//         show: false, // No horizontal lines in the background
//     },
//     fill: {
//         type: 'gradient', // Use gradient fill
//         gradient: {
//             shade: 'light', // Light shade for the gradient
//             type: 'vertical', // Vertical gradient (top to bottom)
//             shadeIntensity: 0.5, // Gradient intensity
//             gradientToColors: [comparisionText.includes('-') ? "#E2362F" : '#50B69A'], // Gradient color at the bottom
//             inverseColors: false, // No inverse gradient colors
//             opacityFrom: 0.6, // Opacity at the top
//             opacityTo: 0, // Opacity at the bottom
//             stops: [0, 100], // Gradient stops (start from 0% to 100%)
//         },
//     },
//     xaxis: {
//         labels: { show: false }, // Hide x-axis labels
//         axisBorder: { show: false }, // Hide the x-axis line
//         axisTicks: { show: false }, // Hide ticks on the x-axis
//         tickPlacement: 'off',
//     },
//     yaxis: {
//         labels: { show: false }, // Hide y-axis labels
//         axisBorder: { show: false }, // Hide the y-axis line
//     },
//     stroke: {
//         curve: 'smooth', // Smooth curve for the area chart
//         width: 2,
//     },
//     markers: {
//         show: false, // Disable markers
//         size: 0, // Set size to 0 to remove the dots
//     },
//     colors: [comparisionText.includes('-') ? "#E2362F" : '#50B69A'], // Line color
//     tooltip: {
//         enabled: false, // Disable tooltips
//         theme: 'light',
//     },
//     dataLabels: {
//         enabled: false, // Hides the data points on the chart
//     },
//     plotOptions: {
//         area: {
//             dataLabels: { enabled: false }, // Ensure data point labels are hidden
//         },
//     },
//     legend: {
//         show: false, // Hide the legend
//     },
// }
// }
// series={[ 
//     {
//         name: heading+'CO₂ Emissions',
//         data
//     },
// ]}
// const options = {
//     chart: {
//         type: 'area',
//         toolbar: { show: false },
//     },
//     xaxis: {
//         labels: {
//             enabled: true, 
//             style: {
//                 colors: '#333', // Color of the labels
//                 fontSize: '9px', // Font size
//                 fontFamily: 'Arial, sans-serif', // Font family
//                 fontWeight: 'medium', 
//                 // marginRight:'5px'
//                 // Font weight
//             },
//             offsetX: 10,
//         },
//         tickPlacement: 'on',
//         tickAmount: 12,
//         categories:categories
//     },
//     fill: {
//         type: 'gradient', // Use gradient fill
//         gradient: {
//             shade: 'light', // Light shade for the gradient
//             type: 'vertical', // Vertical gradient (top to bottom)
//             shadeIntensity: 0.5, // Gradient intensity
//             gradientToColors: ['#50B69A'], // Gradient color at the bottom
//             inverseColors: false, // No inverse gradient colors
//             opacityFrom: 0.6, // Opacity at the top
//             opacityTo: 0, // Opacity at the bottom
//             stops: [0, 100], // Gradient stops (start from 0% to 100%)
//         },
//     },
//     yaxis: {
//         labels: {
//             show: true,
//             enabled:true
//             // formatter: (value) => `${value/1000 }k`, // Format values as '0k', '1k', etc.
//         },
//     },
//     grid: {
//         borderColor: '#e0e0e0', // Light grey color for the grid
//         strokeDashArray: 8, // Dashed lines
//     },
//     dataLabels: {
//         enabled: false, // Hides the data points on the chart
//     },
//     tooltip: {
//         x: {
//             show: true,
//             enabled: true, // Display x-axis value without formatting
//              // Display x-axis value without formatting
//         },
//     },
//     colors: ['#34a853'], // Customize the color of the area
//     stroke: {
//         curve: 'smooth', // Smooth curve for the chart
//     },
// };
//   return (
//     <Chart
//       options={options}
//       series={[
//         { name: 'Emissions Over Time', data:data }]}
//       type="area"
//       height={480}
//     />
//   );
// }

// export default memo(EmissionsOverTime);
// {
//     chart: {
//     //   id: 'area-chart',
//       type: 'area',
//       toolbar: { show: false },
//     },
//     grid: {
//         show: false, // No horizontal lines in the background
//     },
//     fill: {
//         type: 'gradient',
//         gradient: {
//           shade: 'light',
//           gradientToColors: ['#50B69A'],
//           opacityFrom: 0.6,
//           opacityTo: 0,
//         },
//       },
//     xaxis: {
//         labels: { show: true,enabled: true,  }, // Hide x-axis labels

//         categories: categories, // X-axis labels
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 2,
//       colors: ['#50B69A'], // Line color
//     },

//     // dataLabels: { enabled: false },
//     // legend: { show: false },
//     // tooltip: { enabled: true }, // Enable tooltips for better UX
//     // grid: { show: false },
//     colors: ['#50B69A'],
//   }