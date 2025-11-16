import { createBrowserRouter } from 'react-router';
import { AppLayout } from './AppLayout';
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
      {
        Component: AppLayout,
        children: [
          {
            path: 'users',
          },
        ],
      },
    ],
  },
  {
    path: '/',
    Component: LanguageRedirect,
  },
]);
