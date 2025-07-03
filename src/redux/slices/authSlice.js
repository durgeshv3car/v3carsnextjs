import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false, // Default state for login
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload; // Set login status (true or false)
    },
    logout: (state) => {
      state.isLogin = false; // Reset login status on logout
    },
  },
});

export const { setLogin, logout } = authSlice.actions;

export default authSlice.reducer;
