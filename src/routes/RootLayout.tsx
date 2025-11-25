import { Outlet } from 'react-router';
import { AppSnackbar } from '../components/ui/appSnackbar';

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      <AppSnackbar />
    </>
  );
};
