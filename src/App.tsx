import Switch from '@mui/material/Switch';
import { useAppTheme } from './context/ThemeContext';

function App() {
  const { toggleTheme, mode } = useAppTheme();

  return (
    <>
      <Switch checked={mode === 'dark'} onChange={toggleTheme} />
      <h1>Started...</h1>
    </>
  );
}

export default App;
