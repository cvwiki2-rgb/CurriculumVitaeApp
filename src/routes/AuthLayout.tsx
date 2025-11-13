import { Outlet } from 'react-router';
import { AuthTabs } from '../components/molecules/authTabs';

export const AuthLayout = () => {
  return (
    <>
      <AuthTabs />
      <Outlet />
    </>
  );
};
