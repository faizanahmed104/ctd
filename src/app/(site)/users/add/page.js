import React from 'react'
import AddUserForm from '../../../Containers/Users/add/AddUserForm'
import HomeLayout from '../../../Layouts/MainLayout'
const AddUser = () => {
    return (
        <HomeLayout headerTitle={"Users"}>
            <AddUserForm />
        </HomeLayout>
    )
}

export default AddUser