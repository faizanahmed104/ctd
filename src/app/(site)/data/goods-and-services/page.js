import React from 'react'
import GoodsAndServicesContainer from '../../../Containers/Data/GoodsAndServices'
import HomeLayout from '../../../Layouts/MainLayout'
function GoodsAndServices() {
  return (
    <HomeLayout headerTitle={'Goods and Services'}>
      <GoodsAndServicesContainer />
    </HomeLayout>
  )
}

export default GoodsAndServices