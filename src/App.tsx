import { Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from './components/molecules/langSwitcher';
import { useAppTheme } from './context/ThemeContext';

function App() {
  const { toggleTheme, mode } = useAppTheme();
  const { t } = useTranslation();

  return (
    <>
      <Switch checked={mode === 'dark'} onChange={toggleTheme} />
      <h1>{t('Started')}...</h1>
      <LangSwitcher />
    </>
  );
}

export default App;
