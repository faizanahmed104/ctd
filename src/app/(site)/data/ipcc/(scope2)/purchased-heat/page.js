import React from "react";
import HomeLayout from "../../../../../Layouts/MainLayout";
import PurchasedHeat from "../../../../../Containers/Data/(scope2)/purchased-heat";

const page = () => {
  return (
    <HomeLayout headerTitle={"Purchased Heat"}>
      <PurchasedHeat category={"purchased-heat"} />
    </HomeLayout>
  );
};

export default page;
