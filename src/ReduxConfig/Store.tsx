import { configureStore } from '@reduxjs/toolkit';
import CreatedSlices from './Slices'
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserSlice from './UserDetails/UserSlice';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import locationSlice from './Location/locationSlice';
import userLocationSlice from './UserLocationSlice';
import rideIdSliceToCancel from './RideIdSlice';
import vehicleGifSlice from './VehicleGifSlice';
import notificationCountSlice from './NotificationCountSlice';
import rideStatusSlice from './RideStatusSlice';
export type RootState = ReturnType<typeof store.getState>;

const valuePersistConfig = {
    key: 'value',
    storage: AsyncStorage,
};
const userDetailsPersistConfig = {
    key: 'userDetails',
    storage: AsyncStorage
};
const userdataPersistConfig = {
    key: 'userData',
    storage: AsyncStorage
};

const USERID_PersistConfig = {
    key: 'USERID_',
    storage: AsyncStorage,
};

const user_IDPersistConfig = {
    key: 'REGISTER_TOKEN',
    storage: AsyncStorage
};
const location_PersistConfig = {
    key: 'LOCATIONS',
    storage: AsyncStorage
};
const location_PersistConfigAddress = {
    key: 'ADDRESS',
    storage: AsyncStorage
};
const Ride_PersistConfig = {
    key: 'LOCATIONS',
    storage: AsyncStorage
};



const persisteduserDataReducer = persistReducer(userdataPersistConfig, CreatedSlices);
const persistedUserDetailsReducer = persistReducer(userDetailsPersistConfig, UserSlice);
const persistedUser_IDReducer = persistReducer(user_IDPersistConfig, CreatedSlices);
const persistedValueReducer = persistReducer(valuePersistConfig, CreatedSlices);
const persistedUSERID_Reducer = persistReducer(USERID_PersistConfig, CreatedSlices);
const persistedLOCATIONReducer = persistReducer(location_PersistConfig, locationSlice);
const persistedLOCATIONReducerAddress = persistReducer(location_PersistConfigAddress, locationSlice);
const persistedRIDEReducer = persistReducer(Ride_PersistConfig, locationSlice);

const persistedRootReducer = combineReducers({
    value: persistedValueReducer,
    userDetails: persistedUserDetailsReducer,
    REGISTER_TOKEN: persistedUser_IDReducer,
    USERID_: persistedUSERID_Reducer,
    userData: persisteduserDataReducer,
    locationSelector: persistedLOCATIONReducer,
    locationSelectorAddress: persistedLOCATIONReducerAddress,
    rideDetailsSelector: persistedRIDEReducer,
    userLocationSlice: userLocationSlice,
    rideIdSliceToCancel: rideIdSliceToCancel,
    vehicleGifSlice: vehicleGifSlice,
    notificationCountSlice: notificationCountSlice,
    rideStatusSlice: rideStatusSlice
});


export const store = configureStore({

    reducer: persistedRootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable the serializableCheck middleware
        }),

})


export const persistor = persistStore(store);



