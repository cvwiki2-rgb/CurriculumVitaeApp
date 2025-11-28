import type { ReactElement } from 'react';
import { Link } from 'react-router';
import { MenuItem, ListItemIcon } from '@mui/material';

export interface UserMenuItemProps {
  icon: ReactElement;
  label: string;
  to?: string;
  onClick?: () => void;
}

export const UserMenuItem = ({
  icon,
  label,
  to,
  onClick,
}: UserMenuItemProps) => {
  return (
    <MenuItem component={to ? Link : 'li'} to={to} onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      {label}
    </MenuItem>
  );
};
