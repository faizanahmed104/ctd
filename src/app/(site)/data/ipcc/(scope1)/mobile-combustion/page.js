import React from "react";
import HomeLayout from "../../../../../Layouts/MainLayout";
import MobileCombustion from "../../../../../Containers/Data/(scope1)/mobile-combustion";

const MobileCombustionPage = () => {
  return (
    <HomeLayout headerTitle={"Mobile Combustion"}>
      <MobileCombustion category={"mobile-combustion"} />
    </HomeLayout>
  );
};

export default MobileCombustionPage;
