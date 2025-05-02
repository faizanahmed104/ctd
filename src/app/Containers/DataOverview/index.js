"use client"
import React, { useState } from 'react';
import AnalyticsCard from '../../Components/AnalyticsCard';
import AnalyticsRectangleCard from '../../Components/AnalyticsCard/AnalyticsRectangleCard';
import CustomDropDown from './CustomDropDown';
import ReactApexChart from 'react-apexcharts';
import ComperativeData from '../../Components/ComparitiveData';
import EmissionByDeft from './EmissionByDeft';
import BarChart from '../../Components/BarChart';
import { apiUrl, endpoints } from '../../Helpers/Endpoints';
import CompanyData from './CompanyData';
function DataOverview() {

    const [dashboardEmissions, setDashboardEmissions] = useState([
        {
            heading: 'Emissions (tCO₂e)',
            carbonEmission: '27,762',
            comparisionText: 'tCO₂e',
            data: [100, 110, 120, 130, 115, 140, 125],
        },
        {
            heading: 'Emissions per Employee',
            carbonEmission: '14',
            comparisionText: 'tCO₂e/employee',
            data: [100, 110, 90, 170, 115, 140, 125],
        },
        {
            heading: 'Emissions Per revenue',
            carbonEmission: '20',
            comparisionText: 'tCO₂e/revenue (M)',
            data: [100, 110, 120, 130, 115, 140, 125],
        },
        {
            heading: 'Number of Employee',
            carbonEmission: '2,030',
            comparisionText: '',
            data: [200, 170, , 130, 115, 70, 60],
        },
        {
            heading: 'Revenue (M)',
            carbonEmission: '1,354',
            comparisionText: '',
            data: [100, 110, 120, 130, 115, 140, 125],
        },
        {
            heading: 'Percentage of activity based data',
            carbonEmission: '91%',
            comparisionText: '',
            data: [200, 170, , 130, 115, 70, 60],
        },
    ]);
    const [analyticsRectangleList, setAanalyticsRectangleList] = useState([
        {
            heading: 'Scope 1',
            carbonEmission: '27,762',
            comparisionText: 'tCO₂e',
            data: [100, 110, 120, 130, 115, 140, 125],
        },
        {
            heading: 'Scope 2',
            carbonEmission: '14',
            comparisionText: 'tCO₂e/employee',
            data: [100, 110, 90, 170, 115, 140, 125],
        },
        {
            heading: 'Scope 3',
            carbonEmission: '20',
            comparisionText: 'tCO₂e/revenue (M)',
            data: [100, 110, 120, 130, 115, 140, 125],
        },
    ]);
    const [activeTab, setActiveTab] = useState(0); // State to track the active tab

    const tabs = [
        {
            id: 0,
            label: 'Company Data',
            content: <CompanyData />,
        },
        { id: 1, label: 'Comparative Data', content: <ComperativeData /> },
    ];
    React.useEffect(() => {
        getTotalEmissions()
        getScopesData()
    }, [])
    const getTotalEmissions = async () => {
        try {
            const resp = await fetch(apiUrl + endpoints.analyticsTotalEmissions);
            const data = await resp.json();
            // console.log(data); // Access the JSON response here
            let dEmissions = dashboardEmissions.map(item => ({ ...item }));
            dEmissions[0].data = data?.emissionsOverTime.map((item) => item?.emissionValue);
            dEmissions[0].carbonEmission = data?.grandTotalEmissions
            setDashboardEmissions(dEmissions)
            // Use data as needed
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const getScopesData = async () => {
        try {
            const resp = await fetch(apiUrl + endpoints.analyticsScope);
            const data = await resp.json();
            // console.log(data); // Access the JSON response here
            let dEmissions = analyticsRectangleList.map(item => ({ ...item }));
            // console.log('dEmissions',dEmissions)
            dEmissions[0].data = data?.scope1?.items.map((item) => item['EmissionValue(mtCO2e)'])
            dEmissions[0].carbonEmission = data?.scope1?.total

            dEmissions[1].data = data?.scope2?.items.map((item) => item['EmissionValue(mtCO2e)'])
            dEmissions[1].carbonEmission = data?.scope2?.total

            dEmissions[2].data = data?.scope3?.items.map((item) => item['EmissionValue(mtCO2e)'])
            dEmissions[2].carbonEmission = data?.scope3?.total
            setAanalyticsRectangleList(dEmissions)
            // Use data as needed
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div>
            <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 mb-[30px]'>
                {dashboardEmissions.map((item, index) => (
                    <AnalyticsCard
                        key={index}
                        heading={item.heading}
                        data={item.data}
                        carbonEmission={item.carbonEmission}
                        comparisionText={item.comparisionText}
                    />
                ))}
            </div>
            <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 mb-[30px]'>
                {analyticsRectangleList.map((item, index) => (
                    <AnalyticsRectangleCard
                        key={index}
                        heading={item.heading}
                        data={item.data}
                        carbonEmission={item.carbonEmission}
                        comparisionText={item.comparisionText}
                    />
                ))}
            </div>
            <div className='w-full '>
                {/* Tabs Header */}
                <div className='flex border-b border-gray-200 px-2'>
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 font-medium text-sm sm:text-base transition-all duration-300 ease-in-out mr-10 ${activeTab === index
                                ? 'border-b-2 border-[#101010] text-[#101010] font-medium'
                                : 'text-[#707070] font-normal'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tabs Content */}
                <div className='mt-4 py-4 px-2 rounded'>
                    {tabs[activeTab].content}
                    <div className='flex justify-end items-end mt-8'>
                        <button
                            className='rounded-md items-center text-center w-80 h-14 text-white font-semibold text-2xl'
                            style={{ backgroundColor: '#50b69a' }}
                        >
                            Recommended Actions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DataOverview;
