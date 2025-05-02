import React from 'react';
import ApexCharts from 'react-apexcharts';
import { formatNumber } from '../../../Utils/formatNumber';

const AnalyticsRectangleCard = ({ heading, carbonEmission, comparisionText, data = [100, 110, 120, 130, 115, 140, 125] }) => {

    return (
        <div className='max-w-full bg-white shadow rounded-lg  pl-[18px] pr-1 pt-2'
            style={{ boxShadow: "0px 4px 20px 0px #0000001a" }}
        ><div>

                <div className='flex items-center justify-between'>

                    <div className='flex flex-col items-start'>
                        <span className='text-[32px] font-semibold uppercase text-black mb-[14px] font-poppins'>
                            {heading}
                        </span>
                        <span className='text-[12px] font-semibold text-neutral-600 mb-[9px] font-poppins'>Emissions (tCO₂e)</span>
                        <span className='text-[22px] font-bold text-[#0b0905] font-poppins'>
                            {formatNumber(carbonEmission)}
                        </span>
                        <div className='mt-1 flex items-center mb-2'>
                            <p className='text-gray-500 text-[10px] font-poppins'>tc02e</p>
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
                                xaxis: {
                                    labels: { show: false }, // Hide x-axis labels
                                    axisBorder: { show: false }, // Hide the x-axis line
                                    axisTicks: { show: false }, // Hide ticks on the x-axis
                                    tickPlacement: 'off',
                                },
                                yaxis: {
                                    labels: { show: false }, // Hide y-axis labels
                                    axisBorder: { show: false }, // Hide the y-axis line
                                },
                                stroke: {
                                    curve: 'smooth', // Smooth curve for the area chart
                                    width: 2,
                                },
                                markers: {
                                    show: false, // Disable markers
                                    size: 0, // Set size to 0 to remove the dots
                                },
                                colors: [comparisionText.includes('-') ? "#E2362F" : '#50B69A'], // Line color
                                tooltip: {
                                    enabled: false, // Disable tooltips
                                    theme: 'light',
                                },
                                dataLabels: {
                                    enabled: false, // Hides the data points on the chart
                                },
                                plotOptions: {
                                    area: {
                                        dataLabels: { enabled: false }, // Ensure data point labels are hidden
                                    },
                                },
                                legend: {
                                    show: false, // Hide the legend
                                },
                            }
                            }
                            series={[
                                {
                                    name: heading + 'CO₂ Emissions',
                                    data
                                },
                            ]}
                            type='area'
                            // height={200}
                            // width={"202px"}
                            // height={"116px"}
                            width="100%"  // Default width
                            height="116px" // Default height
                            className="
                            sm:w-[90%] sm:h-[150px]  // Small-medium screen
                            md:w-[80%] md:h-[180px]  // Medium screen
                            lg:w-[70%] lg:h-[200px]  // Large screen
                            xl:w-[60%] xl:h-[200px] 
                            2xl:w-[65%] 2xl:h-[200px]  // Extra-large screen
                        "
                        />
                    </div>
                </div></div>
        </div>
    );
};

export default AnalyticsRectangleCard;
