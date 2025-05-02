import { API } from '../../services';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { endpoints } from '../../app/Helpers/Endpoints'
const initialState = {
    stationaryCombustion: [],
    mobileCombustion: [],
    fugitiveCombustion: [],
    purchaseElectricity: [],
    purchaseHeatCooling: [],
    purchaseGoodsService: [],
    useOfSoldProducts: [],
    endOfLifeTreatment: [],
    upstreamLeasedAssets: [],
    downstreamLeasedAssets: [],
    investments: [],
    capitalGoods: [],
    fuelEnergy: [],
    upstreamTransports: [],
    downstreamTransports: [],
    businessTravel: [],
    employeeCommute: [],
    wasteGenerated: [],
    requests: {
        getHistory: { success: false, error: '', inProgress: false },
    },
};


export const history = createAsyncThunk(
    'history/getHistory',
    async (data, { fulfillWithValue, rejectWithValue }) => {
        const { calculationMethod, emissionFactor } = data;
        try {
            const res = await API.get(endpoints.historyAccordingToScope(calculationMethod, emissionFactor));
            return fulfillWithValue(res.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Getting Data failed for ' + emissionFactor;
            return rejectWithValue(errorMessage);
        }
    },
);


export const historySlice = createSlice({
    name: 'history',
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
        builder.addCase(history.pending, state => {
            state.requests.getHistory.inProgress = true;
        });
        builder.addCase(history.rejected, (state, action) => {
            state.requests.getHistory.error = action.payload;
            state.requests.getHistory.inProgress = false;
        });
        builder.addCase(history.fulfilled, (state, action) => {
            state.requests.getHistory.inProgress = false;
            state.requests.getHistory.success = true;
            state[action.payload.emissionFactor] = action.payload.data;
        });

    },
});




export const { updateData } = historySlice.actions;

export const selecthistoryState = (state) => state.history;
export default historySlice.reducer;
