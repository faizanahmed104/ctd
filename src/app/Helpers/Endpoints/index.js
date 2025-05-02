import { saveFugitiveSubmission } from "../../../store/slices/ipcc/fugitiveSubmission";
import { saveMobileSubmission } from "../../../store/slices/ipcc/mobileSubmission";

const endpoints = {
  carbonTrackEvolution: (startDate, endDate, type) =>
    `ce/evolution-data?startDate=${startDate}&endDate=${endDate}&type=${type}`,
  carbonTrackBreakDown: (startDate, endDate, type) =>
    `ce/breakdown?startDate=${startDate}&endDate=${endDate}&type=${type}`,
  currentMonthEmissions: `ce/current-month`,
  annualEmissions: `ce/current-year`,
  totalEmissions: `ce/total-emissions`,
  analyticsScope: `analytics/scopes`,
  analyticsTotalEmissions: `analytics/total-emissions`,
  analyticsEmissionOverTime: (type) =>
    `analytics/emissions-over-time?type=${type}`,
  analyticsCategoryEmissions: (startDate, endDate) =>
    `analytics/category-based-emissions?startDate=${startDate}&endDate=${endDate}`,
  analyticsGetEntities: `analytics/entities`,
  analyticsGetAvg: `analytics/get-avg`,
  fileUpload: `upload`,
  historyAccordingToScope: (calculationMethod, emissionFactor) =>
    `history?calculationMethod=${calculationMethod}&emissionFactor=${emissionFactor}`,
  addRole: "role/add",
  getRole: (page, limit, sortOrder, filtered) =>
    `role/get?page=${page}&limit=${limit}&sortOrder=${sortOrder}&filtered=${filtered}`,
  deleteRole: `role/delete`,
  updateRole: `role/update`,
  getAllUsers: (page, limit, sortOrder, filtered) =>
    `/user/all?page=${page}&limit=${limit}&sortOrder=${sortOrder}&filtered=${filtered}`,
  deleteUser: `user/delete`,
  updateUser: `user/update`,
  saveSubmission: "/submissions",
  getSubmissions: "/submissions/history?SearchTerm=All",
  saveMobileSubmission: "/mobile-submissions",
  getMobileSubmissions:
    "mobile-submissions/mobile-submissions-history?SearchTerm=All",
  saveFugitiveSubmission: "/fugitive-submissions",
  getFugitiveSubmissions:
    "fugitive-submissions/fugitive-submissions-history?SearchTerm=All",
  savePurchasedElectricitySubmission: "/purchased-electricity-submissions",
  getPurchasedElectricitySubmissions:
    "/purchased-electricity-submissions/purchased-electricity-submissions-history?SearchTerm=All",
  savePurchasedHeatSubmission: "/purchased-heat-submissions",
  getPurchasedHeatSubmissions:
    "/purchased-heat-submissions/purchased-heat-submissions-history?SearchTerm=All",
  saveDefraStationarySubmission: "/stationary-submissions",
  getDefraStationarySubmissions:
    "/stationary-submissions/history?SearchTerm=All",
  saveDefraMobileSubmission:
    "/defra-mobile-submissions/defra-mobile-submissions",
  getDefraMobileSubmissions: "/defra-mobile-submissions/history?SearchTerm=All",
  saveDefraFugitiveSubmission:
    "/defra-fugitive-submissions/defra-fugitive-submissions",
  getDefraFugitiveSubmissions:
    "/defra-fugitive-submissions/history?SearchTerm=All",
  saveDefraPurchasedElectricitySubmission:
    "/defra-purchased-electricity-submissions",
  getDefraPurchasedElectricitySubmissions:
    "/defra-purchased-electricity-submissions/history?SearchTerm=All",
  saveDefraPurchasedHeatSubmission: "/defra-purchased-heat-submissions",
  getDefraPurchasedHeatSubmissions:
    "/defra-purchased-heat-submissions/history?SearchTerm=All",
};

const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_LOCAL
    : process.env.NEXT_PUBLIC_API_LIVE;

export { apiUrl, endpoints };
