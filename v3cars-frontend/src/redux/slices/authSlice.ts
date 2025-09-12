import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface AuthState {
  isLogin: boolean;
}

// Initial state
const initialState: AuthState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
});

// Export actions and reducer
export const { setLogin, logout } = authSlice.actions;
export default authSlice.reducer;
