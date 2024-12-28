import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface vehicleGifState {
    vehicleGif: string | null;
}

const initialState: vehicleGifState = {
    vehicleGif: null,
};

const vehicleGifSlice = createSlice({
    name: 'gif',
    initialState,
    reducers: {
        setVehicleGif: (state, action: PayloadAction<string | null>) => {
            state.vehicleGif = action.payload;
        }
    },
});

export const { setVehicleGif } = vehicleGifSlice.actions;
export default vehicleGifSlice.reducer;
