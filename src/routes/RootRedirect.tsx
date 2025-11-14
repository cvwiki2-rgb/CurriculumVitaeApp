import { Navigate, useParams } from 'react-router';

export const RootRedirect = () => {
  const { lang } = useParams();

  return <Navigate to={`/${lang}/auth/login`} replace />;
};
