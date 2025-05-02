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

export const FUEL_TYPES = [
  { label: "Diesel", value: "diesel" },
  { label: "Petrol", value: "petrol" },
  {
    label: "Plug-in Hybrid Electric Vehicle",
    value: "plug-in-hybrid-electric-vehicle",
  },
  { label: "Battery Electric Vehicle", value: "battery-electric-vehicle" },
  { label: "Hybrid", value: "hybrid" },
  { label: "CNG", value: "cng" },
  { label: "LPG", value: "lpg" },
  { label: "Unknown", value: "unknown" },
];

export const FUEL_UNITS = [{ value: "km", label: "km" }];

export const VEHICLE_CATEGORIES = [
  { value: "car-by-market-segment", label: "Car (by market segment)" },
  { value: "motorbike", label: "Motorbike" },
  { value: "van", label: "Van" },
  { value: "car-by-size", label: "Car (by size)" },
];

export const VEHICLE_TYPES = [
  { label: "Mini", value: "mini" },
  { label: "Supermini", value: "supermini" },
  { label: "Lower medium", value: "lower-medium" },
  { label: "Upper medium", value: "upper-medium" },
  { label: "Executive", value: "executive" },
  { label: "Luxury", value: "luxury" },
  { label: "Sports", value: "sports" },
  { label: "Dual purpose 4X4", value: "dual-purpose-4x4" },
  { label: "MPV", value: "mpv" },
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "Average", value: "average" },
  {
    label: "Class I (up to 1.305 tonnes)",
    value: "class-i-up-to-1-305-tonnes",
  },
  {
    label: "Class II (1.305 to 1.74 tonnes)",
    value: "class-ii-1-305-to-1-74-tonnes-",
  },
  {
    label: "Class III (1.74 to 3.5 tonnes)",
    value: "class-iii-1-74-to-3-5-tonnes",
  },
  { label: "Average (up to 3.5 tonnes)", value: "average-up-to-3-5-tonnes" },
];

// Helper functions for dependent dropdowns
export const getVehicleTypes = (categoryValue) => {
  switch (categoryValue) {
    case "car-by-market-segment":
      return VEHICLE_TYPES.filter((type) =>
        [
          "mini",
          "supermini",
          "lower-medium",
          "upper-medium",
          "executive",
          "luxury",
          "sports",
          "dual-purpose-4x4",
          "mpv",
        ].includes(type.value)
      );
    case "motorbike":
      return VEHICLE_TYPES.filter((type) =>
        ["small", "medium", "large", "average"].includes(type.value)
      );
    case "van":
      return VEHICLE_TYPES.filter((type) =>
        [
          "class-i-up-to-1-305-tonnes",
          "class-ii-1-305-to-1-74-tonnes-",
          "class-iii-1-74-to-3-5-tonnes",
          "average-up-to-3-5-tonnes",
        ].includes(type.value)
      );
    case "car-by-size":
      return VEHICLE_TYPES.filter((type) =>
        ["small", "medium", "large", "average"].includes(type.value)
      );
    default:
      return [];
  }
};

export const getFuelTypes = (categoryValue, vehicleType) => {
  // Base fuel types available for most vehicles
  const baseFuelTypes = [
    "diesel",
    "petrol",
    "plug-in-hybrid-electric-vehicle",
    "battery-electric-vehicle",
  ];

  // Return specific fuel types based on category and vehicle type
  switch (categoryValue) {
    case "car-by-market-segment":
      return FUEL_TYPES.filter((type) => baseFuelTypes.includes(type.value));
    case "car-by-size":
      return FUEL_TYPES.filter((type) =>
        [...baseFuelTypes, "cng", "lpg", "hybrid", "unknown"].includes(
          type.value
        )
      );
    case "motorbike":
      return FUEL_TYPES.filter((type) => ["petrol"].includes(type.value));
    case "van":
      return FUEL_TYPES.filter((type) =>
        [...baseFuelTypes, "cng", "lpg"].includes(type.value)
      );
    default:
      return [];
  }
};
