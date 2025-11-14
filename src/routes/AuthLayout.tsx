import { Outlet } from 'react-router';
import { AuthTabs } from '../components/organisms/authTabs';

export const AuthLayout = () => {
  return (
    <>
      <AuthTabs />
      <Outlet />
    </>
  );
};
