import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import enTranslation from './locales/en/en.json';
import ruTranslation from './locales/ru/ru.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ru: { translation: ruTranslation },
  },
  lng: 'en', // default
  fallbackLng: 'en',
  debug: true,
  interpolation: { escapeValue: false },
});

export default i18n;
