import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../services";
import { endpoints } from "../../../app/Helpers/Endpoints";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const initialState = {
  submissions: [],
  requests: {
    fetchSubmissions: { success: false, error: "", inProgress: false },
    postSubmission: { success: false, error: "", inProgress: false },
  },
};

export const fetchSubmissions = createAsyncThunk(
  "clientSubmission/fetchSubmissions",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.get(endpoints.getSubmissions);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data || "Error fetching submissions!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const saveSubmission = createAsyncThunk(
  "clientSubmission/saveSubmission",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.post(endpoints.saveSubmission, data);
      // Add a minimum 3 second delay
      await delay(3000);
      return fulfillWithValue(res.data);
    } catch (error) {
      await delay(3000); // Also delay error response
      const errorMessage = error.response?.data || "Error posting submission!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const clientSubmissionSlice = createSlice({
  name: "clientSubmission",
  initialState,
  reducers: {
    clearSubmissionSuccess: (state) => {
      state.requests.postSubmission.success = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubmissions.pending, (state) => {
      state.requests.fetchSubmissions.inProgress = true;
      console.log('Pending')
    });
    builder.addCase(fetchSubmissions.rejected, (state, action) => {
      state.requests.fetchSubmissions.error = action.payload;
      state.requests.fetchSubmissions.inProgress = false;
      console.log('Rejected')
    });
    builder.addCase(fetchSubmissions.fulfilled, (state, action) => {
      state.requests.fetchSubmissions.inProgress = false;
      state.requests.fetchSubmissions.success = true;
      state.submissions = action.payload.data;
      
      console.log("fulfilled", state.submissions);
    });

    builder.addCase(saveSubmission.pending, (state) => {
      state.requests.postSubmission.inProgress = true;
      state.requests.postSubmission.success = false;
      state.requests.postSubmission.error = "";
    });
    builder.addCase(saveSubmission.rejected, (state, action) => {
      state.requests.postSubmission.error = action.payload;
      state.requests.postSubmission.inProgress = false;
      state.requests.postSubmission.success = false;
    });
    builder.addCase(saveSubmission.fulfilled, (state, action) => {
      state.requests.postSubmission.inProgress = false;
      state.requests.postSubmission.success = true;
      state.requests.postSubmission.error = "";
      state.submissions.push(action.payload.newSubmission);
    });
  },
});

export const { clearSubmissionSuccess } = clientSubmissionSlice.actions;
export const selectClientSubmissionState = (state) => state.clientSubmission;
export default clientSubmissionSlice.reducer;
