import React from 'react'
import DataOverviewContainer from '../../../Containers/Data/Overview'
import HomeLayout from '../../../Layouts/MainLayout'
function Overview() {
  return (
    <HomeLayout headerTitle={"Collect & Update Data"}>
      <DataOverviewContainer />
    </HomeLayout>
  )
}

export default Overview