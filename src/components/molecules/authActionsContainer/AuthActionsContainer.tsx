import { type ReactNode } from 'react';
import { Box } from '@mui/material';

interface AuthActionsContainerProps {
  children: ReactNode;
}

export const AuthActionsContainer = ({
  children,
}: AuthActionsContainerProps) => {
  return (
    <Box
      sx={(theme) => ({
        maxWidth: 220,
        margin: `${theme.spacing(5)} auto 0`,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
      })}
    >
      {children}
    </Box>
  );
};
