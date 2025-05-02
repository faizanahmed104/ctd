"use client"
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { endpoints, apiUrl } from '../../../Helpers/Endpoints';
// import { ColorRing, LineWave } from 'react-loader-spinner';
// import { PropagateLoader } from 'react-spinners';
import Loader from '../../../Components/Loader';
const Evolution = () => {

    const [selectedOption, setSelectedOption] = useState('Month');
    const [startDate, setStartDate] = useState('2022-01')
    const [endDate, setEndDate] = useState('2024-01')
    const [loading, setLoading] = useState(false)
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const [series, setSeries] = useState([
        { x: '2024', y: 0 },
        { x: '2024', y: 1000 },
        { x: '2024', y: 2000 },
        { x: '2024', y: 1500 },
        { x: '2024', y: 2500 },
    ]);
    const options = {
        chart: {
            type: 'area',
            toolbar: { show: false },
        },
        xaxis: {
            labels: {
                enabled: true,
                style: {
                    colors: '#333', // Color of the labels
                    fontSize: '9px', // Font size
                    fontFamily: 'Arial, sans-serif', // Font family
                    fontWeight: 'medium',
                    // marginRight:'5px'
                    // Font weight
                },
                offsetX: 10,
            },
            tickPlacement: 'on',
            tickAmount: 12,
        },
        fill: {
            type: 'gradient', // Use gradient fill
            gradient: {
                shade: 'light', // Light shade for the gradient
                type: 'vertical', // Vertical gradient (top to bottom)
                shadeIntensity: 0.5, // Gradient intensity
                gradientToColors: ['#50B69A'], // Gradient color at the bottom
                inverseColors: false, // No inverse gradient colors
                opacityFrom: 0.6, // Opacity at the top
                opacityTo: 0, // Opacity at the bottom
                stops: [0, 100], // Gradient stops (start from 0% to 100%)
            },
        },
        yaxis: {
            labels: {
                formatter: (value) => `${value / 1000}k`, // Format values as '0k', '1k', etc.
            },
        },
        grid: {
            borderColor: '#e0e0e0', // Light grey color for the grid
            strokeDashArray: 8, // Dashed lines
        },
        dataLabels: {
            enabled: false, // Hides the data points on the chart
        },
        tooltip: {
            x: {
                show: true, // Display x-axis value without formatting
            },
        },
        colors: ['#34a853'], // Customize the color of the area
        stroke: {
            curve: 'smooth', // Smooth curve for the chart
        },
    };
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(apiUrl + endpoints.carbonTrackEvolution(startDate, endDate, selectedOption));
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            // if()
            let dt = []
            if (selectedOption === 'Month') {
                data.map((item) => {
                    // console.log('iutem',item)
                    dt.push({
                        x: item?.Month.slice(0, 3) + "-" + item?.year,
                        y: item?.totalEmission
                    })
                })
            }
            else if (selectedOption === 'Year') {
                data.map((item) => {
                    console.log('iutem', item)
                    dt.push({
                        x: item?.year,
                        y: item?.totalEmission
                    })
                })
            }
            else {
                data.map((item) => {
                    // console.log('iutem',item)
                    dt.push({
                        x: item?.quarter + "-" + item?.year,
                        y: item?.totalEmission
                    })
                })
            }
            setSeries(dt ?? [])

            // console.log('data',dt)
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
    return (
        <div
            className='flex-col flex justify-between w-full bg-white shadow rounded-lg px-4 container-lg:px-4 container-xl:px-6 pt-[30px] pb-7'
            style={{
                boxShadow: '0px 4px 20px 0px #0000001a',
            }}
        >

            <div className='flex flex-row items-center justify-between'>
                <div><span className='font-semibold text-2xl text-[#1D1D1D]'>
                    Evolution
                </span></div>
                <div className='flex flex-row items-center justify-between '>
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
                    <div className='w-32 ml-8'>
                        <select
                            id='selectOption'
                            value={selectedOption}
                            onChange={handleChange}
                            className='block w-full max-w-28 px-4 py-2 text-[#000000] bg-[#BAE2D7] border rounded-[10px] shadow-sm focus:outline-none text-sm font-normal'
                        >
                            <option value='Month'>
                                Month
                            </option>
                            <option value='Quarter'>Quarter</option>
                            <option value='Year'>Year</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='px-4 pt-4'>
                {loading ?
                    <Loader height='h-80' loading={loading} /> :
                    <Chart
                        options={options}
                        series={[{
                            name: "Evolution",
                            data: series
                        }]}
                        type='area'
                        height={320}
                    />}

            </div>
            <div className='text-center flex items-center justify-center pt-8'>
                <span className='text-[15px] font-semibold uppercase text-gray-500'>Emissions over time for your company</span>
            </div>
        </div>
    );
};

export default Evolution;
