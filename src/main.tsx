import { StrictMode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { theme } from './theme.ts';
import './styles/index.scss';
import './app/i18n/i18n.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
