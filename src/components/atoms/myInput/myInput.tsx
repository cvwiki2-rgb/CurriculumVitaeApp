import { styled } from '@mui/material/styles';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

export const MyInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: 48,
    transition: theme.transitions.create(['border-color', 'box-shadow'], {
      duration: theme.transitions.duration.short,
    }),

    '& fieldset': {
      borderColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.23)'
          : 'rgba(0, 0, 0, 0.23)',
    },

    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },

    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
    },

    '&.Mui-disabled fieldset': {
      borderColor: theme.palette.action.disabledBackground,
    },

    '&.Mui-error fieldset': {
      borderColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.23)'
          : 'rgba(0, 0, 0, 0.23)',
    },
  },

  '& .MuiInputBase-input': {
    padding: '10px 16px',
    fontSize: '0.875rem',
  },
}));
