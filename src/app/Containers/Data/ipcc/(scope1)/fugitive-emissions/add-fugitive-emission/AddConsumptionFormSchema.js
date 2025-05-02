import * as yup from "yup";

export const schema = yup.object().shape({
  entity: yup.string().required("Entity is required"),
  sector: yup.string().required("Sector is required"),
  month: yup.string().required("Month is required"),
  year: yup.string().required("Year is required"),
  segment: yup.string().required("Segment is required"),
  unitType: yup.string().required("Fuel Units are required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must be positive"),
  carbonContent: yup.string(),
  calculationMethod: yup.string(),
});
