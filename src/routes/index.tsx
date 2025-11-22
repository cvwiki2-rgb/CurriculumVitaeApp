import { createBrowserRouter } from 'react-router';
import { AppLayout } from './AppLayout';
import { AuthLayout } from './AuthLayout';
import { LanguageLayout } from './LanguageLayout';
import { LanguageRedirect } from './LanguageRedirect';
import { PrivateRoutes } from './PrivateRoutes';
import { RootRedirect } from './RootRedirect';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';

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
        children: [
          { path: 'login', Component: LoginPage },
          { path: 'signup', Component: SignupPage },
        ],
      },
      {
        Component: PrivateRoutes,
        children: [
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
    ],
  },
  {
    path: '/',
    Component: LanguageRedirect,
  },
]);
