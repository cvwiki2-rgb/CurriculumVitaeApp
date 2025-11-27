import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useReactiveVar } from '@apollo/client/react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import { Menu, Divider } from '@mui/material';
import { authVar, clearAuth } from '../../../graphql/state/auth';
import { UserMenuItem } from '../../molecules/userMenuItem';

export interface UserMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const UserMenu = ({ anchorEl, onClose }: UserMenuProps) => {
  const navigate = useNavigate();
  const auth = useReactiveVar(authVar);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();

  const handleLogoutClick = () => {
    clearAuth();
    navigate('/auth/login');
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      slotProps={{
        paper: {
          sx: {
            minWidth: 200,
            backdropFilter: 'none',
            backgroundImage: 'none',
          },
        },
      }}
    >
      <UserMenuItem
        icon={<AccountCircle fontSize="small" />}
        label={t('sidebar.menu.profile')}
        to={`/users/${auth?.user.profile.id}`}
      />
      <UserMenuItem
        icon={<Settings fontSize="small" />}
        label={t('sidebar.menu.settings')}
        to="/settings"
      />

      <Divider />

      <UserMenuItem
        icon={<Logout fontSize="small" />}
        label={t('sidebar.menu.logout')}
        onClick={handleLogoutClick}
      />
    </Menu>
  );
};
