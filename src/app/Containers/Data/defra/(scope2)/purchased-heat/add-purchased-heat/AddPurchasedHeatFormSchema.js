import * as yup from "yup";

export const schema = yup.object().shape({
  entity: yup.string().trim().required("Entity is required"),
  sector: yup.string().required("Sector is required"),
  month: yup.string().required("Month is required"),
  year: yup.string().required("Year is required"),
  quantity: yup.number().required("Quantity is required"),
  type: yup.string().required("Type is required"),
  unitType: yup.string().required("Unit type is required"),
});
