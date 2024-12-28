// src/features/rideStatusSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RideState {
    status: string;
}

const initialState: RideState = {
    status: "Ride Started",
};

const rideStatusSlice = createSlice({
    name: 'rideStatus',
    initialState,
    reducers: {
        setRideStatus(state, action: PayloadAction<string>) {
            state.status = action.payload;
        },
    },
});

export const { setRideStatus } = rideStatusSlice.actions;

export default rideStatusSlice.reducer;
