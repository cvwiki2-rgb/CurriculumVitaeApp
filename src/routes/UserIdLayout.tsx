import { Outlet } from 'react-router';
import { UserIdTabs } from '../components/organisms/userIdTabs';

export const UserIdLayout = () => {
  return (
    <>
      <UserIdTabs />
      <Outlet />
    </>
  );
};
