import React from "react";
import HomeLayout from "../../../../Layouts/MainLayout";
import EditRoleForm from "../../../../Containers/Roles/edit/EditRoleForm";

const EditRole = ({ params }) => {
  const { roleId } = params;

  return (
    <HomeLayout headerTitle={"Roles"}>
      <EditRoleForm roleId={roleId} />
    </HomeLayout>
  );
};

export default EditRole;
