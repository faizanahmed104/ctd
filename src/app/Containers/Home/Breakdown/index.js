"use client"
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import './index.css';
import { apiUrl, endpoints } from '../../../Helpers/Endpoints';
import Loader from '../../../Components/Loader';
import { formatNumber } from '../../../Utils/formatNumber';
const colors = ['#42917b', '#00401a', '#306d5d', '#50b69a', '#C4C4C4']
function Breakdown() {
    const [startDate, setStartDate] = useState('2022-01')
    const [endDate, setEndDate] = useState('2024-01')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [allEmissions, setAllEmissions] = useState(0)
    const [selectedOption, setSelectedOption] = useState('Month');
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const options = {
        chart: {
            type: 'donut',
            toolbar: { show: false },
            events: {
                mounted: function (chartContext, config) {
                    const label = document.querySelector('#chart-id .apexcharts-datalabel-label');
                    if (label) {
                        label.setAttribute('id', 'breakDown-total');
                    }
                },
            },
        },
        colors,
        dataLabels: {
            enabled: false,
        },

        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    labels: {
                        id: 'breakDown-total',
                        show: true,
                        name: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Arial, sans-serif',
                            color: '#333',
                        },
                        value: {
                            show: true,
                            enabled: true,
                            label: `${formatNumber(allEmissions)} \ntCO₂e`,
                            fontSize: '1.65rem', // Larger font size for the center value
                            fontWeight: '600',  // Make it bold
                            fontFamily: 'Arial, sans-serif',
                            color: '#0b0905',
                            offsetY: "-10px",
                            style: {
                                whiteSpace: 'normal', // Ensure the label wraps if needed
                                wordBreak: 'break-word', // Break the word if needed
                                textAlign: 'center', // Center align the label text
                                lineHeight: '1.3', // Adjust line height to ensure proper spacing
                            },
                            formatter: () => `${formatNumber(allEmissions)}`,
                            value: () => `${formatNumber(allEmissions)}`,
                        },
                        total: {
                            show: true,  // Enable showing the value in the center
                            label: `${formatNumber(allEmissions)} \ntCO₂e`, // Display the dynamic value and units
                            fontSize: '0rem', // Larger font size for the center value
                            fontWeight: '600',  // Make it bold
                            fontFamily: 'Arial, sans-serif',
                            color: '#fff',

                            formatter: () => `${formatNumber(allEmissions)} \ntCO₂e`,
                            // style: {
                            //     whiteSpace: 'normal', // Ensure the label wraps if needed
                            //     wordBreak: 'break-word', // Allow word breaks if needed
                            //     textAlign: 'center', // Center align the text
                            //     lineHeight: '1.3', // Adjust the line height for better spacing
                            // },
                        },
                    },
                },
            },
        },
        legend: {
            position: 'bottom',
            show: false,
        },
        // events: {
        //     mounted: function (chartContext, config) {
        //         // Find the text element for the total label
        //         const totalLabel = document.querySelector('.apexcharts-datalabel-label');

        //         if (totalLabel) {
        //             // Apply additional SVG text styling
        //             totalLabel.setAttribute('text-anchor', 'middle'); // Center horizontally
        //             totalLabel.setAttribute('dominant-baseline', 'middle'); // Center vertically
        //             totalLabel.style.fontFamily = 'Arial, sans-serif';  // Set font family
        //             totalLabel.style.fontSize = '2.65rem';  // Set font size
        //             totalLabel.style.fontWeight = '600';  // Set font weight
        //             totalLabel.style.fill = '#0b0905';  // Set color (fill)
        //             totalLabel.style.whiteSpace = 'normal';  // Allow wrapping
        //             totalLabel.style.wordBreak = 'break-word'; // Ensure words break correctly
        //         }
        //     }}
    };


    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(apiUrl + endpoints.carbonTrackBreakDown(startDate, endDate, "Month"));
            if (!response.ok) throw new Error("Failed to fetch data");
            const jsonResponse = await response.json();
            if (jsonResponse.length >= 5) {
                let othersPercentage = 0, othersEmissions = 0, allEmi = 0;
                let dt = jsonResponse.slice(0, 4)
                jsonResponse.slice(4).map((item) => {
                    othersPercentage += parseFloat(item?.percentage || 0);
                    othersEmissions += parseFloat(item?.totalEmission || 0);
                    allEmi += parseFloat(item?.totalEmission || 0);
                })
                dt.map(itm => {
                    allEmi += parseFloat(itm?.totalEmission || 0);
                }

                )
                setData([...dt, {
                    category: "Others",
                    totalEmission: othersEmissions,
                    percentage: othersPercentage
                }])
                setAllEmissions(allEmi)
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false)

        }
    };
    React.useEffect(() => {
        fetchData()
    }, [startDate, endDate, selectedOption])
    // console.log('allEmissions',data?.map(item=>parseFloat(item?.percentage)))
    return (
        <div
            className='h-[503px] flex flex-col justify-between ml-0 xl:ml-[-25px] w-full mt-0 lg:mt-4 xl:mt-4 bg-white shadow rounded-lg px-4 container-lg:px-4 container-xl:px-4 container-2xl:px-4 container-3xl:px-6 pb-7 pt-[30px]'
            style={{
                boxShadow: '0px 4px 20px 0px #0000001a',
            }}
        >
            <div>
                <div className='flex flex-row items-center justify-between'>
                    <span className='font-semibold text-2xl text-[#1D1D1D]'>
                        Breakdown
                    </span>
                    <div className='flex items-center gap-2 container-2xl:gap-4'>
                        <input
                            type='month'
                            className='block w-full max-w-36 px-4 py-2 text-[#000000] bg-[#BAE2D7] border rounded-[10px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#86ccb8] text-sm font-normal'
                            placeholder="MM/YYYY"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className='text-[#000000] font-semibold'>to</span>
                        <input
                            type='month'
                            className='block w-full max-w-36 px-4 py-2 text-[#000000] bg-[#BAE2D7] border rounded-[10px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#86ccb8] text-sm font-normal'
                            placeholder="MM/YYYY"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex flex-row justify-evenly items-start mt-4'>
                    <div className='pt-5' id="chart-id">
                        {loading ? <Loader loading={loading} height='h-80' /> :
                            <Chart
                                options={options}
                                series={data?.map(item => parseFloat(item?.percentage))}
                                type='donut'
                                height={'auto'}
                            />}
                    </div>
                    <div className='flex flex-col mt-[15px] pl-2 container-md:pl-4 container-lg:pl-6 container-xl:pl-8 container-2xl:pl-20'>
                        <span className='text-[15px] font-semibold uppercase text-gray-500 mb-5'>Highest Emission Categories</span>
                        {data?.map((item, index) => <div className='flex flex-row items-center justify-between w-full mb-5 2xl:mb-4 overflow-hidden' key={index}>
                            <div className='flex flex-row items-center'>
                                <div
                                    className='w-5 h-5 rounded-[10px] mr-[10px]'
                                    style={{
                                        border: '5px solid #1b3838',
                                        backgroundColor: colors[index],
                                        boxSizing: 'border-box',
                                    }}
                                />
                                <span className='text-[0.75rem] 2xl:text-[0.938rem] font-semibold text-[#212121] break-words mr-1 container-2xl:mr-2'>
                                    {item?.category}
                                </span>
                            </div>
                            <span className='text-[0.75rem] 2xl:text-[0.938rem] font-semibold text-[#212121]'>
                                {parseFloat(item?.percentage).toFixed(2)}%
                            </span>
                        </div>)}
                        {/* <div className='flex flex-row items-center justify-between w-full mb-9'>
                        <div className='flex flex-row items-center'>
                            <div
                                className='w-5 h-5 rounded-[10px] mr-[10px]'
                                style={{
                                    border: '5px solid #1b3838',
                                    backgroundColor: '#00401a',
                                }}
                            />
                            <span className='text-[15px] font-semibold text-[#212121]'>
                                Mobile Combustion
                            </span>
                        </div>
                        <span className='text-[15px] font-semibold text-[#212121]'>
                            12%
                        </span>
                    </div>
                    <div className='flex flex-row items-center justify-between w-full mb-9'>
                        <div className='flex flex-row items-center'>
                            <div
                                className='w-5 h-5 rounded-[10px] mr-[10px]'
                                style={{
                                    border: '5px solid #1b3838',
                                    backgroundColor: '#306d5d',
                                }}
                            />
                            <span className='text-[15px] font-semibold text-[#212121]'>
                                Fugitive Emissions
                            </span>
                        </div>
                        <span className='text-[15px] font-semibold text-[#212121]'>
                            24%
                        </span>
                    </div>
                    <div className='flex flex-row items-center justify-between w-full mb-9'>
                        <div className='flex flex-row items-center'>
                            <div
                                className='w-5 h-5 rounded-[10px] mr-[10px]'
                                style={{
                                    border: '5px solid #1b3838',
                                    backgroundColor: '#50b69a',
                                }}
                            />
                            <span className='text-[15px] font-semibold text-[#212121]'>
                                Purchased Electricity
                            </span>
                        </div>
                        <span className='text-[15px] font-semibold text-[#212121]'>
                            30%
                        </span>
                    </div>
                    <div className='flex flex-row items-center justify-between w-full mb-9'>
                        <div className='flex flex-row items-center'>
                            <div
                                className='w-5 h-5 rounded-[10px] mr-[10px]'
                                style={{
                                    border: '5px solid #1b3838',
                                    backgroundColor: '#86ccb8',
                                }}
                            />
                            <span className='text-[15px] font-semibold text-[#212121]'>
                                Purchased Heat/Cooling
                            </span>
                        </div>
                        <span className='text-[15px] font-semibold text-[#212121]'>
                            22%
                        </span>
                    </div> */}
                    </div>
                </div></div>
            <div className='text-center flex items-center justify-center mt-5'>
                <span className='text-[15px] font-semibold uppercase text-gray-500'>Percentage mix of your emissions</span>
            </div>
        </div>
    );
}

export default Breakdown;
