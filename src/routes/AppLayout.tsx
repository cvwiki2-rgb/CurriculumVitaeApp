import { Outlet } from 'react-router';
import { Box, Switch } from '@mui/material';
import { Header } from '../components/organisms/header';
import { Sidebar } from '../components/organisms/sidebar';
import { useAppTheme } from '../context/ThemeContext';

export const AppLayout = () => {
  const { toggleTheme, mode } = useAppTheme();
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
        <Header />
        <Switch checked={mode === 'dark'} onChange={toggleTheme} />
        <Outlet />
      </Box>
    </Box>
  );
};
