import { API } from '../../services';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from '../../app/Helpers/Endpoints'
const initialState = {
    analyticsCE: [],
    requests: {
        analyticsCE: { success: false, error: '', inProgress: false },
    },
};

export const getCategoryBasedEmissions = createAsyncThunk(
    'analytics/getCategoryBasedEmissions',
    async (data, { fulfillWithValue, rejectWithValue }) => {
        const { startDate, endDate } = data;
        try {
            const res = await API.get(endpoints.analyticsCategoryEmissions(startDate, endDate));
            return fulfillWithValue(res.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Getting Data failed';
            return rejectWithValue(errorMessage);
        }
    }
);


export const analyticsCESlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        updateData: (state, action) => {
            // const { payload } = action;
            // state.history.isLoggedIn = payload;
        },
    },
    extraReducers: builder => {
        // builder.addCase(HYDRATE, (state, action) => {
        //   return {
        //     ...state,
        //     ...action.payload.app,
        //   };
        // });
        builder.addCase(getCategoryBasedEmissions.pending, state => {
            state.requests.analyticsCE.inProgress = true;
        });
        builder.addCase(getCategoryBasedEmissions.rejected, (state, action) => {
            state.requests.analyticsCE.error = action.payload;
            state.requests.analyticsCE.inProgress = false;
        });
        builder.addCase(getCategoryBasedEmissions.fulfilled, (state, action) => {
            state.requests.analyticsCE.inProgress = false;
            state.requests.analyticsCE.success = true;
            state.analyticsCE = action.payload;
        });

    },
});




export const { updateData } = analyticsCESlice.actions;

export const selectAnalyticsCEState = (state) => state.analytics;
export default analyticsCESlice.reducer;
