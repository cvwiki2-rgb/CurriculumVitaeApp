import { useTranslation } from 'react-i18next';

export const LangSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (newLang: 'en' | 'ru') => {
    if (newLang === i18n.language) return;
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button onClick={() => changeLanguage('ru')}>RU</button>
      <button onClick={() => changeLanguage('en')}>EN</button>
    </div>
  );
};
