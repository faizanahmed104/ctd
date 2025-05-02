import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import history from "./slices/history";
import analytics from "./slices/analytics";
import submission from "./slices/ipcc/clientSubmission";
import mobileSubmission from "./slices/ipcc/mobileSubmission";
import fugitiveSubmissions from "./slices/ipcc/fugitiveSubmission";
import purchasedElectricitySubmissions from "./slices/ipcc/purchasedElectricitySubmissions";
import purchasedHeatSubmissions from "./slices/ipcc/purchasedHeatSubmissions";
import defraSubmission from "./slices/defra/clientSubmission";
import defraMobileSubmission from "./slices/defra/mobileSubmission";
import defraFugitiveSubmissions from "./slices/defra/fugitiveSubmission";
import defraPurchasedElectricitySubmissions from "./slices/defra/purchasedElectricitySubmissions";
import defraPurchasedHeatSubmissions from "./slices/defra/purchasedHeatSubmissions";

const rootReducer = combineReducers({
  auth,
  history,
  analytics,
  clientSubmission: submission,
  mobileSubmission,
  fugitiveSubmissions,
  purchasedElectricitySubmissions,
  purchasedHeatSubmissions,
  defraSubmission,
  defraMobileSubmission,
  defraFugitiveSubmissions,
  defraPurchasedElectricitySubmissions,
  defraPurchasedHeatSubmissions,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
