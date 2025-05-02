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
    bulkUpload: { success: false, error: "", inProgress: false },
  },
};

export const fetchDefraPurchasedElectricitySubmissions = createAsyncThunk(
  "/purchased-electricity-submissions/fetchDefraPurchasedElectricitySubmissions",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.get(
        endpoints.getDefraPurchasedElectricitySubmissions
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data ||
        "Error fetching purchased electricity submissions!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const saveDefraPurchasedElectricitySubmission = createAsyncThunk(
  "/purchased-electricity-submissions/saveDefraPurchasedElectricitySubmission",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await API.post(
        endpoints.saveDefraPurchasedElectricitySubmission,
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

export const bulkUploadPurchasedElectricity = createAsyncThunk(
  "pruchasedElectricitySubmission/bulkUploadPurchasedElectricity",
  async ({ file, userId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      const res = await API.post(
        "/defra/bulk-upload/purchased-electricity",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage = error.response?.data || "Error uploading file!";
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
    builder.addCase(fetchDefraPurchasedElectricitySubmissions.pending, (state) => {
      state.requests.fetchPurchasedElectricitySubmissions.inProgress = true;
      console.log("Pending");
    });
    builder.addCase(
      fetchDefraPurchasedElectricitySubmissions.rejected,
      (state, action) => {
        state.requests.fetchPurchasedElectricitySubmissions.error =
          action.payload;
        state.requests.fetchPurchasedElectricitySubmissions.inProgress = false;
        console.log("Rejected");
      }
    );
    builder.addCase(
      fetchDefraPurchasedElectricitySubmissions.fulfilled,
      (state, action) => {
        state.requests.fetchPurchasedElectricitySubmissions.inProgress = false;
        state.requests.fetchPurchasedElectricitySubmissions.success = true;
        state.purchasedElectricitySubmissions = action.payload.data;

        console.log("fulfilled", state.purchasedElectricitySubmissions);
      }
    );

    builder.addCase(saveDefraPurchasedElectricitySubmission.pending, (state) => {
      state.requests.postPurchasedElectricitySubmission.inProgress = true;
    });
    builder.addCase(
      saveDefraPurchasedElectricitySubmission.rejected,
      (state, action) => {
        state.requests.postPurchasedElectricitySubmission.error =
          action.payload;
        state.requests.postPurchasedElectricitySubmission.inProgress = false;
      }
    );
    builder.addCase(
      saveDefraPurchasedElectricitySubmission.fulfilled,
      (state, action) => {
        state.requests.postPurchasedElectricitySubmission.inProgress = false;
        state.requests.postPurchasedElectricitySubmission.success = true;
        state.purchasedElectricitySubmissions.push(
          action.payload.newSubmission
        );
      }
    );

    builder.addCase(bulkUploadPurchasedElectricity.pending, (state) => {
      state.requests.bulkUpload.inProgress = true;
      state.requests.bulkUpload.success = false;
      state.requests.bulkUpload.error = "";
    });
    builder.addCase(
      bulkUploadPurchasedElectricity.rejected,
      (state, action) => {
        state.requests.bulkUpload.error = action.payload;
        state.requests.bulkUpload.inProgress = false;
        state.requests.bulkUpload.success = false;
      }
    );
    builder.addCase(
      bulkUploadPurchasedElectricity.fulfilled,
      (state, action) => {
        state.requests.bulkUpload.inProgress = false;
        state.requests.bulkUpload.success = true;
        state.requests.bulkUpload.error = "";

        if (action.payload.data) {
          state.purchasedElectricitySubmissions = [
            ...state.purchasedElectricitySubmissions,
            ...action.payload.data,
          ];
        }
      }
    );
  },
});

export const { clearPurchasedElectricitySubmissionSuccess } =
  purchasedElectricitySubmissionSlice.actions;

// Change this selector to match the store structure
export const selectPurchasedElectricitySubmissionState = (state) =>
  state.defraPurchasedElectricitySubmissions;  // Changed from state.purchasedElectricitySubmissions

export default purchasedElectricitySubmissionSlice.reducer;
