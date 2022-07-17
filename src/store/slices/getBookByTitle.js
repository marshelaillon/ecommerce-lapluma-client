import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const host = 'http://localhost';
const port = '3001';

export const bookByTitleSlice = createSlice({
  name: 'bookByTitle',
  initialState: {
    book: [],
  },
  reducers: {
    setBookByTitle: (state, action) => {
      state.book = action.payload;
    },
  },
});

export default bookByTitleSlice.reducer;
export const { setBookByTitle } = bookByTitleSlice.actions;

export const fetchBookByTitle = title => async dispatch => {
  try {
    const response = await axios.get(`${host}:${port}/api/book/${title}`);
    dispatch(setBookByTitle([...response.data]));
  } catch (error) {
    console.log(error.message);
  }
};
