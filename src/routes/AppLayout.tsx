import { Outlet } from 'react-router';
import { Box, Container } from '@mui/material';
import { Header } from '../components/organisms/header';
import { Sidebar } from '../components/organisms/sidebar';

export const AppLayout = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: ' grid',
        gridTemplate: '"navigation page" 1fr / max-content 1fr',
        '@media (max-width:768px)': {
          gridTemplate: '"page" 1fr "navigation" max-content / 1fr',
        },
      }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{ width: '100%', gridArea: 'page', overflowY: 'scroll' }}
      >
        <Container
          maxWidth="xl"
          sx={(theme) => {
            return {
              paddingLeft: '16px',
              paddingRight: '16px',
              [theme.breakpoints.up('md')]: {
                paddingLeft: '24px',
                paddingRight: '24px',
              },
            };
          }}
        >
          <Header />
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
