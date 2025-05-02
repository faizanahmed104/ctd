export const tableHeaderStyles = "text-left text-xl font-bold text-[#2d4c31]";
export const tableDataStyles = "text-left text-sm font-sm text-black";
export const thStyles = "py-2 px-4 text-left bg-gray-100";
export const tdStyles = "py-2 px-4 text-left";

export const HEADERS = [
  { label: "Entity", key: "entity" },
  { label: "Submitted By", key: "submittedByName" },
  {
    label: "Sector",
    key: "sector",
    format: (row) =>
      row?.sector
        ?.split("-")
        .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
        .join(" "),
  },
  {
    label: "Time Period",
    key: "timePeriod",
    format: (row) =>
      `${row?.month?.charAt(0).toUpperCase() + row?.month?.slice(1)} ${
        row?.year
      }`,
  },
  {
    label: "Fuel Type",
    key: "fuelType",
    format: (row) =>
      row?.fuelType
        ?.split("-")
        .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
        .join(" "),
  },
  { label: "Quantity", key: "quantity" },
  {
    label: "Units",
    key: "fuelUnits",
    format: (row) =>
      row?.fuelUnits
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
  },
  {
    label: "Emissions (tCO2e)",
    key: "tCO2e",
    format: (row) => row?.tCO2e?.toFixed(4),
  },
  { label: "Actions", key: "actions" },
];
