import { Navigate } from 'react-router';
import { authVar } from '../graphql/state/auth';

export const RootRedirect = () => {
  const auth = authVar();
  const isAuth = !!auth?.access_token;

  return <Navigate to={isAuth ? '/users' : '/auth/login'} replace />;
};
