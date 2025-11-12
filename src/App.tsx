import Switch from '@mui/material/Switch';
import { useAppTheme } from './context/ThemeContext';

import { useTranslation } from 'react-i18next';

function App() {
  const { toggleTheme, mode } = useAppTheme();

  const { t, i18n } = useTranslation();
  return (
    <>
      <Switch checked={mode === 'dark'} onChange={toggleTheme} />
      <h1>{t('Started')}...</h1>
      <div>
        <button onClick={() => i18n.changeLanguage('ru')}>RU</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      </div>
    </>
  );
}

export default App;
