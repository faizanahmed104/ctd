import {
  FUEL_TYPES,
  FUEL_UNITS,
} from "../fugitive-emissions/add-fugitive-emission/constant";

export const tableHeaderStyles = "text-left text-xl font-bold text-[#2d4c31]";
export const tableDataStyles = "text-left text-sm font-sm text-black";
export const thStyles = "py-2 px-4 text-left bg-gray-100";
export const tdStyles = "py-2 px-4 text-left";

export const HEADERS = [
  { label: "Entity", key: "entity" },
  { label: "Submitted By", key: "submittedByName" },
  {
    label: "Fuel Type",
    key: "fuelType",
    format: (row) =>
      FUEL_TYPES?.find((s) => s.value === row?.fuelType)?.label || row?.fuelType,
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
    label: "Unit Type",
    key: "unitType",
    format: (row) =>
      FUEL_UNITS?.find((ut) => ut.value === row?.fuelUnit)?.label ||
      row?.fuelUnit,
  },
  { label: "Quantity", key: "quantity" },
  {
    label: "tCO₂e",
    key: "tCO2e",
    format: (row) => (row?.tCO2e)?.toFixed(4),
  },
  { label: "Actions", key: "actions" },
];
