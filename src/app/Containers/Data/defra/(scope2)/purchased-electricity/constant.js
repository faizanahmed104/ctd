import {
  // SEGMENTS,
  UNIT_TYPES,
} from "../purchased-electricity/add-purchased-electricity/constant";

export const tableHeaderStyles = "text-left text-xl font-bold text-[#2d4c31]";
export const tableDataStyles = "text-left text-sm font-sm text-black";
export const thStyles = "py-2 px-4 text-left bg-gray-100";
export const tdStyles = "py-2 px-4 text-left";

export const HEADERS = [
  { label: "Entity", key: "entity" },
  { label: "Submitted By", key: "submittedByName" },
  // {
  //   label: "Segment",
  //   key: "segment",
  //   format: (row) =>
  //     SEGMENTS.find((s) => s.value === row?.segment)?.label || row?.segment,
  // },
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
      UNIT_TYPES.find((ut) => ut.value === row?.unitType)?.label ||
      row?.unitType,
  },
  { label: "Quantity", key: "quantity" },
  {
    label: "tCO₂e",
    key: "tCO2e",
    format: (row) => (row?.tCO2e)?.toFixed(4),
  },
  { label: "Actions", key: "actions" },
];
