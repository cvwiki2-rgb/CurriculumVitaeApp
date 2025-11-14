import { createTheme, alpha } from '@mui/material/styles';

const primary = {
  main: '#c63031',
  contrastText: '#fff',
};

const secondary = {
  main: '#767676',
  contrastText: '#fff',
};

const lightPalette = {
  primary,
  secondary,
  text: {
    secondary: '#2E2E2E',
  },
  action: {
    hover: alpha('#000', 0.04),
    disabled: alpha('#000', 0.26),
    disabledBackground: alpha('#000', 0.12),
  },
};

const darkPalette = {
  primary,
  secondary,
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    secondary: '#f5f5f7',
  },
  action: {
    hover: alpha('#fff', 0.08),
    disabled: alpha('#fff', 0.3),
    disabledBackground: alpha('#fff', 0.12),
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...lightPalette,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'secondary',
      },
    },
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  palette: {
    mode: 'dark',
    ...darkPalette,
  },
});
