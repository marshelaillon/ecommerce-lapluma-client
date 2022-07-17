import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const host = 'http://localhost';
const port = '3001';

export const genresSlice = createSlice({
  name: 'genre',
  initialState: {
    genre: [],
  },
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
  },
});

export default genresSlice.reducer;
export const { setGenre } = genresSlice.actions;

// Async thunk
export const fetchBooksByGenre = genre => async dispatch => {
  try {
    const response = await axios.get(`${host}:${port}/api/genre/${genre}`);
    dispatch(setGenre(response.data));
  } catch (error) {
    console.log(error.message);
  }
};
