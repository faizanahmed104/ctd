import React from 'react'
import DataOverviewContainer from '../../Containers/DataOverview'
import HomeLayout from '../../../app/Layouts/MainLayout'
function DataOverview() {
  return (
    <HomeLayout headerTitle={"Data Overview"}>
      <DataOverviewContainer />
    </HomeLayout>
  )
}

export default DataOverview