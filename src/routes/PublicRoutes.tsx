import { Navigate, Outlet } from 'react-router';
import { useReactiveVar } from '@apollo/client/react';
import { authVar } from '../graphql/state/auth';

export const PublicRoutes = () => {
  const auth = useReactiveVar(authVar);
  const isAuth = !!auth?.access_token;

  return !isAuth ? <Outlet /> : <Navigate to={`users`} />;
};
