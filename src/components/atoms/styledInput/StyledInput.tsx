import { styled } from '@mui/material/styles';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

export const StyledInput = styled(TextField)<TextFieldProps>(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';

  return {
    '& .MuiInputBase-root': {
      borderRadius: 0,
      minHeight: 44,
      height: 48,
      padding: 12,
      fontSize: '0.95rem',
      transition: theme.transitions.create(
        ['border-color', 'box-shadow', 'background-color'],
        {
          duration: theme.transitions.duration.short,
        },
      ),
    },

    '& .MuiInputBase-input': {
      padding: 0,
      height: '100%',
      boxSizing: 'border-box',
    },

    '& .MuiInputLabel-root': {
      left: 12,
      top: '24px',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
      transition: theme.transitions.create(['transform', 'color', 'top'], {
        duration: theme.transitions.duration.shorter,
      }),
    },

    '& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled':
      {
        top: 0,
        transform: 'translateY(-9px) scale(0.75)',
        left: 12,
      },

    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.primary.main,
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: isDark
          ? 'rgba(255, 255, 255, 0.23)'
          : 'rgba(0, 0, 0, 0.23)',

        borderWidth: 1,
        transition: theme.transitions.create(['border-color', 'border-width'], {
          duration: theme.transitions.duration.short,
        }),
      },

      '&:hover fieldset': {
        borderColor: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
      },

      '&.Mui-focused fieldset': {
        borderWidth: 1,
        borderColor: theme.palette.primary.main,
      },
    },

    '& .MuiFilledInput-root': {
      backgroundColor: theme.palette.action.hover,
      '&:hover': { backgroundColor: theme.palette.action.selected },
      '&.Mui-focused': { backgroundColor: theme.palette.background.paper },
    },

    '& .MuiInputBase-sizeSmall': {
      minHeight: 36,
      fontSize: '0.875rem',
    },

    '& .Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.main,
    },

    '& .Mui-disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.text.disabled,
    },

    '& .MuiFormHelperText-root': {
      margin: '3px 14px 0px',
      color: theme.palette.error.main,
      transition: theme.transitions.create(['opacity', 'color'], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }),
      opacity: 1,
    },

    '& .Mui-error .MuiFormHelperText-root': {
      opacity: 1,
    },
  };
});
