export const menuItems = [
  {
    title: "Dashboard",
    icon: "/dash-icon.png",
    path: "/",
    isAdmin: true,
  },
  {
    title: "Data",
    icon: "/data-icon.png",
    path: "#",
    isAdmin: true,
    children: [
      {
        title: "Overview",
        path: "/data/overview",
        isAdmin: true,
      },
      {
        title: "Organization",
        path: "/data/organization",
        isAdmin: false,
      },
      {
        title: "IPCC",
        path: "#",
        icon: "/db.webp",
        isAdmin: true,
        children: [
          {
            title: "Scope 1",
            icon: "/data-icon.png",
            path: "#",
            isAdmin: true,
            children: [
              {
                title: "Stationary Combustion",
                path: "/data/ipcc/stationary-combustion",
                isAdmin: true,
              },
              {
                title: "Mobile Combustion",
                path: "/data/ipcc/mobile-combustion",
                isAdmin: true,
              },
              {
                title: "Fugitive Emissions",
                path: "/data/ipcc/fugitive-emissions",
                isAdmin: true,
              },
            ],
          },
          {
            title: "Scope 2",
            icon: "/data-icon.png",
            path: "#",
            isAdmin: true,
            children: [
              {
                title: "Purchased Electricity",
                path: "/data/ipcc/purchased-electricity",
                isAdmin: true,
              },
              {
                title: "Purchased Heat",
                path: "/data/ipcc/purchased-heat",
                isAdmin: true,
              },
            ],
          },
          {
            title: "Scope 3",
            icon: "/data-icon.png",
            path: "#",
            isAdmin: true,
            children: [
              {
                title: "Purchased Goods & Services",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Use Of Sold Products",
                path: "#",
                isAdmin: true,
              },
              {
                title: "End Of Life Treatment of So...",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Upstream Leased Assets",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Franchises",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Investments",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Capital Goods",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Fuel & Energy Related Activities",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Upstream Transportation",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Downstream Transportation",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Business Travel",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Waste Generated",
                path: "#",
                isAdmin: true,
              },
            ],
          },
        ],
      },
      {
        title: "DEFRA",
        icon: "/db.webp",
        path: "#",
        isAdmin: true,
        children: [
          {
            title: "Scope 1",
            icon: "/data-icon.png",
            path: "#",
            isAdmin: true,
            children: [
              {
                title: "Stationary Combustion",
                path: "/data/defra/stationary-combustion",
                isAdmin: true,
              },
              {
                title: "Mobile Combustion",
                path: "/data/defra/mobile-combustion",
                isAdmin: true,
              },
              {
                title: "Fugitive Emissions",
                path: "/data/defra/fugitive-emissions",
                isAdmin: true,
              },
            ],
          },
          {
            title: "Scope 2",
            icon: "/data-icon.png",
            path: "#",
            isAdmin: true,
            children: [
              {
                title: "Purchased Electricity",
                path: "/data/defra/purchased-electricity",
                isAdmin: true,
              },
              {
                title: "Purchased Heat",
                path: "/data/defra/purchased-heat",
                isAdmin: true,
              },
            ],
          },
          {
            title: "Scope 3",
            icon: "/data-icon.png",
            path: "#",
            isAdmin: true,
            children: [
              {
                title: "Purchased Goods & Services",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Use Of Sold Products",
                path: "#",
                isAdmin: true,
              },
              {
                title: "End Of Life Treatment of So...",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Upstream Leased Assets",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Franchises",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Investments",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Capital Goods",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Fuel & Energy Related Activities",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Upstream Transportation",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Downstream Transportation",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Business Travel",
                path: "#",
                isAdmin: true,
              },
              {
                title: "Waste Generated",
                path: "#",
                isAdmin: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Analytics",
    icon: "/analytics.png",
    path: "#",
    isAdmin: false,
    children: [
      {
        title: "Overview",
        path: "/analytics-overview",
        isAdmin: false,
      },
      {
        title: "Organization",
        path: "#",
        isAdmin: false,
      },
      {
        title: "DEFRA",
        path: "#",
        isAdmin: false,
        children: [
          {
            title: "Scope 1",
            path: "#",
            isAdmin: false,
            children: [
              {
                title: "Stationary Combustion",
                path: "/analytics/stationary-combustion",
                isAdmin: false,
              },
              {
                title: "Mobile Combustion",
                path: "/analytics/mobile-combustion",
                isAdmin: false,
              },
              {
                title: "Fugitive Emissions",
                path: "/analytics/fugitive-emissions",
                isAdmin: false,
              },
            ],
          },
          {
            title: "Scope 2",
            path: "#",
            isAdmin: false,
            children: [
              {
                title: "Purchased Electricity",
                path: "/analytics/purchased-electricity",
                isAdmin: false,
              },
              {
                title: "Purchased Heat/Cooling",
                path: "/analytics/purchased-heat-cooling",
                isAdmin: false,
              },
            ],
          },
          {
            title: "Scope 3",
            path: "#",
            isAdmin: false,
            children: [
              {
                title: "Purchased Goods & Services",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Use Of Sold Products",
                path: "#",
                isAdmin: false,
              },
              {
                title: "End Of Life Treatment of So...",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Upstream Leased Assets",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Franchises",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Investments",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Capital Goods",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Fuel & Energy Related Activities",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Upstream Transportation",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Downstream Transportation",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Business Travel",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Waste Generated",
                path: "#",
                isAdmin: false,
              },
            ],
          },
        ],
      },
      {
        title: "IPCC",
        path: "#",
        isAdmin: false,
        children: [
          {
            title: "Scope 1",
            icon: "/data-icon.png",
            path: "#",
            isAdmin: false,
            children: [
              {
                title: "Stationary Combustion",
                path: "/analytics/stationary-combustion",
                isAdmin: false,
              },
              {
                title: "Mobile Combustion",
                path: "/analytics/mobile-combustion",
                isAdmin: false,
              },
              {
                title: "Fugitive Emissions",
                path: "/analytics/fugitive-emissions",
                isAdmin: false,
              },
            ],
          },
          {
            title: "Scope 2",
            icon: "/data-icon.png",
            path: "#",
            isAdmin: false,
            children: [
              {
                title: "Purchased Electricity",
                path: "/analytics/purchased-electricity",
                isAdmin: false,
              },
              {
                title: "Purchased Heat/Cooling",
                path: "/analytics/purchased-heat-cooling",
                isAdmin: false,
              },
            ],
          },
          {
            title: "Scope 3",
            icon: "/data-icon.png",
            path: "#",
            isAdmin: false,
            children: [
              {
                title: "Purchased Goods & Services",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Use Of Sold Products",
                path: "#",
                isAdmin: false,
              },
              {
                title: "End Of Life Treatment of So...",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Upstream Leased Assets",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Franchises",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Investments",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Capital Goods",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Fuel & Energy Related Activities",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Upstream Transportation",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Downstream Transportation",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Business Travel",
                path: "#",
                isAdmin: false,
              },
              {
                title: "Waste Generated",
                path: "#",
                isAdmin: false,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Action",
    icon: "/action.png",
    path: "/action",
    isAdmin: false,
  },
  {
    title: "Learn",
    icon: "/learn.png",
    path: "/learn",
    isAdmin: false,
  },
  {
    title: "Manage Roles",
    icon: "/role-icon.svg",
    path: "/roles",
    isAdmin: false,
  },
  {
    title: "Manage Users",
    icon: "/contactus.png",
    path: "/users",
    isAdmin: false,
  },
  {
    title: "Contact Us",
    icon: "/contactus.png",
    path: "/contact-us",
    isAdmin: false,
  },
  {
    title: "Log Out",
    icon: "/logout.png",
    path: "/logout",
    isAdmin: true,
  },
];
