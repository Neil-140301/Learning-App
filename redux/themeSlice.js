import { createSlice } from '@reduxjs/toolkit';
import { selectedTheme } from '../constants';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    appTheme: selectedTheme,
    error: false,
  },
  reducers: {
    toggleThemeStart: (state) => {
      state.error = false;
    },
    toggleThemeSuccess: (state, action) => {
      state.appTheme = action.payload.selectedTheme;
      state.error = false;
    },
    toggleThemeFailure: (state) => {
      state.error = action.payload.error;
    },
  },
});

export const { toggleThemeSuccess, toggleThemeFailure, toggleThemeStart } =
  themeSlice.actions;
export default themeSlice.reducer;
