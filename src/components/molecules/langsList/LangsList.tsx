import type { ReactElement } from 'react';
import { Box } from '@mui/material';
import type { LangItem } from '../langItem';

export interface LangsListProps {
  children: ReactElement<typeof LangItem>[];
}

export const LangsList = ({ children }: LangsListProps) => {
  return (
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
  );
};
