"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaCarAlt } from "react-icons/fa";
import { FaFireFlameCurved } from "react-icons/fa6";
import DataMapper from "./DataMapper";
import { useAuth } from "../../../../Context";

function Scopes() {
  const router = useRouter();
  const { setActiveHeader } = useAuth();

  const listItems = [
    {
      title: "Scope 1",
      data: [
        {
          icon: <FaFireFlameCurved color="#50B69A" className="w-6 h-6" />,
          heading: "Stationary Combustion",
          headingIcon: null,
          func: () => {
            setActiveHeader(2);
            router.push("/data/defra/stationary-combustion");
          },
        },
        {
          icon: <FaCarAlt color="#50B69A" className="w-6 h-6" />,
          heading: "Mobile Combustion",
          headingIcon: null,
          func: () => {
            setActiveHeader(2);
            router.push("/data/defra/mobile-combustion");
          },
        },
        {
          icon: (
            <img src="/ball-pile 2.png" className="w-6 h-6 object-contain" />
          ),
          heading: "Fugitive Emissions",
          headingIcon: null,
          func: () => {
            setActiveHeader(2);
            router.push("/data/defra/fugitive-emissions");
          },
        },
      ],
    },
    {
      title: "Scope 2",
      data: [
        {
          icon: (
            <img
              src="/charging-station.png"
              className="w-6 h-6 object-contain"
            />
          ),
          heading: "Purchased Electricity",
          headingIcon: null,
          func: () => {
            setActiveHeader(2);
            router.push("/data/defra/purchased-electricity");
          },
        },
        {
          icon: <img src="/heat.png" className="w-6 h-6 object-contain" />,
          heading: "Purchased Heat",
          headingIcon: null,
          func: () => {
            setActiveHeader(2);
            router.push("/data/defra/purchased-heat");
          },
        },
      ],
    },
    {
      title: "Scope 3",
      data: [
        {
          icon: <img src="/headset.png" className="w-6 h-6 object-contain" />,
          heading: "Purchased Goods & Services",
          headingIcon: null,
          func: () => navigateTo("Purchased Goods & Services"),
        },
        {
          icon: <img src="/boxes.png" className="w-6 h-6 object-contain" />,
          heading: "Use Of Sold Products",
          headingIcon: null,
          func: () => navigateTo("Use Of Sold Products"),
        },
        {
          icon: <img src="/treatment.png" className="w-6 h-6 object-contain" />,
          heading: "End Of Life Treatment of So...",
          headingIcon: null,
          func: () => navigateTo("End Of Life Treatment of So..."),
        },

        {
          icon: (
            <img
              src="/display-chart-up.png"
              className="w-6 h-6 object-contain"
            />
          ),
          heading: "Upstream Leased Assets",
          headingIcon: null,
          func: () => navigateTo("Upstream Leased Assets"),
        },
        {
          icon: (
            <img
              src="/display-chart-down.png"
              className="w-6 h-6 object-contain"
            />
          ),
          heading: "Downstream Leased Assets",
          headingIcon: null,
          func: () => navigateTo("Downstream Leased Assets"),
        },
        {
          icon: <img src="/shop.png" className="w-6 h-6 object-contain" />,
          heading: "Franchises",
          headingIcon: null,
          func: () => navigateTo("Franchises"),
        },
        {
          icon: (
            <img
              src="/government-budget.png"
              className="w-6 h-6 object-contain"
            />
          ),
          heading: "Investments",
          headingIcon: null,
          func: () => navigateTo("Investments"),
        },
        {
          icon: (
            <img
              src="/government-budget.png"
              className="w-6 h-6 object-contain"
            />
          ),
          heading: "Capital Goods",
          headingIcon: null,
          func: () => navigateTo("Capital Goods"),
        },
        {
          icon: <img src="/gas-pump.png" className="w-6 h-6 object-contain" />,
          heading: "Fuel & Energy Related Activities",
          headingIcon: null,
          func: () => navigateTo("Fuel & Energy Related Activities"),
        },
        {
          icon: (
            <img
              src="/display-chart-up.png"
              className="w-6 h-6 object-contain"
            />
          ),
          heading: "Upstream Transportation",
          headingIcon: null,
          func: () => navigateTo("Upstream Transportation"),
        },
        {
          icon: (
            <img
              src="/display-chart-down.png"
              className="w-6 h-6 object-contain"
            />
          ),
          heading: "Downstream Transportation",
          headingIcon: null,
          func: () => navigateTo("Downstream Transportation"),
        },
        {
          icon: (
            <img
              src="/plane-departure.png"
              className="w-6 h-6 object-contain"
            />
          ),
          heading: "Business Travel",
          headingIcon: null,
          func: () => navigateTo("Business Travel"),
        },
        {
          icon: (
            <img
              src="/employees-woman-man.png"
              className="w-6 h-6 object-contain"
            />
          ),
          heading: "Employee Commute",
          headingIcon: null,
          func: () => navigateTo("Employee Commute"),
        },
        {
          icon: <img src="/trash-bag.png" className="w-6 h-6 object-contain" />,
          heading: "Waste Generated",
          headingIcon: null,
          func: () => navigateTo("Waste Generated"),
        },
      ],
    },
  ];

  const navigateTo = (title) => {
    router.push("/data/update-data");
  };

  return (
    <>
      {listItems?.map((item) => (
        <DataMapper key={item?.title} title={item?.title} data={item?.data} />
      ))}
    </>
  );
}

export default Scopes;
