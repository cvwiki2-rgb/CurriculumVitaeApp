import { createBrowserRouter } from 'react-router';
import { AppLayout } from './AppLayout';
import { AuthLayout } from './AuthLayout';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { RootLayout } from './RootLayout';
import { RootRedirect } from './RootRedirect';
import { UserIdLayout } from './UserIdLayout';
import { ForgotPasswordPage } from '../pages/forgotPasswordPage';
import { LanguagesPage } from '../pages/languagesPage';
import { LoginPage } from '../pages/loginPage';
import { ProfilePage } from '../pages/profilePage';
import { ResetPasswordPage } from '../pages/resetPasswordPage';
import { SignupPage } from '../pages/signupPage';
import { SkillsPage } from '../pages/skillsPage';
import { UserLanguagesPage } from '../pages/userLanguagesPage';
import { UserSkillsPage } from '../pages/userSkillsPage';
import { UsersPage } from '../pages/usersPage';

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
          {
            path: '/reset-password',
            Component: ResetPasswordPage,
          },
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
                Component: UsersPage,
              },
              {
                path: '/users/:userId',
                Component: UserIdLayout,
                children: [
                  { index: true, Component: ProfilePage },
                  { path: 'skills', Component: UserSkillsPage },
                  { path: 'languages', Component: UserLanguagesPage },
                ],
              },
              { path: '/skills', Component: SkillsPage },
              { path: '/languages', Component: LanguagesPage },
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
