import { Navigate } from 'react-router';

export const LanguageRedirect = () => {
  const defaultLang = 'en';

  return <Navigate to={`/${defaultLang}`} replace />;
};
