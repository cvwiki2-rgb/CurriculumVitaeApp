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
