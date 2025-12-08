import { LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { StyledButton } from '../../atoms/styledButton';
import type { Mastery } from 'cv-graphql';

interface SkillItemProps {
  mastery: Mastery;
  label: string;
  readOnly?: boolean;
  deleteMode?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
  onClick: () => void;
}

export const SkillItem = ({
  mastery,
  label,
  readOnly,
  deleteMode,
  selected,
  onToggleSelect,
  onClick,
}: SkillItemProps) => {
  const theme = useTheme();
  const { bar, track, value } =
    theme.palette.mastery[selected ? 'Novice' : mastery];

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
      <LinearProgress
        variant="determinate"
        value={selected ? 0 : value}
        sx={{
          width: '100%',
          backgroundColor: track,
          opacity: 0.9,
          '& .MuiLinearProgress-bar': {
            backgroundColor: bar,
          },
        }}
      />
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
