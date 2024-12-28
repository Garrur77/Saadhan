import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import moment, { Moment } from 'moment';
import { userData } from './UserDetails/UserSlice';

interface interfaceType {
  value: number;
  RegisterTOKEN: string;
  UserID: string,
  userData: any,
}

const initialStates: interfaceType = {

  value: 0,
  RegisterTOKEN: '',
  UserID: '',
  userData: '',
};

const CreatedSlices = createSlice({
  initialState: initialStates,
  name: 'counter',

  reducers: {

    saveUSERID: (UIDstate, action: PayloadAction<any>) => {
      UIDstate.UserID = action.payload;
    },
    saveValues: (state, action: PayloadAction<number>) => {
      // console.log('States saved', state);
      state.value = action.payload;
    },
    save_USER_ID: (state, action: PayloadAction<string>) => {
      // console.log('States saved', state);
      state.RegisterTOKEN = action.payload;
    },
    userDataInfo: (state, action: PayloadAction<string>) => {
      // console.log('States saved', state);
      state.userData = action.payload;
    }, setClearToken: (state, action: PayloadAction<string>) => {
      // console.log('States saved', state);
      state.RegisterTOKEN = "";
      state.userData = "";
      state.UserID = "";
    },



  },
});

export const {
  saveUSERID,
  userDataInfo,
  saveValues,
  save_USER_ID,
  // save_LOGIN_TOKEN,
  setClearToken
} = CreatedSlices.actions;

export default CreatedSlices.reducer;
