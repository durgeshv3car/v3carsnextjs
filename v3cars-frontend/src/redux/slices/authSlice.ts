import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type
interface User {
  userId: number;
  username: string;
  displayName: string;
  mobilenumber: string;
  emailAddress: string;
  status?: number;
}

interface AuthState {
  isLogin: boolean;
  user: User | null;
}

// Initial state
const initialState: AuthState = {
  isLogin: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<User>) => {
      state.isLogin = true;
      state.user = action.payload;
    },

    logout: (state) => {
      state.isLogin = false;
      state.user = null;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

// Export actions and reducer
export const { setLogin, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
