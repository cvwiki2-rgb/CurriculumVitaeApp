import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <h1>{t('Started')}...</h1>
      <div>
        <button onClick={() => i18n.changeLanguage('ru')}>RU</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      </div>
    </>
  );
}

export default App;
