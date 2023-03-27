import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "User",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
    },
    registrationStart: (state) => {
      state.isFetching = true;
    },
    registrationSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    registrationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateStart: (state) => {
      state.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    updateFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    proPicStart: (state) => {
      state.isFetching = true;
    },
    proPicSuccess: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
    },
    proPicFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registrationStart,
  registrationSuccess,
  registrationFailure,
  updateSuccess,
  updateStart,
  updateFailure,
  proPicFailure,
  proPicStart,
  proPicSuccess,
} = userReducer.actions;
export default userReducer.reducer;
