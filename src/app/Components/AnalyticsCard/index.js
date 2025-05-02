import React from 'react';
import ApexCharts from 'react-apexcharts';
import { formatNumber } from '../../Utils/formatNumber';

const AnalyticsCard = ({ heading, carbonEmission, comparisionText, data = [100, 110, 120, 130, 115, 140, 125] }) => {
    // options={{
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
    console.log('data--', data)
    return (
        <div className='max-w-full bg-white shadow rounded-lg  pl-3 pr-1 pt-6'
            style={{ boxShadow: "0px 4px 20px 0px #0000001a" }}
        ><div>
                <span className='text-[15px] font-semibold uppercase text-gray-500 font-poppins'>
                    {heading}
                </span>
                <div className='flex items-center justify-between font-poppins'>

                    <div className='flex flex-col items-start'>

                        <h2 className='text-[34px] mb-1 font-bold text-[#0b0905] font-poppins'>
                            {formatNumber(carbonEmission)}
                        </h2>
                        <div className='mt-2 flex items-center space-x-4'>
                            <p className='text-gray-500 text-sm font-poppins'>{comparisionText}</p>
                        </div>
                    </div>

                    {/* Right Content (Chart) */}
                    <div >
                        <ApexCharts
                            options={{
                                chart: {
                                    type: 'area', // Using area chart instead of line chart
                                    toolbar: { show: false },
                                },
                                grid: {
                                    show: false, // No horizontal lines in the background
                                },
                                fill: {
                                    type: 'gradient', // Use gradient fill
                                    gradient: {
                                        shade: 'light', // Light shade for the gradient
                                        type: 'vertical', // Vertical gradient (top to bottom)
                                        shadeIntensity: 0.5, // Gradient intensity
                                        gradientToColors: [comparisionText.includes('-') ? "#E2362F" : '#50B69A'], // Gradient color at the bottom
                                        inverseColors: false, // No inverse gradient colors
                                        opacityFrom: 0.6, // Opacity at the top
                                        opacityTo: 0, // Opacity at the bottom
                                        stops: [0, 100], // Gradient stops (start from 0% to 100%)
                                    },
                                },

                                dataLabels: {
                                    enabled: false,
                                },
                                xaxis: {
                                    // categories: ['Q1','Q2','Q3','Q4'], // Sample categories
                                    labels: { show: false }, // Hide x-axis labels
                                    axisTicks: {
                                        show: false,
                                    },
                                    axisBorder: {
                                        show: false, // Hides the x-axis border
                                    },
                                },
                                yaxis: {
                                    labels: { show: false }, // Hide y-axis labels
                                    axisBorder: { show: false }, // Hide the x-axis line
                                },
                                stroke: {
                                    curve: 'smooth', // Smooth curve for the area chart
                                    width: 2,
                                },

                                colors: [comparisionText.includes('-') ? "#E2362F" : '#50B69A'], // Line color
                                tooltip: {
                                    enabled: false,
                                    theme: 'light',
                                },
                                plotOptions: {
                                    area: {
                                        dataLabels: { enabled: false, show: false }, // Hide data point labels
                                    },
                                },
                            }}
                            series={[
                                {
                                    name: 'Total CO₂ Emissions',
                                    data
                                },
                            ]}
                            type='area'
                            // height={200}
                            // width={"122px"}
                            // height={"70px"}
                            width="100%"  // Default width
                            height="80px" // Default height
                            className="
                            sm:w-[90%] sm:h-[150px]  // Small-medium screen
                            md:w-[60%] md:h-[180px]  // Medium screen
                            lg:w-[55%] lg:h-[80px]  // Large screen
                            xl:w-[50%] xl:h-[70px] 
                            2xl:w-[50%] 2xl:h-[70px]  // Extra-large screen
                        "
                        />
                    </div>
                </div></div>
        </div>
    );
};

export default AnalyticsCard;
