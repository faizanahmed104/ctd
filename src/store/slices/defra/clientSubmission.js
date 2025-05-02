import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../services";
import { endpoints } from "../../../app/Helpers/Endpoints";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const initialState = {
  submissions: [],
  requests: {
    fetchSubmissions: { success: false, error: "", inProgress: false },
    postSubmission: { success: false, error: "", inProgress: false },
    bulkUpload: { success: false, error: "", inProgress: false }, // Add this
  },
};

export const fetchSubmissions = createAsyncThunk(
  "clientSubmission/fetchSubmissions",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.get(endpoints.getDefraStationarySubmissions);
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
      const res = await API.post(endpoints.saveDefraStationarySubmission, data);
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

export const bulkUploadStationary = createAsyncThunk(
  "clientSubmission/bulkUploadStationary",
  async ({ file, userId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      const res = await API.post("/defra/bulk-upload/stationary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage = error.response?.data || "Error uploading file!";
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

    builder.addCase(bulkUploadStationary.pending, (state) => {
      state.requests.bulkUpload.inProgress = true;
      state.requests.bulkUpload.success = false;
      state.requests.bulkUpload.error = "";
    });
    builder.addCase(bulkUploadStationary.rejected, (state, action) => {
      state.requests.bulkUpload.error = action.payload;
      state.requests.bulkUpload.inProgress = false;
      state.requests.bulkUpload.success = false;
    });
    builder.addCase(bulkUploadStationary.fulfilled, (state, action) => {
      state.requests.bulkUpload.inProgress = false;
      state.requests.bulkUpload.success = true;
      state.requests.bulkUpload.error = "";
      // Optionally update submissions if the API returns new data
      if (action.payload.data) {
        state.submissions = [...state.submissions, ...action.payload.data];
      }
    });
  },
});

export const { clearSubmissionSuccess } = clientSubmissionSlice.actions;
export const selectClientSubmissionState = (state) => state.clientSubmission;
export default clientSubmissionSlice.reducer;
