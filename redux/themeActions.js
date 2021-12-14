import { lightTheme, darkTheme } from '../constants';
import {
  toggleThemeStart,
  toggleThemeSuccess,
  toggleThemeFailure,
} from './themeSlice';

// export const TOGGLE_THEME_START = 'TOGGLE_THEME_START';
// export const TOGGLE_THEME_SUCCESS = 'TOGGLE_THEME_SUCCESS';
// export const TOGGLE_THEME_FAILURE = 'TOGGLE_THEME_FAILURE';

// export const toggleThemeStart = () => ({
//   type: TOGGLE_THEME_START,
// });

// export const toggleThemeSuccess = (selectedTheme) => ({
//   type: TOGGLE_THEME_SUCCESS,
//   payload: { selectedTheme },
// });

// export const toggleThemeFailure = (error) => ({
//   type: TOGGLE_THEME_FAILURE,
//   payload: { error },
// });

// export const toggleTheme = (themeType) => {
//   return (dispatch) => {
//     dispatch(toggleThemeStart());

//     switch (themeType) {
//       case 'dark':
//         dispatch(toggleThemeSuccess(darkTheme));
//         break;
//       case 'light':
//         dispatch(toggleThemeSuccess(lightTheme));
//         break;
//       default:
//         dispatch(toggleThemeFailure({ error: 'Invalid Theme Type' }));
//         break;
//     }
//   };
// };

export const toggleTheme = (themeType, dispatch) => {
  dispatch(toggleThemeStart());

  switch (themeType) {
    case 'dark':
      dispatch(toggleThemeSuccess({ selectedTheme: darkTheme }));
      break;
    case 'light':
      dispatch(toggleThemeSuccess({ selectedTheme: lightTheme }));
      break;
    default:
      dispatch(toggleThemeFailure({ error: 'Invalid Theme Type' }));
      break;
  }
};
