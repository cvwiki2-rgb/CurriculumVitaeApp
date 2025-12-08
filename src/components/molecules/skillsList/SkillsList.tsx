import type { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { SkillItem } from '../skillItem';

export interface SkillsListProps {
  title: string;
  children: ReactElement<typeof SkillItem>[];
}

export const SkillsList = ({ title, children }: SkillsListProps) => {
  return (
    <Box component="div">
      <Typography variant="body1">{title}</Typography>
      <Box
        component="div"
        sx={(theme) => {
          return {
            marginTop: '16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            [theme.breakpoints.down('md')]: {
              gridTemplateColumns: '1fr 1fr',
            },
            [theme.breakpoints.down('sm')]: {
              gridTemplateColumns: '1fr',
            },
          };
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
