import { createBrowserRouter } from 'react-router';
import { AppLayout } from './AppLayout';
import { AuthLayout } from './AuthLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { RootLayout } from './RootLayout';
import { RootRedirect } from './RootRedirect';
import { ForgotPasswordPage } from '../pages/forgotPasswordPage';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        Component: PublicRoutes,
        children: [
          {
            path: '/auth',
            Component: AuthLayout,
            children: [
              { path: 'login', Component: LoginPage },
              { path: 'signup', Component: SignupPage },
            ],
          },
          {
            path: '/forgot-password',
            Component: ForgotPasswordPage,
          },
        ],
      },
      {
        Component: PrivateRoutes,
        children: [
          {
            Component: AppLayout,
            children: [{ path: '/users' }],
          },
        ],
      },
    ],
  },
  {
    path: '/',
    Component: RootRedirect,
  },
]);
