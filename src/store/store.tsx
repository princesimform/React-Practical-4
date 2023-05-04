import { configureStore, createSlice } from "@reduxjs/toolkit";
import userDataList from "../data/userData";
import { ProfileData } from "../data/userData";
import { userDataType } from "../interface/userDataType";

export interface RootState {
  hoverSlice: { isHovering: boolean };
  userSlice: { users: userDataType[] };
  profileSlice: { profile: userDataType };
}

const HoverinitialState = {
  isHovering: false,
};
const userListInitalState = {
  users: userDataList,
};
const ProfileInitalState = {
  profile: ProfileData,
};

export const hoverSlice = createSlice({
  name: "hoverSlice",
  initialState: HoverinitialState,
  reducers: {
    changeHovering(state, action) {
      state.isHovering = action.payload;
    },
  },
});
export const userSlice = createSlice({
  name: "userSlice",
  initialState: userListInitalState,
  reducers: {},
});
export const profileSlice = createSlice({
  name: "profileSlice",
  initialState: ProfileInitalState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
  },
});

export const hoverActions = hoverSlice.actions;
export const userActions = userSlice.actions;
export const profileAction = profileSlice.actions;

const store = configureStore({
  reducer: {
    hoverSlice: hoverSlice.reducer,
    userSlice: userSlice.reducer,
    profileSlice: profileSlice.reducer,
  },
});

export default store;
