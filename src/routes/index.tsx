import { createBrowserRouter } from 'react-router';
import { AuthLayout } from './AuthLayout';
import { LanguageRedirect } from './LanguageRedirect.tsx';
import { RootRedirect } from './RootRedirect';

export const router = createBrowserRouter([
  {
    path: '/:lang',
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
