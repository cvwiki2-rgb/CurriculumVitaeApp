import { Typography } from '@mui/material';
import { StyledButton } from '../../atoms/styledButton';
import type { Proficiency } from 'cv-graphql';

interface LangItemProps {
  proficiency: Proficiency;
  label: string;
  readOnly?: boolean;
  deleteMode?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
  onClick: () => void;
}

export const LangItem = ({
  proficiency,
  label,
  readOnly,
  deleteMode,
  selected,
  onToggleSelect,
  onClick,
}: LangItemProps) => {
  return (
    <StyledButton
      variant="text"
      disabled={!!readOnly && !deleteMode}
      onClick={deleteMode ? onToggleSelect : onClick}
      sx={{
        cursor: 'pointer',
        textTransform: 'none',
        display: 'grid',
        gridTemplateColumns: '0.5fr 1fr',
        gap: '16px',
        padding: '8px 16px',
        '&:hover': {
          backgroundColor: (theme) => theme.palette.skillItem.action.hover,
        },
        '&.Mui-disabled': {
          backgroundColor: 'transparent !important',
        },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          textAlign: 'left',
          color: (theme) =>
            selected
              ? theme.palette.text.primary
              : theme.palette.proficiency[proficiency],
        }}
      >
        {proficiency}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'left',
          color: selected ? (theme) => theme.palette.text.primary : 'inherit',
        }}
      >
        {label}
      </Typography>
    </StyledButton>
  );
};
