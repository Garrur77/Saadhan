import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RideState {
  rideId: string | null;
}

const initialState: RideState = {
  rideId: null,
};

const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    setRideId: (state, action: PayloadAction<string | null>) => {
      state.rideId = action.payload;
    }
  },
});

export const { setRideId } = rideSlice.actions;
export default rideSlice.reducer;
