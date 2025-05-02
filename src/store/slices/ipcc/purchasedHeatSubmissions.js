import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../../../app/Helpers/Endpoints";
import { API } from "../../../services";

const initialState = {
  purchasedHeatSubmissions: [],
  requests: {
    fetchPurchasedHeatSubmissions: {
      success: false,
      error: "",
      inProgress: false,
    },
    postPurchasedHeatSubmission: {
      success: false,
      error: "",
      inProgress: false,
    },
  },
};

export const fetchPurchasedHeatSubmissions = createAsyncThunk(
  "/purchased-heat-submissions/fetchPurchasedHeatSubmissions",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.get(endpoints.getPurchasedHeatSubmissions);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data ||
        "Error fetching purchased heat submissions!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const savePurchasedHeatSubmission = createAsyncThunk(
  "/purchased-heat-submissions/savePurchasedHeatSubmission",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await API.post(
        endpoints.savePurchasedHeatSubmission,
        data
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data ||
        "Error posting purchased heat submission!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const purchasedHeatSubmissionSlice = createSlice({
  name: "purchasedHeatSubmission",
  initialState,
  reducers: {
    clearPurchasedHeatSubmissionSuccess: (state) => {
      state.requests.postPurchasedHeatSubmission.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPurchasedHeatSubmissions.pending, (state) => {
      state.requests.fetchPurchasedHeatSubmissions.inProgress = true;
      console.log("Pending");
    });
    builder.addCase(
      fetchPurchasedHeatSubmissions.rejected,
      (state, action) => {
        state.requests.fetchPurchasedHeatSubmissions.error =
          action.payload;
        state.requests.fetchPurchasedHeatSubmissions.inProgress = false;
        console.log("Rejected");
      }
    );
    builder.addCase(
      fetchPurchasedHeatSubmissions.fulfilled,
      (state, action) => {
        state.requests.fetchPurchasedHeatSubmissions.inProgress = false;
        state.requests.fetchPurchasedHeatSubmissions.success = true;
        state.purchasedHeatSubmissions = action.payload.data;

        console.log("fulfilled", state.purchasedHeatSubmissions);
      }
    );

    builder.addCase(savePurchasedHeatSubmission.pending, (state) => {
      state.requests.postPurchasedHeatSubmission.inProgress = true;
    });
    builder.addCase(
      savePurchasedHeatSubmission.rejected,
      (state, action) => {
        state.requests.postPurchasedHeatSubmission.error =
          action.payload;
        state.requests.postPurchasedHeatSubmission.inProgress = false;
      }
    );
    builder.addCase(
      savePurchasedHeatSubmission.fulfilled,
      (state, action) => {
        state.requests.postPurchasedHeatSubmission.inProgress = false;
        state.requests.postPurchasedHeatSubmission.success = true;
        state.purchasedHeatSubmissions.push(
          action.payload.newSubmission
        );
      }
    );
  },
});

export const { clearPurchasedHeatSubmissionSuccess } =
  purchasedHeatSubmissionSlice.actions;

export const selectPurchasedHeatSubmissionState = (state) =>
  state.purchasedHeatSubmissions;
export default purchasedHeatSubmissionSlice.reducer;
