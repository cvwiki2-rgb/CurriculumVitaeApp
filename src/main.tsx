import { StrictMode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ApolloProvider } from '@apollo/client/react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import i18n from './app/i18n/i18n.ts';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { apolloClient } from './graphql/client.ts';
import { router } from './routes/index.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/600.css';
import '@fontsource/roboto/700.css';

//initAuthFromStorage();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </I18nextProvider>
    </ApolloProvider>
  </StrictMode>,
);
