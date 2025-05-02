import React from "react";
import HomeLayout from "../../../../../../Layouts/MainLayout";
import AddStationaryCombustion from "../../../../../../Containers/Data/defra/(scope1)/stationary-combustion/add-stationary-combustion";

const AddStationaryCombustionPage = () => {
  return (
    <HomeLayout headerTitle={"Update Data"}>
      <AddStationaryCombustion headerTitle={"Update Data"} />
    </HomeLayout>
  );
};

export default AddStationaryCombustionPage;
