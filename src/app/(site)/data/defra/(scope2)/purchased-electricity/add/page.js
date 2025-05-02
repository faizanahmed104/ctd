import React from "react";
import HomeLayout from "../../../../../../Layouts/MainLayout";
import AddPurchasedElectricity from "../../../../../../Containers/Data/defra/(scope2)/purchased-electricity/add-purchased-electricity";

const page = () => {
  return (
    <HomeLayout headerTitle={"Update Data"}>
      <AddPurchasedElectricity headerTitle={"Update Data"} />
    </HomeLayout>
  );
};

export default page;
