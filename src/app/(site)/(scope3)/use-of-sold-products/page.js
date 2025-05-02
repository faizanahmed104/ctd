import React from 'react'
import GoodsAndServicesContainer from "../../../Containers/Data/GoodsAndServices"
import HomeLayout from '../../../Layouts/MainLayout'
const page = () => {
    return (
        <HomeLayout headerTitle={'Use Of Sold Products'}>
            <GoodsAndServicesContainer />
        </HomeLayout>
    )
}

export default page