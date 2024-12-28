import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface interfaceType {
  name: string;
  visitType: string;
  profileData: object;
  openModal:boolean
}

const initialStates: interfaceType = {
  name: "Hello",
  visitType: "",
  profileData: {},
  openModal:false
};

const UserDetailsSlice = createSlice({
  initialState: initialStates,
  name: "userDetails",
  reducers: {
    SavedUserDetails: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    UserVisited: (state, action: PayloadAction<string>) => {
      state.visitType = action.payload;
    },
    userData: (state, action: PayloadAction<object>) => {
      state.profileData = action.payload;
    },
    updateProfileImage: (state, action: PayloadAction<object>) => {
      state.profileData["profileImage"] = action.payload;
    },
    setClearData: (state, action: PayloadAction<object>) => {
      state.profileData = {}
    },
    setOpenModal:(state, action: PayloadAction<boolean>)=>{
      state.openModal = action.payload
    }
  },
});

export const { SavedUserDetails, UserVisited, userData, updateProfileImage, setClearData,setOpenModal } =
  UserDetailsSlice.actions;
export default UserDetailsSlice.reducer;
