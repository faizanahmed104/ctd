import React from "react";
import HomeLayout from "../../Layouts/MainLayout";
import RolesTable from "../../Containers/Roles/RoleTable";

const page = () => {
  return (
    <HomeLayout headerTitle={"Roles"}>
      <RolesTable />
    </HomeLayout>
  );
};

export default page;
