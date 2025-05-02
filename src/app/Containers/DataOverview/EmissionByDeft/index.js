"use client"
import React, { useEffect, useState } from 'react';
import EmissionPiChart from '../../../Components/EmissionsPiChart';
// import {
//     filteredByInterval,
//     getCategoriesAndSeriesByScope,
// } from '@/utils/barChartsverticalV2';
// import { filteredByInterval, getCategoriesAndSeriesByScope } from '../../../Utils';
const data = [
    { title: 'C-Suite' },
    { title: 'Marketing' },
    { title: 'Logistics' },
    { title: 'HR' },
    { title: 'Product' },
    { title: 'Manufacturing' },
    { title: 'IT' },
    { title: 'Sales' },
];

const scopes = [
    { name: '', alignment: 'flex' },
    // { name: "Scope 2", alignment: "flex justify-end" },
    // { name: "Scope 3", alignment: "flex" },
];

const EmissionByDeft = (props) => {
    const { scope, time } = props;

    const [itemData, setItemData] = useState({
        category: [],
        series: [],
    });

    // useEffect(() => {
    //     const chartData = filteredByInterval(time);
    //     setItemData({
    //         category: chartData.categories,
    //         series: chartData.series,
    //     });
    // }, [time]);

    // useEffect(() => {
    //     const chartData = getCategoriesAndSeriesByScope(scope);
    //     setItemData({
    //         category: chartData.categories,
    //         series: chartData.seriesData,
    //     });
    // }, [scope]);

    return (
        <div className='grid grid-cols-4 gap-4'>
            {data.map((item, index) => (
                <div className='mb-5' key={item.title}>
                    <span className='text-[#2E4C32] text-lg font-bold'>
                        {item.title}
                    </span>
                    <div className='shadow-xl rounded-xl p-4'>
                        <div
                        >

                            <EmissionPiChart
                            // data={itemData}
                            // scope={scope}
                            // time={time}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmissionByDeft;
