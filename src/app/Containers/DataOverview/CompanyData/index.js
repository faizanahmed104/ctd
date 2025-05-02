"use client"
import React, { useState } from 'react';
import CustomDropDown from '../CustomDropDown';
import ReactApexChart from 'react-apexcharts';
import EmissionByDeft from '../EmissionByDeft';
import BarChart from '../../../Components/BarChart';
import { apiUrl, endpoints } from '../../../Helpers/Endpoints';
import EmissionsOverTime from '../../../Components/EmissionsOverTime';

function CompanyData() {
    const [categories, setCategories] = useState(['2022', '2023', '2024']);

    const [series, setSeries] = useState([10, 20, 30, 40]);
    const [selectedOption, setSelectedOption] = useState('Year');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        getEmissionsOverTime(event.target.value);
    };
    React.useLayoutEffect(() => {
        getEmissionsOverTime();
    }, []);
    const getEmissionsOverTime = async (value = selectedOption) => {
        try {
            const data = await fetch(
                apiUrl + endpoints.analyticsEmissionOverTime(value)
            );
            const response = await data.json();
            const categoriesData = response?.map((item) => item?.type);
            const dt = response?.map((item) => item?.emissionValue);
            setCategories(categoriesData);
            setSeries(dt);
            // console.log('dt',dt)
            // console.log('response', response);
        } catch (ex) {
            console.log(
                'exception occured while fetching emissions over time- ',
                ex
            );
        }
    };


    return (
        <>
            <div className='flex w-full flex-row items-center justify-between bg-[#eaf6f3] py-2 pl-2 pr-[30px] rounded-[5px] mb-[18px]'>
                <span className='font-bold text-lg text-[#08120F]'>
                    Emissions by Category
                </span>
                <div className='flex flex-row items-center justify-between'>
                    <CustomDropDown
                        options={['All', 'Scope 1', 'Scope 2', 'Scope 3']}
                        placeholder='Breakdown'
                    />
                    <CustomDropDown options={['']} placeholder='Entity' />
                    <CustomDropDown options={['']} placeholder='Interval' />
                    <CustomDropDown options={['']} placeholder='Chart' />
                </div>
            </div>
            <div className='bg-[#ebeeeb] py-[18px] pl-[10px] rounded-[5px] flex flex-col items-start mb-[18px]'>
                <span className='text-xs font-semibold font-poppins text-[#3f3f3f]'>
                    Climate Categories
                </span>
                <span className='text-[10px] font-normal font-poppins text-[#696969]'>
                    Click on one category to zoom on the associated emission
                    sources. For more information on how to use this dashboard,
                    please <a href=''>visit this page</a>
                </span>
            </div>
            <div className=''>
                <span className='text-sm font-semibold font-poppins text-[#3F3F3F] mb-[10px]'>
                    Emissions by Category
                </span>
                <hr className='border-t border-[#CCCCCC] mt-1' />
            </div>
            <div>
                <BarChart />
            </div>
            <div className='flex w-full flex-row items-center justify-between bg-[#eaf6f3] py-2 pl-2 pr-[30px] rounded-[5px] mb-[18px]'>
                <span className='font-bold text-lg text-[#08120F]'>
                    Emissions Over Time
                </span>
                <div className='flex flex-row items-center justify-between'>
                    <CustomDropDown
                        options={['All', 'Scope 1', 'Scope 2', 'Scope 3']}
                        placeholder='Breakdown'
                    />
                    <CustomDropDown options={['']} placeholder='Entity' />
                    <CustomDropDown options={['']} placeholder='Interval' />
                    <CustomDropDown options={['']} placeholder='Chart' />
                </div>
            </div>
            <div className='flex flex-col  shadow-xl rounded-[40px] mb-12 p-12'>
                <div className='flex w-full flex-row items-center justify-between mb-12'>
                    <span className='font-bold text-lg text-[#08120F]'>
                        Emissions Over Time
                    </span>
                    <div className='w-24'>
                        <select
                            id='selectOption'
                            value={selectedOption}
                            onChange={handleChange}
                            className='block w-full px-4 py-2 text-[#000000] bg-[#BAE2D7] border rounded-[10px] shadow-sm focus:outline-none text-sm font-normal'
                        >
                            <option value='Month'>Month</option>
                            <option value='Quarter'>Quarter</option>
                            <option value='Year'>
                                Year
                            </option>
                        </select>
                    </div>
                </div>
                <EmissionsOverTime data={series} categories={categories} />
            </div>
            <div className='flex w-full flex-row items-center justify-between bg-[#eaf6f3] py-2 pl-2 pr-[30px] rounded-[5px] mb-[18px]'>
                <span className='font-bold text-lg text-[#08120F]'>
                    Emissions By Department
                </span>
                <div className='flex flex-row items-center justify-between'>
                    <CustomDropDown
                        options={['All', 'Scope 1', 'Scope 2', 'Scope 3']}
                        placeholder='Breakdown'
                    />
                    <CustomDropDown options={['']} placeholder='Entity' />
                    <CustomDropDown options={['']} placeholder='Interval' />
                    <CustomDropDown options={['']} placeholder='Chart' />
                </div>
            </div>
            <EmissionByDeft />
        </>
    );
}

export default CompanyData;
