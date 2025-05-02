import React from "react";
import HomeLayout from "../../../Layouts/MainLayout";
import AddRoleForm from "../../../Containers/Roles/add/AddRoleForm";

const AddRole = () => {
  return (
    <HomeLayout headerTitle={"Roles"}>
      <AddRoleForm />
    </HomeLayout>
  );
};

export default AddRole;
