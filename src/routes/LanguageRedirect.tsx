import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';

export const LanguageRedirect = () => {
  const { i18n } = useTranslation();
  const defaultLang = i18n.language || 'en';

  return <Navigate to={`/${defaultLang}`} replace />;
};
