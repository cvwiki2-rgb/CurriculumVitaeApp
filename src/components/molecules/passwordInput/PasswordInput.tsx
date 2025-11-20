import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, type TextFieldProps } from '@mui/material';
import { StyledInput } from '../../atoms/styledInput';

export const PasswordInput = (
  props: Omit<TextFieldProps, 'type'> & { showToggleAdornment?: boolean },
) => {
  const { showToggleAdornment = true, ...rest } = props;
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible((v) => !v);

  return (
    <StyledInput
      {...rest}
      type={visible ? 'text' : 'password'}
      InputProps={{
        endAdornment: showToggleAdornment ? (
          <InputAdornment position="end">
            <IconButton
              aria-label={visible ? 'Hide Password' : 'Show Password'}
              onClick={toggle}
              size="medium"
            >
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ) : undefined,
        ...rest.InputProps,
      }}
    />
  );
};
