import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../../utils/environment';
import axios from 'axios';
const host = 'http://localhost';
const port = '3001';

export const allBooksSlice = createSlice({
  name: 'allBooks',
  initialState: {
    books: [],
  },
  reducers: {
    setAllBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

export default allBooksSlice.reducer;
export const { setAllBooks } = allBooksSlice.actions;

export const fetchAllBooks = () => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    dispatch(setAllBooks(response.data));
  } catch (error) {
    console.log(error.message);
  }
};
