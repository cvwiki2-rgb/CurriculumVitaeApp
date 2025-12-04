import { Autocomplete, Popper, Fade } from '@mui/material';
import { StyledInput } from '../../atoms/styledInput';

interface GroupedSelectProps<T> {
  value: T | null;
  options: readonly T[];
  onChange: (option: T | null) => void;
  groupBy: (option: T) => string;
  getOptionLabel: (option: T) => string;
  label?: string;
  disabled?: boolean;
}

export const GroupedSelect = <T,>({
  value,
  options,
  onChange,
  groupBy,
  getOptionLabel,
  label,
  disabled,
}: GroupedSelectProps<T>) => {
  return (
    <Autocomplete
      options={options}
      groupBy={groupBy}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={(e, val) => onChange(val || null)}
      disabled={disabled}
      renderInput={(params) => (
        <StyledInput {...params} label={label} margin="normal" />
      )}
      slots={{
        popper: (props) => {
          const { children, ...other } = props;
          return (
            <Popper {...other}>
              <Fade in timeout={280}>
                {/* @ts-expect-error — MUI Popper children type is incompatible */}
                <div>{children}</div>
              </Fade>
            </Popper>
          );
        },
      }}
      slotProps={{
        paper: {
          sx: (theme) => {
            return {
              backgroundColor: theme.palette.menu.background,
              '& .MuiAutocomplete-option': {
                paddingLeft: '24px',
                '&.Mui-focused': {
                  backgroundColor: theme.palette.action.hover,
                },
              },
            };
          },
          elevation: 8,
        },
        listbox: {
          sx: (theme) => {
            return {
              padding: options.length ? '8px 0' : 0,
              '& .MuiAutocomplete-groupLabel': {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.background.default,
              },
            };
          },
        },
      }}
    />
  );
};
