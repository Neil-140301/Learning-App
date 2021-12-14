import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: { theme: themeReducer },
  middleware: [thunk],
});
