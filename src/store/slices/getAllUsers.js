import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const host = 'http://localhost';
const port = '3001';

export const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {
    users: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default allUsersSlice.reducer;
export const { setAllUsers } = allUsersSlice.actions;

export const fetchAllUsers = () => async dispatch => {
  try {
    const response = await axios.get(`${host}:${port}/api/users`);
    dispatch(setAllUsers(response.data));
  } catch (error) {
    console.log(error.message);
  }
};