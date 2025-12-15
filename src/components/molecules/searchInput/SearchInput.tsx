import type { ChangeEvent } from 'react';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import { StyledInput } from '../../atoms/styledInput';

export interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
}

export const SearchInput = ({
  value,
  onChange,
  handleClear,
}: SearchInputProps) => {
  return (
    <StyledInput
      variant="outlined"
      placeholder="Поиск"
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ margin: 0 }}>
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end" sx={{ margin: 0 }}>
            <IconButton
              size="medium"
              onClick={handleClear}
              aria-label="Очистить"
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      autoComplete="name"
      sx={(theme) => {
        return {
          width: '50%',
          maxWidth: '320px',
          [theme.breakpoints.down('md')]: {
            width: '100%',
          },
          [theme.breakpoints.down('sm')]: {
            width: '70%',
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '40px',
            height: '40px',
            minHeight: '40px',
          },
          '& .MuiInputBase-input': {
            textOverflow: 'ellipsis',
            paddingLeft: '10px',
            height: 'auto',
          },
        };
      }}
    />
  );
};
