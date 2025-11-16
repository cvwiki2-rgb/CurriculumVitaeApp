import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import GroupIcon from '@mui/icons-material/Group';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import TranslateIcon from '@mui/icons-material/Translate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Box, IconButton, Avatar, Typography } from '@mui/material';
import { MyButton } from '../../atoms/myButton';
import { SidebarItem } from '../../molecules/sidebarItem';

const menu = [
  { label: 'Employees', icon: <GroupIcon />, to: '/users' },
  { label: 'Skills', icon: <TrendingUpIcon />, to: '/skills' },
  { label: 'Languages', icon: <TranslateIcon />, to: '/languages' },
  { label: 'CVs', icon: <ContactPageOutlinedIcon />, to: '/cvs' },
];

export const Sidebar: React.FC = () => {
  return (
    <Box
      component="aside"
      sx={{
        gridArea: 'navigation',
        width: '200px',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '44px',
        paddingBottom: '16px',
        overflowX: 'hidden',
      }}
    >
      <Box
        component="nav"
        sx={{
          width: '100%',
          display: 'grid',
          gap: '14px',
          marginBottom: 'auto',
        }}
      >
        {menu.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </Box>

      <MyButton
        variant="text"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: 56,
          width: '100%',
          minWidth: 56,
          padding: '0 8px',
          borderRadius: '0 200px 200px 0',
          textTransform: 'none',
          transition:
            'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: 'var(--sidebar-user-hover-bg) !important',
          },
        }}
      >
        <Avatar
          sx={{
            backgroundColor: 'var(--sidebar-user-avatar-bg)',
            color: 'var(--sidebar-user-avatar-color)',
            textTransform: 'uppercase',
          }}
        >
          S
        </Avatar>

        <Typography
          variant="body1"
          sx={{
            ml: 1,
            flex: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            color: 'var(--sidebar-user-text)',
          }}
        >
          selukdiana@gmail.com
        </Typography>
      </MyButton>

      <IconButton
        sx={{
          color: 'var(--sidebar-collapse-icon-color)',
          margin: '14px 0 0 8px',
          padding: 1,
          fontSize: '1.5rem',
          transition: 'background-color .15s cubic-bezier(0.4,0,0.2,1)',
          alignSelf: 'flex-start',
          '&:hover': {
            backgroundColor: 'var(--sidebar-collapse-hover-bg)',
          },
        }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
    </Box>
  );
};
