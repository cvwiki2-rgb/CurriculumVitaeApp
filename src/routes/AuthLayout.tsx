import { Outlet } from 'react-router';
import { AuthTabs } from '../components/atoms/molecules/authTabs';

export const AuthLayout = () => {
  return (
    <>
      <AuthTabs />
      <Outlet />
    </>
  );
};
