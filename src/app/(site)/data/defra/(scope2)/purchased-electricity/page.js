import React from "react";
import HomeLayout from "../../../../../Layouts/MainLayout";
import PurchasedElectricity from "../../../../../Containers/Data/defra/(scope2)/purchased-electricity";

const page = () => {
  return (
    <HomeLayout headerTitle={"Purchased Electricity"}>
      <PurchasedElectricity category={"purchased-electricity"} />
    </HomeLayout>
  );
};

export default page;
