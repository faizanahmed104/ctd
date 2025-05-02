import React from "react";
import HomeLayout from "../../../../../Layouts/MainLayout";
import StationaryCombustion from "../../../../../Containers/Data/defra/(scope1)/stationary-combustion";

const StationaryCombustionPage = () => {
  return (
    <HomeLayout headerTitle={"Stationary Combustion"}>
      <StationaryCombustion category={"stationary-combustion"} />
    </HomeLayout>
  );
};

export default StationaryCombustionPage;
