"use client"
import React from 'react';
import ApexCharts from 'react-apexcharts';
import { formatNumber } from '../../Utils/formatNumber';

const EmissionsCard = ({ heading, carbonEmission, comparisionText, comparisionItem, data = [100, 110, 120, 130, 115, 140, 125], isTECard = false, subHeading, labels = [] }) => {
    // const chartOptions = {
    //     chart: {
    //         type: 'area', // Using area chart instead of line chart
    //         height: 75,
    //         width:131,
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
    //             gradientToColors: [comparisionText.includes('-')?"#E2362F":'#50B69A'], // Gradient color at the bottom
    //             inverseColors: false, // No inverse gradient colors
    //             opacityFrom: 0.6, // Opacity at the top
    //             opacityTo: 0, // Opacity at the bottom
    //             stops: [0, 100], // Gradient stops (start from 0% to 100%)
    //         },
    //     },
    //     // series: [
    //     //     {
    //     //         name: 'CO₂ Emissions',
    //     //         data:[]
    //     //     },
    //     // ],
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     xaxis: {
    //         categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Sample categories
    //         labels: { show: false }, // Hide x-axis labels
    //         axisTicks: {
    //             show: false,
    //         },
    //         axisBorder: {
    //             show: false, // Hides the x-axis border
    //         },
    //     },
    //     yaxis: {
    //         labels: { show: false }, // Hide y-axis labels
    //         axisBorder: { show: false }, // Hide the x-axis line
    //     },
    //     stroke: {
    //         curve: 'smooth', // Smooth curve for the area chart
    //         width: 2,
    //     },
    //     markers: {
    //         size: 0, // Set size to 0 to remove the dots
    //     },
    //     colors: [comparisionText.includes('-')?"#E2362F":'#50B69A'], // Line color
    //     tooltip: {
    //         enabled: true,
    //         theme: 'light',
    //     },
    //     plotOptions: {
    //         area: {
    //             dataLabels: { enabled: false, show: false }, // Hide data point labels
    //         },
    //     },
    // };
    // console.log('data received'+heading, data); // Check if updated data is reaching the component

    return (
        <div className={`h-auto max-h-60 max-w-full bg-white shadow rounded-lg flex px-3 container-lg:px-4 container-xl:px-5 container-2xl:px-6 py-2 container-lg:py-4 container-xl:py-5 container-2xl:py-6 `}
            style={{ boxShadow: "0px 4px 20px 0px #0000001a" }}
        >
            {/* Left Content */}
            <div className='flex flex-col items-start justify-start h-auto'>
                <p className='text-[0.938rem] text font-semibold uppercase text-gray-500 mb-1 w-20'>
                    {heading}
                </p>
                {subHeading ? <span className={"text-[#2e4c32] text-sm font-medium"}>{subHeading}</span> : <span className='mb-5' />}
                <h2 className='text-[2rem] mb-1 font-bold text-[#0b0905]'>
                    {formatNumber(carbonEmission)} tCO₂e
                </h2>
                {!isTECard && <div className='mt-2 flex items-start space-x-4'>
                    <p className={`${comparisionText.includes('-') ? "text-[#E2362F]" : "text-[#2e4c32]"} text-sm font-medium`}>
                        {comparisionText}%{' '}
                    </p>
                    {!heading?.toLowerCase().includes('emp') && <p className='text-gray-500 text-sm'>versus {comparisionItem}</p>}
                </div>}
            </div>
            {/* Right Content (Chart) */}
            <div className='flex w-3/4 h-[300px] mx-auto overflow-hidden'>
                <ApexCharts
                    options={{
                        chart: {
                            type: 'area', // Using area chart instead of line chart
                            // height:'auto', //75,
                            // width:'auto',//131,
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
                            categories: labels, // Sample categories
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
                        markers: {
                            size: 0, // Set size to 0 to remove the dots
                        },
                        colors: [comparisionText.includes('-') ? "#E2362F" : '#50B69A'], // Line color
                        tooltip: {
                            enabled: true,
                            theme: 'light',
                        },
                        plotOptions: {
                            area: {
                                dataLabels: { enabled: false, show: false }, // Hide data point labels
                            },
                        },
                    }}
                    series={[{
                        name: heading,
                        data: data
                    }
                    ]}
                    type='area'
                // height={200}
                // width="100%"  // Default width
                // height="120px" // Default height
                // className="
                //     sm:w-[80%] sm:h-[150px]  // Small-medium screen
                //     md:w-[80%] md:h-[180px]  // Medium screen
                //     lg:w-[65%] lg:h-[150px]  // Large screen
                //     xl:w-[60%] xl:h-[250px] 
                //     2xl:w-[66%] 2xl:h-auto  scale-110// Extra-large screen
                // "
                />
            </div>
        </div>
    );
};

export default EmissionsCard;
