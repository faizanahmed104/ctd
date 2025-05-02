import React from 'react'
import GoodsAndServicesContainer from "../../../Containers/Data/GoodsAndServices"
import HomeLayout from '../../../Layouts/MainLayout'
const page = () => {
    return (
        <HomeLayout headerTitle={'Purchased Goods and Services'}>
            <GoodsAndServicesContainer />
        </HomeLayout>
    )
}

export default page