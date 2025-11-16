import { type ReactNode } from 'react';
import { NavLink } from 'react-router';
import { Box } from '@mui/material';

export interface SidebarItemProps {
  to: string;
  icon: ReactNode;
  label: string;
}

export const SidebarItem = ({ to, icon, label }: SidebarItemProps) => {
  return (
    <Box
      component={NavLink}
      to={to}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height: 56,
        padding: '9px 16px',
        borderTopRightRadius: 200,
        borderBottomRightRadius: 200,
        textDecoration: 'none',
        overflow: 'hidden',
        color: 'var(--sidebar-item-color)',
        transition: 'background 200ms, color 200ms',
        '&:hover': {
          backgroundColor: 'var(--sidebar-item-active-bg)',
        },
        '&.active': {
          color: 'var(--sidebar-item-active-color)',
          backgroundColor: 'var(--sidebar-item-active-bg)',
        },
        '@media (max-width:768px)': {
          justifyContent: 'center',
          height: '40px',
          borderRadius: '200px',
          padding: '4px 8px',
          '&:not(:nth-of-type(-n+3))': {
            display: 'none',
          },
        },
      }}
    >
      {icon}

      <Box
        component="span"
        sx={{
          flex: 1,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          '@media (max-width:768px)': {
            display: 'none',
          },
        }}
      >
        {label}
      </Box>
    </Box>
  );
};
