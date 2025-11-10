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
    primary: '#fff',
    secondary: '#b0b0b0',
  },
  action: {
    hover: alpha('#fff', 0.08),
    disabled: alpha('#fff', 0.3),
    disabledBackground: alpha('#fff', 0.12),
  },
};

export const theme = createTheme({
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
  ...theme,
  palette: {
    mode: 'dark',
    ...darkPalette,
  },
});
