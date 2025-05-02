import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../services";
import { endpoints } from "../../../app/Helpers/Endpoints";

const initialState = {
  fugitiveSubmissions: [],
  requests: {
    fetchFugitiveSubmissions: { success: false, error: "", inProgress: false },
    postFugitiveSubmission: { success: false, error: "", inProgress: false },
  },
};

export const fetchFugitiveSubmissions = createAsyncThunk(
  "fugitiveSubmission/fetchSubmissions",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.get(endpoints.getFugitiveSubmissions);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data || "Error fetching Fugitive submissions!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const saveFugitiveSubmission = createAsyncThunk(
  "fugitiveSubmission/saveFugitiveSubmission",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Add 3 second delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      const res = await API.post(endpoints.saveFugitiveSubmission, data);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data || "Error posting Fugitive submission!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const fugitiveSubmissionSlice = createSlice({
  name: "fugitiveSubmission",
  initialState,
  reducers: {
    clearFugitiveSubmissionSuccess: (state) => {
      state.requests.postFugitiveSubmission.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFugitiveSubmissions.pending, (state) => {
      state.requests.fetchFugitiveSubmissions.inProgress = true;
      console.log("Pending");
    });
    builder.addCase(fetchFugitiveSubmissions.rejected, (state, action) => {
      state.requests.fetchFugitiveSubmissions.error = action.payload;
      state.requests.fetchFugitiveSubmissions.inProgress = false;
      console.log("Rejected");
    });
    builder.addCase(fetchFugitiveSubmissions.fulfilled, (state, action) => {
      state.requests.fetchFugitiveSubmissions.inProgress = false;
      state.requests.fetchFugitiveSubmissions.success = true;
      state.fugitiveSubmissions = action.payload.data;

      console.log("fulfilled", state.fugitiveSubmissions);
    });

    builder.addCase(saveFugitiveSubmission.pending, (state) => {
      state.requests.postFugitiveSubmission.inProgress = true;
    });
    builder.addCase(saveFugitiveSubmission.rejected, (state, action) => {
      state.requests.postFugitiveSubmission.error = action.payload;
      state.requests.postFugitiveSubmission.inProgress = false;
    });
    builder.addCase(saveFugitiveSubmission.fulfilled, (state, action) => {
      state.requests.postFugitiveSubmission.inProgress = false;
      state.requests.postFugitiveSubmission.success = true;
      state.fugitiveSubmissions.push(action.payload.newSubmission);
    });
  },
});

export const { clearFugitiveSubmissionSuccess } = fugitiveSubmissionSlice.actions;

export const selectFugitiveSubmissionState = (state) =>
  state.fugitiveSubmissions;
export default fugitiveSubmissionSlice.reducer;
