import { createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/environment';
import axios from 'axios';
const host = 'http://localhost';
const port = '3001';

export const categoriesSlice = createSlice({
  name: 'category',
  initialState: {
    category: [],
  },
  reducers: {
    setBooksByCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export default categoriesSlice.reducer;
export const { setBooksByCategory } = categoriesSlice.actions;

export const fetchBooksByCategory = category => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URL}/category/${category}`);
    dispatch(setBooksByCategory(response.data));
  } catch (error) {
    console.log(error.message);
  }
};
