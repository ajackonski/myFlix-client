import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    deleteUser: (state) => {
      state.userInfo = null;
    },
    logoutUser: (state) => {
      state.userInfo = null; // Clear the user info on logout
      state.error = null; // Optionally, clear any errors as well
    },
  },
});

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  updateUserInfo,
  deleteUser,
  logoutUser, // Export logoutUser action
} = userSlice.actions;

export default userSlice.reducer;
