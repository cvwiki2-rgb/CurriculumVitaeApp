import { useEffect, useState, type ElementType } from 'react';
import { useLocation } from 'react-router';
import { styled, Tabs, type SxProps } from '@mui/material';
import { LinkTab, type LinkTabProps } from '../../atoms/linkTab';

interface AppTabsProps {
  tabs: LinkTabProps[];
  sx?: SxProps;
  component?: ElementType;
  centered?: boolean;
}

const StyledTabs = styled(Tabs)(() => ({
  height: 56,
  paddingTop: 6,
  '.MuiTab-root.Mui-selected': {
    fontWeight: 600,
  },
  '.MuiTab-root': {
    textTransform: 'uppercase',
    fontWeight: 500,
    minWidth: 150,
    letterSpacing: '0.02857em',
  },
}));

export const AppTabs = ({ tabs, ...rest }: AppTabsProps) => {
  const location = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const index = tabs.findIndex((tab) =>
      location.pathname.includes(`${tab.to}`),
    );
    setValue(index >= 0 ? index : 0);
  }, [location.pathname, tabs]);

  return (
    <StyledTabs
      value={value}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      {...rest}
    >
      {tabs.map((tab) => (
        <LinkTab {...tab} key={tab.label} />
      ))}
    </StyledTabs>
  );
};
