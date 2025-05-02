"use client";

import React from "react";
import Action from "../../Containers/Action";
import HomeLayout from "../../Layouts/MainLayout";

const ActionPage = () => {
  return (
    <HomeLayout headerTitle={"Actions"}>
      <Action />
    </HomeLayout>
  );
};

export default ActionPage;
