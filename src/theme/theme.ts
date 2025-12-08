import { createTheme } from '@mui/material/styles';
import { baseTheme, muiCssBaseline } from './baseTheme';
import { lightPalette, darkPalette } from './palette';

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    ...lightPalette,
    mode: 'light',
  },
  components: {
    ...baseTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        ...muiCssBaseline,
      },
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    ...darkPalette,
    mode: 'dark',
  },
  components: {
    ...baseTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        ...muiCssBaseline,
      },
    },
  },
});
