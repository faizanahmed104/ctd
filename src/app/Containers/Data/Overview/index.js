"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HorizontalCard from "./HorizontalCard";
import { TABS } from "./constant";
import Tabs from "../../../Components/tabs";

function Overview() {
  const router = useRouter();

  const navigateTo = (title) => {
    router.push("/data/update-data");
  };

  return (
    <div>
      <span className="text-xl font-medium text-black pt-6">
        Data is the raw material of your emissions calculations - the better
        quality it has and the more complete it is, the better your emissions
        estimations will be. The better your emissions estimations, the more
        targeted your decarbonisation actions can be.
      </span>
      <div className="my-[74px]">
        <HorizontalCard
          icon={
            <img src="/organization.png" className="w-6 h-6 object-contain" />
          }
          heading="Organisational Data"
          headingIcon="/comment-info.png"
          func={() => navigateTo("Organisational Data")}
        />
      </div>
      <div className="my-[74px] text-center">
        <Tabs tabs={TABS} pills={true} loading={true} />
      </div>
      {/* <div className="flex items-end justify-end mt-[10px]">
        <button className="h-[52px] w-[264px] items-center justify-center flex rounded-md bg-[#50b69a] cursor-pointer">
          <span className="font-semibold font-poppins text-xl text-white">
            Measure & Report
          </span>
        </button>
      </div> */}
    </div>
  );
}

export default Overview;
