import { createBrowserRouter } from 'react-router';
import { AuthLayout } from './AuthLayout';
import { LanguageLayout } from './LanguageLayout';
import { LanguageRedirect } from './LanguageRedirect';
import { RootRedirect } from './RootRedirect';

export const router = createBrowserRouter([
  {
    path: '/:lang',
    Component: LanguageLayout,
    children: [
      {
        index: true,
        Component: RootRedirect,
      },
      {
        path: 'auth',
        Component: AuthLayout,
        children: [{ path: 'login' }, { path: 'signup' }],
      },
    ],
  },
  {
    path: '/',
    Component: LanguageRedirect,
  },
]);
