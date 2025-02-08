import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.email;
      state.error = null;
    },
    signup: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.email;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      // Clear localStorage on logout
      localStorage.removeItem('user');
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, signup, logout, setError } = authSlice.actions;
export default authSlice.reducer;