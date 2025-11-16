import { NavLink } from 'react-router';
import { Tab } from '@mui/material';

export interface LinkTabProps {
  label: string;
  to: string;
  selected?: boolean;
}

export const LinkTab = (props: LinkTabProps) => {
  return (
    <Tab
      component={NavLink}
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
};
