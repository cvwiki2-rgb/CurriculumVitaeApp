import { LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { StyledButton } from '../../atoms/styledButton';
import type { Mastery } from '../../../types/skills';

interface SkillItemProps {
  mastery: Mastery;
  label: string;
  readOnly?: boolean;
  deleteMode?: boolean;
  selected?: boolean;
  onToggleSelect?: () => void;
}

export const SkillItem = ({
  mastery,
  label,
  readOnly,
  deleteMode,
  selected,
  onToggleSelect,
}: SkillItemProps) => {
  const theme = useTheme();
  const { bar, track, value } =
    theme.palette.mastery[selected ? 'Novice' : mastery];

  return (
    <StyledButton
      variant="text"
      disabled={!!readOnly && !deleteMode}
      onClick={deleteMode ? onToggleSelect : undefined}
      sx={{
        textTransform: 'none',
        display: 'grid',
        gridTemplateColumns: '0.5fr 1fr',
        gap: '16px',
        padding: '8px 16px',
        '&:hover': {
          backgroundColor: 'rgba(118, 118, 118, 0.08) !important',
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
