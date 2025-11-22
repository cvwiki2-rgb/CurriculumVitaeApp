import { Navigate } from 'react-router';
import { authVar } from '../graphql/state/auth';
import { useCurrentLang } from '../hooks/useCurrentLang';

export const RootRedirect = () => {
  const lang = useCurrentLang();
  const auth = authVar();
  const isAuth = !!auth?.access_token;

  return (
    <Navigate to={isAuth ? `/${lang}/users` : `/${lang}/auth/login`} replace />
  );
};
