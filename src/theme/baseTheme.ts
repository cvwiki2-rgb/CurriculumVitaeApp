import { createTheme } from '@mui/material/styles';
import { primary, secondary } from './palette';

export const baseTheme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary,
    secondary,
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

export const muiCssBaseline = {
  html: {
    height: '100%',
    scrollbarWidth: 'thin',
  },
  '#root': {
    height: '100%',
  },
  body: {
    height: '100%',
  },
  '::-webkit-scrollbar': {
    width: '2px',
    height: '2px',
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgb(189, 189, 189)',
  },
};
