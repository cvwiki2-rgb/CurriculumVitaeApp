import { type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface AuthPageLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthPageLayout = ({
  title,
  subtitle,
  children,
}: AuthPageLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 560,
        width: '90%',
        height: 'calc(100vh - 56px)',
        margin: ' 0px auto',
        '& .MuiTypography-h4': {
          marginBottom: (theme) => theme.spacing(3),
        },
        '& .MuiTypography-body1': {
          marginBottom: (theme) => theme.spacing(5),
        },
        '& .MuiTextField-root': {
          marginBottom: (theme) => theme.spacing(2.5),
        },
      }}
      component="form"
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: 'center',
        }}
      >
        {subtitle}
      </Typography>
      {children}
    </Box>
  );
};
