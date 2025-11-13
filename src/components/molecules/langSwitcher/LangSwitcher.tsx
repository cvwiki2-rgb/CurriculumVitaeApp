import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';

export const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();

  const changeLanguage = (newLang: 'en' | 'ru') => {
    if (newLang === lang) return;
    i18n.changeLanguage(newLang);
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    navigate(newPath, { replace: true });
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button onClick={() => changeLanguage('ru')}>RU</button>
      <button onClick={() => changeLanguage('en')}>EN</button>
    </div>
  );
};
