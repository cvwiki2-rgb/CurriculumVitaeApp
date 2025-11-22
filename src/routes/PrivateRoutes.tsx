import { Navigate, Outlet } from 'react-router';
import { useReactiveVar } from '@apollo/client/react';
import { authVar } from '../graphql/state/auth';

export const PrivateRoutes = () => {
  const auth = useReactiveVar(authVar);
  return auth ? <Outlet /> : <Navigate to="auth/login" replace />;
};
