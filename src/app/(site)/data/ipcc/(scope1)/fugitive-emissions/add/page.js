import React from "react";
import HomeLayout from "../../../../../../Layouts/MainLayout";
import AddFugitiveEmission from "../../../../../../Containers/Data/(scope1)/fugitive-emissions/add-fugitive-emission";

const page = () => {
  return (
    <HomeLayout headerTitle={"Update Data"}>
      <AddFugitiveEmission headerTitle={"Update Data"} />
    </HomeLayout>
  );
};

export default page;
