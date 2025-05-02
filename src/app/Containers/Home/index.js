"use client"
import React, { useState } from 'react';
import EmissionsCard from '../../Components/EmissionsCard';
import Evolution from './Evolution';
import Breakdown from './Breakdown';
import DecarbonizeNow from './DecarbonizeNow';
import { subYears, format, subMonths } from 'date-fns'
import { apiUrl, endpoints } from '../../Helpers/Endpoints';
import { useLayoutEffect } from 'react';
import { useAuth } from '../../Context';

function Home() {
    const { monthlyEmissions } = useAuth()
    // const [currentMonthData,setCurrentMonthData]=useState({
    //     totalEmissions:0,
    //     currentMonthEmissions:[]
    // })    
    // const [activeColor,setActiveColor]=useState('green')
    // const [tempData,setTempDat] =useState({
    //     activeColor
    // })
    const [dashboardEmissions, setDashboardEmissions] = useState([
        {
            heading: 'Monthly Emissions',
            subHeading: format(subMonths(new Date(), 1), 'MMM'),
            carbonEmission: 2,
            comparisionText: "+12",
            comparisionItem: format(subMonths(new Date(), 2), 'MMM'),
            data: [],
            labels: []
        },
        {
            heading: 'Annual Emissions',
            subHeading: format((new Date()), 'YYY'),
            carbonEmission: 4,
            comparisionText: "+10",
            comparisionItem: format(subYears(new Date(), 1), 'YYY'),
            data: [],
            labels: []
        },
        {
            heading: 'Total\nEmissions',
            subHeading: "2022-2024",
            carbonEmission: 521,
            comparisionText: "6",
            comparisionItem: '',
            data: [200, 170, 130, 115, 70, 60],
            labels: []
        },
        {
            heading: 'Emissions Per Emp',
            carbonEmission: 1.1,
            comparisionText: "+5",
            comparisionItem: '',
            data: [100, 110, 120, 130, 115, 140, 125],
            labels: []
        },

    ]);
    const getMonthEmissions = async () => {
        try {
            const resp = await fetch(apiUrl + endpoints.currentMonthEmissions)
            const respJson = await resp.json()
            // console.log('resp',resp)
            let dt = [...dashboardEmissions]
            dt[0].carbonEmission = respJson?.totalEmissions
            dt[0].data = respJson?.currentMonthEmissions?.map((item) => item['EmissionValue(mtCO2e)']);
            // let hike=
            dt[0].comparisionText = respJson?.hike
            setDashboardEmissions(dt)
            // console.log('dt',respJson?.currentMonthEmissions)
        }
        catch (err) {
            console.log(err)
        }
    }
    const getAnnualEmissions = async () => {
        try {
            const resp = await fetch(apiUrl + endpoints.annualEmissions)
            const respJson = await resp.json()
            // console.log('resp',resp)
            let dt = [...dashboardEmissions]
            //     currentYearEmissions,
            // currentYearData,
            // previousYearEmissions,
            // percentageChange,
            dt[1].carbonEmission = respJson?.currentYearEmissions
            dt[1].data = respJson?.currentYearData?.map((item) => item['EmissionValue(mtCO2e)'] || item?.totalEmission);
            dt[1].comparisionText = respJson?.percentageChange
            setDashboardEmissions(dt)
            // console.log('dt', respJson?.currentMonthEmissions)
        }
        catch (err) {
            console.log(err)
        }
    }
    const getTotalEmissions = async () => {
        try {
            const resp = await fetch(apiUrl + endpoints.totalEmissions)
            const respJson = await resp.json()
            // console.log('resp',resp)
            let dt = [...dashboardEmissions]
            //     currentYearEmissions,
            // currentYearData,
            // previousYearEmissions,
            // percentageChange,
            //  totalEmissions: 0, // Initialize total emissions
            // minYear: Infinity, // Initialize min year as Infinity
            // maxYear: -Infinity /
            dt[2].carbonEmission = respJson?.totalEmissions;
            dt[2].data = respJson?.emissions?.map((item) => item?.cumulativeEmissions);
            // dt[1].comparisionText=respJson?.percentageChange
            dt[2].subHeading = respJson?.minYear + "-" + respJson?.maxYear
            dt[2].labels = respJson?.emissions?.map((item) => item?.Year)
            setDashboardEmissions(dt)
            // console.log('dt',respJson?.currentMonthEmissions)
        }
        catch (err) {
            console.log(err)
        }
    }
    useLayoutEffect(() => {
        getMonthEmissions()
        getAnnualEmissions()
        getTotalEmissions()
    }, [])
    return (
        <div>
            <div className="p-8 min-h-screen">
                <div className="grid justify-evenly gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mb-[30px]">
                    {dashboardEmissions.map((item, index) => (
                        <EmissionsCard
                            key={index}
                            heading={index === 0 ? monthlyEmissions.heading : item.heading}
                            data={index === 0 ? monthlyEmissions.data : item.data}
                            carbonEmission={index === 0 ? monthlyEmissions.carbonEmission : item.carbonEmission}
                            comparisionItem={index === 0 ? monthlyEmissions.comparisionItem : item?.comparisionItem}
                            comparisionText={index === 0 ? monthlyEmissions.comparisionText : item.comparisionText}
                            isTECard={index === 0 ? monthlyEmissions.heading.includes('Total') : item?.heading.includes('Total')}
                            subHeading={index === 0 ? monthlyEmissions.subHeading : item?.subHeading}
                        />
                    ))}
                </div>
                <div className="flex items-center md:flex-col lg:flex-col xl:flex-col 2xl:flex-row justify-between w-full space-x-0 xl:space-x-0 2xl:space-x-8 mb-[30px]">
                    <Evolution />
                    <Breakdown />
                </div>
                <div className='flex flex-row justify-between w-full mb-5'>
                    <span className='font-semibold text-[22px] text-[#0B0905] font-poppins' >Decarbonize Now</span>
                    <span className='font-semibold text-base text-[#0B0905] font-poppins underline cursor-pointer'>My Score</span>
                </div>
                <DecarbonizeNow />
            </div>
        </div>
    );

}

export default Home;
