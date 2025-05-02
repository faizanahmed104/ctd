import ComperativeData from "../../Components/ComparitiveData";
import CompanyData from "./CompanyData";

export const TABS = [
  {
    id: 0,
    label: "Company Data",
    content: <CompanyData />,
  },
  { id: 1, label: "Comparative Data", content: <ComperativeData /> },
];
