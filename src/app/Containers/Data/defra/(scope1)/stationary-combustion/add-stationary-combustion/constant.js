export const SECTORS = [
  { value: "energy-industries", label: "Energy Industries" },
  {
    value: "manufacturing-construction",
    label: "Manufacturing & Construction",
  },
  { value: "commercial-institutional", label: "Commercial & Institutional" },
  { value: "residential-agricultural", label: "Residential & Agricultural" },
];

export const MONTHS = [
  { value: "january", label: "January" },
  { value: "february", label: "February" },
  { value: "march", label: "March" },
  { value: "april", label: "April" },
  { value: "may", label: "May" },
  { value: "june", label: "June" },
  { value: "july", label: "July" },
  { value: "august", label: "August" },
  { value: "september", label: "September" },
  { value: "october", label: "October" },
  { value: "november", label: "November" },
  { value: "december", label: "December" },
];

// Helper functions for dropdowns
export const getFuelCategories = () => {
  return Object.keys(FUEL_CATEGORIES).map((category) => ({
    value: category.toLowerCase().replace(/\s+/g, "-"),
    label: category,
  }));
};

export const getFuelTypes = (category) => {
  if (!category) return [];
  const categoryData = FUEL_CATEGORIES[category];
  if (!categoryData) return [];

  return Object.keys(categoryData.fuels).map((fuel) => ({
    value: fuel
      .toLowerCase()
      .replace(/[()%]/g, "") // Remove parentheses and % symbol
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/--+/g, "-"), // Replace multiple hyphens with single hyphen
    label: fuel,
  }));
};

export const getFuelUnits = (category, fuelType) => {
  if (!category || !fuelType) return [];
  const categoryData = FUEL_CATEGORIES[category];
  if (!categoryData?.fuels[fuelType]) return [];

  return categoryData.fuels[fuelType].map((unit) => ({
    value: unit
      .toLowerCase()
      .replace(/[()%]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-"),
    label: unit,
  }));
};

export const FUEL_CATEGORIES = {
  "Gaseous fuels": {
    fuels: {
      Butane: ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      CNG: ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      LNG: ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      LPG: ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      "Natural gas": [
        "tonnes",
        "cubic metres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Natural gas (100% mineral blend)": [
        "tonnes",
        "cubic metres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Other petroleum gas": [
        "tonnes",
        "litres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      Propane: ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
    },
  },
  "Liquid fuels": {
    fuels: {
      "Aviation spirit": ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      "Aviation turbine fuel": [
        "tonnes",
        "litres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Burning oil": ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      "Diesel (average biofuel blend)": [
        "tonnes",
        "litres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Diesel (100% mineral diesel)": [
        "tonnes",
        "litres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Fuel oil": ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      "Gas oil": ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      Lubricants: ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      Naphtha: ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      "Petrol (average biofuel blend)": [
        "tonnes",
        "litres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Petrol (100% mineral petrol)": [
        "tonnes",
        "litres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Processed fuel oils - residual oil": [
        "tonnes",
        "litres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Processed fuel oils - distillate oil": [
        "tonnes",
        "litres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Refinery miscellaneous": [
        "tonnes",
        "litres",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Waste oils": ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      "Marine gas oil": ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
      "Marine fuel oil": ["tonnes", "litres", "kWh (Net CV)", "kWh (Gross CV)"],
    },
  },
  "Solid fuels": {
    fuels: {
      "Coal (industrial)": ["tonnes", "kWh (Net CV)", "kWh (Gross CV)"],
      "Coal (electricity generation)": [
        "tonnes",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
      "Coal (domestic)": ["tonnes", "kWh (Net CV)", "kWh (Gross CV)"],
      "Coking coal": ["tonnes", "kWh (Net CV)", "kWh (Gross CV)"],
      "Petroleum coke": ["tonnes", "kWh (Net CV)", "kWh (Gross CV)"],
      "Coal (electricity generation - home produced coal only)": [
        "tonnes",
        "kWh (Net CV)",
        "kWh (Gross CV)",
      ],
    },
  },
};
