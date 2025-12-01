import { Outlet } from 'react-router';
import { Box } from '@mui/material';
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
        <Outlet />
      </Box>
    </Box>
  );
};
