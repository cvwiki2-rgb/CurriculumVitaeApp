import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router';

export const RootRedirect = () => {
  const { lang } = useParams();

  useEffect(() => {
    if (lang) {
      //   i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <Navigate to={`/${lang}/auth/login`} replace />;
};
