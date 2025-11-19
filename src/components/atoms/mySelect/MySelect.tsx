import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectProps } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

export const MySelectRoot = styled(Select)<SelectProps>(({ theme }) => ({
  borderRadius: 0,
  minHeight: 44,
  fontSize: '0.95rem',
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(
    ['border-color', 'box-shadow', 'background-color'],
    { duration: theme.transitions.duration.short },
  ),

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0,0,0,0.12)',
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}22`,
  },

  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.text.disabled,
  },

  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.error.main,
  },

  '&.MuiInputBase-sizeSmall': {
    minHeight: 36,
    fontSize: '0.875rem',
  },
}));

type MySelectProps = SelectProps & {
  label?: string;
  helperText?: string;
};

export function MySelect({
  label,
  helperText,
  error,
  fullWidth,
  ...rest
}: MySelectProps) {
  const id = rest.id ?? (label ? `${label}-select` : undefined);

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      variant="outlined"
      size={rest.size}
    >
      {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}

      <MySelectRoot
        labelId={label ? `${id}-label` : undefined}
        id={id}
        label={label}
        error={error}
        {...rest}
      />

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default MySelect;
