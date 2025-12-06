import { createBrowserRouter } from 'react-router';
import { AppLayout } from './AppLayout';
import { AuthLayout } from './AuthLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { RootLayout } from './RootLayout';
import { RootRedirect } from './RootRedirect';
import { LoginPage } from '../pages/loginPage';
import { SignupPage } from '../pages/signupPage';
import { SkillsPage } from '../pages/skillsPage';
import { UserSkillsPage } from '../pages/userSkillsPage';

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
          { path: '/forgot-password' },
        ],
      },
      {
        Component: PrivateRoutes,
        children: [
          {
            Component: AppLayout,
            children: [
              {
                path: '/users',
                children: [
                  {
                    path: ':userId',
                    children: [{ path: 'skills', Component: UserSkillsPage }],
                  },
                ],
              },
              { path: '/skills', Component: SkillsPage },
            ],
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
