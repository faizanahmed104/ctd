import React from 'react'
import LearnContainer from '../../Containers/Learn'
import HomeLayout from '../../Layouts/MainLayout'
function Learn() {
  return (
    <HomeLayout headerTitle={"Let’s Upskill"}>
      <LearnContainer />
    </HomeLayout>
  )
}

export default Learn