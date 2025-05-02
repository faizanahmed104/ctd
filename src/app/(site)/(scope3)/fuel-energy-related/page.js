import React from 'react'
import GoodsAndServicesContainer from "../../../Containers/Data/GoodsAndServices"
import HomeLayout from '../../../Layouts/MainLayout'
const page = () => {
    return (
        <HomeLayout headerTitle={"Fuel Energy Related"}>
            <GoodsAndServicesContainer />
        </HomeLayout>
    )
}

export default page