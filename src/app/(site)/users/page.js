import React from 'react'
import HomeLayout from '../../Layouts/MainLayout'
import UsersTable from '../../Containers/Users/UserTable'
const page = () => {
    return (
        <HomeLayout headerTitle={"Users"}>
            <UsersTable />
        </HomeLayout>
    )
}

export default page