import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../app/Helpers/Endpoints";
import { API } from "../../../services";

const initialState = {
  purchasedElectricitySubmissions: [],
  requests: {
    fetchPurchasedElectricitySubmissions: {
      success: false,
      error: "",
      inProgress: false,
    },
    postPurchasedElectricitySubmission: {
      success: false,
      error: "",
      inProgress: false,
    },
  },
};

export const fetchPurchasedElectricitySubmissions = createAsyncThunk(
  "/purchased-electricity-submissions/fetchPurchasedElectricitySubmissions",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.get(endpoints.getPurchasedElectricitySubmissions);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data ||
        "Error fetching purchased electricity submissions!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const savePurchasedElectricitySubmission = createAsyncThunk(
  "/purchased-electricity-submissions/savePurchasedElectricitySubmission",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await API.post(
        endpoints.savePurchasedElectricitySubmission,
        data
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data ||
        "Error posting purchased electricity submission!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const purchasedElectricitySubmissionSlice = createSlice({
  name: "purchasedElectricitySubmission",
  initialState,
  reducers: {
    clearPurchasedElectricitySubmissionSuccess: (state) => {
      state.requests.postPurchasedElectricitySubmission.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPurchasedElectricitySubmissions.pending, (state) => {
      state.requests.fetchPurchasedElectricitySubmissions.inProgress = true;
      console.log("Pending");
    });
    builder.addCase(
      fetchPurchasedElectricitySubmissions.rejected,
      (state, action) => {
        state.requests.fetchPurchasedElectricitySubmissions.error =
          action.payload;
        state.requests.fetchPurchasedElectricitySubmissions.inProgress = false;
        console.log("Rejected");
      }
    );
    builder.addCase(
      fetchPurchasedElectricitySubmissions.fulfilled,
      (state, action) => {
        state.requests.fetchPurchasedElectricitySubmissions.inProgress = false;
        state.requests.fetchPurchasedElectricitySubmissions.success = true;
        state.purchasedElectricitySubmissions = action.payload.data;

        console.log("fulfilled", state.purchasedElectricitySubmissions);
      }
    );

    builder.addCase(savePurchasedElectricitySubmission.pending, (state) => {
      state.requests.postPurchasedElectricitySubmission.inProgress = true;
    });
    builder.addCase(
      savePurchasedElectricitySubmission.rejected,
      (state, action) => {
        state.requests.postPurchasedElectricitySubmission.error =
          action.payload;
        state.requests.postPurchasedElectricitySubmission.inProgress = false;
      }
    );
    builder.addCase(
      savePurchasedElectricitySubmission.fulfilled,
      (state, action) => {
        state.requests.postPurchasedElectricitySubmission.inProgress = false;
        state.requests.postPurchasedElectricitySubmission.success = true;
        state.purchasedElectricitySubmissions.push(
          action.payload.newSubmission
        );
      }
    );
  },
});

export const { clearPurchasedElectricitySubmissionSuccess } =
  purchasedElectricitySubmissionSlice.actions;

export const selectPurchasedElectricitySubmissionState = (state) =>
  state.purchasedElectricitySubmissions;
export default purchasedElectricitySubmissionSlice.reducer;
