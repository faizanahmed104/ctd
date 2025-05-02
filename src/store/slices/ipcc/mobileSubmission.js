import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../services";
import { endpoints } from "../../../app/Helpers/Endpoints";

const initialState = {
  mobileSubmissions: [],
  requests: {
    fetchMobileSubmissions: { success: false, error: "", inProgress: false },
    postMobileSubmission: { success: false, error: "", inProgress: false },
  },
};

export const fetchMobileSubmissions = createAsyncThunk(
  "mobileSubmission/fetchSubmissions",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.get(endpoints.getMobileSubmissions);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data || "Error fetching mobile submissions!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const saveMobileSubmission = createAsyncThunk(
  "mobileSubmission/saveMobileSubmission",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Add 3 second delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      const res = await API.post(endpoints.saveMobileSubmission, data);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data || "Error posting mobile submission!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const mobileSubmissionSlice = createSlice({
  name: "mobileSubmission",
  initialState,
  reducers: {
    clearMobileSubmissionSuccess: (state) => {
      state.requests.postMobileSubmission.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMobileSubmissions.pending, (state) => {
      state.requests.fetchMobileSubmissions.inProgress = true;
      console.log("Pending");
    });
    builder.addCase(fetchMobileSubmissions.rejected, (state, action) => {
      state.requests.fetchMobileSubmissions.error = action.payload;
      state.requests.fetchMobileSubmissions.inProgress = false;
      console.log("Rejected");
    });
    builder.addCase(fetchMobileSubmissions.fulfilled, (state, action) => {
      state.requests.fetchMobileSubmissions.inProgress = false;
      state.requests.fetchMobileSubmissions.success = true;
      state.mobileSubmissions = action.payload.data;

      console.log("fulfilled", state.mobileSubmissions);
    });

    builder.addCase(saveMobileSubmission.pending, (state) => {
      state.requests.postMobileSubmission.inProgress = true;
    });
    builder.addCase(saveMobileSubmission.rejected, (state, action) => {
      state.requests.postMobileSubmission.error = action.payload;
      state.requests.postMobileSubmission.inProgress = false;
    });
    builder.addCase(saveMobileSubmission.fulfilled, (state, action) => {
      state.requests.postMobileSubmission.inProgress = false;
      state.requests.postMobileSubmission.success = true;
      state.mobileSubmissions.push(action.payload.newSubmission);
    });
  },
});

export const { clearMobileSubmissionSuccess } = mobileSubmissionSlice.actions;
export const selectMobileSubmissionState = (state) => state.mobileSubmission;
export default mobileSubmissionSlice.reducer;
