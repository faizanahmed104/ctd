import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../services";
import { endpoints } from "../../../app/Helpers/Endpoints";

const initialState = {
  mobileSubmissions: [],
  requests: {
    fetchMobileSubmissions: { success: false, error: "", inProgress: false },
    postMobileSubmission: { success: false, error: "", inProgress: false },
    bulkUpload: { success: false, error: "", inProgress: false }, // Add this
  },
};

export const fetchMobileSubmissions = createAsyncThunk(
  "mobileSubmission/fetchSubmissions",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.get(endpoints.getDefraMobileSubmissions);
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
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await API.post(endpoints.saveDefraMobileSubmission, data);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data || "Error posting mobile submission!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const bulkUploadMobile = createAsyncThunk(
  "mobileSubmission/bulkUploadMobile",
  async ({ file, userId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      const res = await API.post("/defra/bulk-upload/mobile", formData, {
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

    builder.addCase(bulkUploadMobile.pending, (state) => {
      state.requests.bulkUpload.inProgress = true;
      state.requests.bulkUpload.success = false;
      state.requests.bulkUpload.error = "";
    });
    builder.addCase(bulkUploadMobile.rejected, (state, action) => {
      state.requests.bulkUpload.error = action.payload;
      state.requests.bulkUpload.inProgress = false;
      state.requests.bulkUpload.success = false;
    });
    builder.addCase(bulkUploadMobile.fulfilled, (state, action) => {
      state.requests.bulkUpload.inProgress = false;
      state.requests.bulkUpload.success = true;
      state.requests.bulkUpload.error = "";
      if (action.payload.data) {
        state.mobileSubmissions = [...state.mobileSubmissions, ...action.payload.data];
      }
    });
  },
});

export const { clearMobileSubmissionSuccess } = mobileSubmissionSlice.actions;
export const selectMobileSubmissionState = (state) => state.mobileSubmission;
export default mobileSubmissionSlice.reducer;
