import React from 'react'
import AnalyticsOverviewContainer from '../../Containers/AnalyticsOverview'
import HomeLayout from '../../Layouts/MainLayout'
function AnalyticsOverview() {
  return (
    <HomeLayout headerTitle={'Measure & Report Emissions'}>
      <AnalyticsOverviewContainer />
    </HomeLayout>
  )
}

export default AnalyticsOverview