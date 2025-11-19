import { StrictMode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import i18n from './app/i18n/i18n.ts';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { router } from './routes/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </I18nextProvider>
  </StrictMode>,
);
