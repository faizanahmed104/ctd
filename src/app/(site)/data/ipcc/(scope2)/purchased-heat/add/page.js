import React from "react";
import HomeLayout from "../../../../../../Layouts/MainLayout";
import AddPurchasedHeat from "../../../../../../Containers/Data/(scope2)/purchased-heat/add-purchased-heat";

const page = () => {
  return (
    <HomeLayout headerTitle={"Update Data"}>
      <AddPurchasedHeat headerTitle={"Update Data"} />
    </HomeLayout>
  );
};

export default page;
