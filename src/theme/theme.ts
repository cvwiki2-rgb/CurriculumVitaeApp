import { createTheme } from '@mui/material/styles';
import { baseTheme } from './baseTheme';
import { lightCssVars, darkCssVars } from './cssVars';
import { lightPalette, darkPalette } from './palette';

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    ...lightPalette,
    action: {
      hover: 'rgb(0 0 0 / 4%)',
      disabled: 'rgb(0 0 0 / 26%)',
      disabledBackground: 'rgb(0 0 0 / 12%)',
    },
    mode: 'light',
  },

  components: {
    ...baseTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        ':root': lightCssVars,
      },
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    ...darkPalette,
    action: {
      hover: 'rgb(255 255 255 / 8%)',
      disabled: 'rgb(255 255 255 / 30%)',
      disabledBackground: 'rgb(255 255 255 / 12%)',
    },
    mode: 'dark',
  },
  components: {
    ...baseTheme.components,
    MuiCssBaseline: {
      styleOverrides: {
        ':root': darkCssVars,
      },
    },
  },
});
