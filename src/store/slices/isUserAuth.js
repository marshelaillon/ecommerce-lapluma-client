import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const host = 'http://localhost';
const port = '3001';

export const isUserAuthSlice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default isUserAuthSlice.reducer;
export const { setUser } = isUserAuthSlice.actions;
