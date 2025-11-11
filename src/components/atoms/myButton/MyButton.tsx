import Button, { type ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const MyButton = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: 'uppercase',
  fontWeight: 500,
  borderRadius: 40,
  minWidth: 220,
  height: 48,
  fontSize: '0.875rem',
  lineHeight: 1.75,
  letterSpacing: '0.0286em',
  transition: theme.transitions.create(
    ['background-color', 'box-shadow', 'border-color', 'color'],
    { duration: theme.transitions.duration.short },
  ),

  // === PRIMARY ===
  '&.MuiButton-containedPrimary': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': { backgroundColor: theme.palette.primary.dark },
    '&.Mui-disabled': {
      color: theme.palette.action.disabled,
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },

  '&.MuiButton-outlinedPrimary': {
    color: theme.palette.primary.main,
    borderColor: 'rgb(198 48 49 / 50%)',
    '&:hover': {
      backgroundColor: 'rgb(198 48 49 / 4%)',
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-disabled': {
      color: theme.palette.action.disabled,
      borderColor: theme.palette.action.disabledBackground,
    },
  },

  '&.MuiButton-textPrimary': {
    color: theme.palette.primary.main,
    '&:hover': { backgroundColor: 'rgb(198 48 49 / 4%)' },
    '&.Mui-disabled': {
      color: theme.palette.action.disabled,
      backgroundColor: 'rgb(198 48 49 / 4%)',
    },
  },

  // === SECONDARY ===
  '&.MuiButton-containedSecondary': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': { backgroundColor: theme.palette.secondary.dark },
    '&.Mui-disabled': {
      color: theme.palette.action.disabled,
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  '&.MuiButton-outlinedSecondary': {
    color: theme.palette.secondary.main,
    borderColor: 'rgb(118 118 118 / 50%)',
    '&:hover': {
      backgroundColor: 'rgb(118 118 118 / 4%)',
      borderColor: theme.palette.secondary.main,
    },
    '&.Mui-disabled': {
      color: theme.palette.action.disabled,
      borderColor: theme.palette.action.disabledBackground,
    },
  },
  '&.MuiButton-textSecondary': {
    color: theme.palette.secondary.main,
    '&:hover': { backgroundColor: 'rgb(118 118 118 / 4%)' },
    '&.Mui-disabled': {
      color: theme.palette.action.disabled,
      backgroundColor: 'rgb(118 118 118 / 4%)',
    },
  },
}));
