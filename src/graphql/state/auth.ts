import { ApolloClient, makeVar } from '@apollo/client';
import { type AuthResult, type UpdateTokenResult, type User } from 'cv-graphql';
import { UPDATE_TOKEN } from '../auth/mutations';

export const authVar = makeVar<AuthResult | null>(null);

const defaultUser: User = {
  id: '',
  created_at: '',
  email: '',
  is_verified: false,
  profile: { id: '', created_at: '', skills: [], languages: [] },
  role: 'Employee' as unknown as User['role'],
};

export function setAuth(auth: AuthResult) {
  try {
    localStorage.setItem('access_token', auth.access_token);
    localStorage.setItem('refresh_token', auth.refresh_token);
    localStorage.setItem('user', JSON.stringify(auth.user));
  } catch (e) {
    console.warn('Failed to access localStorage', e);
  }
  authVar(auth);
}

export function updateAuth(auth: UpdateTokenResult) {
  try {
    localStorage.setItem('access_token', auth.access_token);
    localStorage.setItem('refresh_token', auth.refresh_token);
  } catch (e) {
    console.warn('Failed to access localStorage', e);
  }
  const currentAuth = authVar();
  if (!currentAuth) {
    authVar({ user: defaultUser, ...auth });
    return;
  }
  const updatedAuth = { ...currentAuth, ...auth };
  authVar(updatedAuth);
}

export function clearAuth() {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  } catch (e) {
    console.warn('Failed to clear localStorage', e);
  }
  authVar(null);
}

export function initAuthFromStorage() {
  const access = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');
  const user = localStorage.getItem('user');
  if (access || refresh) {
    authVar({
      access_token: access ?? '',
      refresh_token: refresh ?? '',
      user: user ? JSON.parse(user) : defaultUser,
    });
  }
}

export async function refreshToken(
  client: ApolloClient,
): Promise<UpdateTokenResult | null> {
  const refreshToken = authVar()?.refresh_token;

  if (!refreshToken) {
    clearAuth();
    return null;
  }

  try {
    const { data } = await client.mutate<{ updateToken: UpdateTokenResult }>({
      mutation: UPDATE_TOKEN,
      context: {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        useRefreshToken: true,
      },
    });

    if (!data?.updateToken) throw new Error('No token returned');

    const updatedAuth: UpdateTokenResult = {
      access_token: data.updateToken.access_token,
      refresh_token: data.updateToken.refresh_token,
    };

    updateAuth(updatedAuth);
    return updatedAuth;
  } catch (e) {
    console.warn('Token refresh failed', e);
    clearAuth();
    return null;
  }
}
