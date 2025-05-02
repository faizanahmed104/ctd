import React from 'react';
import ReactApexChart from 'react-apexcharts';

const EmissionsPieChart = () => {
    const chartOptions = {
        chart: {
            type: 'pie',
        },
        colors: [
            'rgba(33, 73, 62, 1)',
            'rgba(48, 109, 93, 1)',
            'rgba(74, 164, 139, 1)',
            'rgba(66, 145, 123, 1)',
        ],
        labels: ['40%', '30%', '20%', '10%'],
        legend: {
            show: false, // No legend display
        },
        dataLabels: {
            enabled: false, // Disable percentage display in chart
        },
        stroke: {
            width: 0, // Removes the white border
        },
    };

    const chartData = [40, 30, 20, 10];

    return (
        <div className='flex flex-col max-w-md'>
            <div className='flex items-start'>
            <div className='flex flex-row items-start'>
                    <span className='font-medium text-sm font-poppins text-[#2E4C32] pt-5'>Scope 1</span>
                <ReactApexChart
                    options={chartOptions}
                    series={chartData}
                    type='pie'
                    height={100}
                    width={100}
                />
                </div>
            </div>

            <div className='flex flex-row items-end justify-end'>
            <div className='flex flex-row'>
                    <span className='font-medium text-sm font-poppins text-[#2E4C32] pt-5'>Scope 2</span>
                <ReactApexChart
                    options={chartOptions}
                    series={chartData}
                    type='pie'
                    height={100}
                    width={100}
                />
                </div>
            </div>

            <div className='flex items-start'>
            <div className='flex flex-row'>
                    <span className='font-medium text-sm font-poppins text-[#2E4C32] pt-5'>Scope 3</span>
                <ReactApexChart
                    options={chartOptions}
                    series={chartData}
                    type='pie'
                    height={100}
                    width={100}
                />
                </div>
            </div>
        </div>
    );
};

export default EmissionsPieChart;
