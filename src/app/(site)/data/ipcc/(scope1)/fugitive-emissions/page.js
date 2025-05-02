import React from "react";
import HomeLayout from "../../../../../Layouts/MainLayout";
import FugitiveEmission from "../../../../../Containers/Data/(scope1)/fugitive-emissions";

const page = () => {
  return (
    <HomeLayout headerTitle={"Fugitive Emissions"}>
      <FugitiveEmission category={"fugitive-emissions"} />
    </HomeLayout>
  );
};

export default page;
