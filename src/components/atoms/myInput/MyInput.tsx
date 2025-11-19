import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

export const MyInput = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: 0,
    minHeight: 44,
    paddingRight: 0,
    fontSize: '0.95rem',
    transition: theme.transitions.create(
      ['border-color', 'box-shadow', 'background-color'],
      {
        duration: theme.transitions.duration.short,
      },
    ),
  },

  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    '& fieldset': {
      borderColor: 'rgba(0,0,0,0.12)',
      borderWidth: 1,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}22`,
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
    marginLeft: 0,
    marginTop: 6,
  },
}));

export function PasswordInput(
  props: Omit<TextFieldProps, 'type'> & { showToggleAdornment?: boolean },
) {
  const { showToggleAdornment = true, ...rest } = props;
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible((v) => !v);

  return (
    <MyInput
      {...rest}
      type={visible ? 'text' : 'password'}
      InputProps={{
        endAdornment: showToggleAdornment ? (
          <InputAdornment position="end">
            <IconButton
              aria-label={visible ? 'Hide Password' : 'Show Password'}
              onClick={toggle}
              edge="end"
              size="large"
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : undefined,
        ...rest.InputProps,
      }}
    />
  );
}

export default MyInput;
