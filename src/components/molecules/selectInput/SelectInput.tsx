import type { ReactElement } from 'react';
import { MenuItem } from '@mui/material';
import { StyledInput } from '../../atoms/styledInput';

interface SelectInputProps<T> {
  value: T;
  onChange: (value: T) => void;
  label?: string;
  disabled?: boolean;
  children?: ReactElement<typeof MenuItem>[];
}

export const SelectInput = <T,>({
  value,
  onChange,
  label,
  disabled,
  children,
}: SelectInputProps<T>) => {
  return (
    <StyledInput
      select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      label={label}
      fullWidth
      margin="normal"
      disabled={disabled}
      slotProps={{
        select: {
          MenuProps: {
            PaperProps: {
              sx: { backgroundColor: (theme) => theme.palette.menu.background },
            },
          },
        },
      }}
    >
      {children}
    </StyledInput>
  );
};
