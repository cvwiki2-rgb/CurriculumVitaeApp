import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router';
import i18nConfig from '../app/i18n/i18n';
import { useCurrentLang } from '../hooks/useCurrentLang';

export const LanguageLayout = () => {
  const lang = useCurrentLang();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const supportedLangs = Object.keys(i18nConfig.options.resources ?? {});
  const isSupported = supportedLangs.includes(lang);
  const newLang = isSupported ? lang : 'en';

  useEffect(() => {
    if (!isSupported) {
      const fixedUrl = location.pathname.replace(`/${lang}`, `/${newLang}`);
      navigate(fixedUrl, { replace: true });
    }
  }, [isSupported, lang, newLang, location.pathname, navigate]);

  useEffect(() => {
    if (i18n.language !== newLang) {
      i18n.changeLanguage(newLang);
    }
  }, [newLang, i18n]);

  return <Outlet />;
};
