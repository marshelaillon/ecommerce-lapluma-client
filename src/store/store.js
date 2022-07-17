import { configureStore } from '@reduxjs/toolkit';
//import { createLogger } from 'redux-logger';
import genreReducer from './slices/genre.js';
import categoryReducer from './slices/category.js';
import isUserAuthReducer from './slices/isUserAuth';
import allBooksReducer from './slices/getAllBooks';
import getBookByTitle from './slices/getBookByTitle';
import allUsersReducer from './slices/getAllUsers';

// middleware
//const logger = createLogger();

export default configureStore({
  reducer: {
    genre: genreReducer,
    category: categoryReducer,
    allBooks: allBooksReducer,
    bookByTitle: getBookByTitle,
    isUserAuth: isUserAuthReducer,
    allUsers: allUsersReducer,
  },
  //middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
