import { ApolloClient, makeVar } from '@apollo/client';
import { UPDATE_TOKEN } from '../auth/mutations';
import type { AuthResult, UpdateTokenResult, User } from 'cv-graphql';

export type LocalAuth = Omit<AuthResult, 'user'> & { user?: User };
export const authVar = makeVar<LocalAuth | null>(null);

export function setAuth(auth: LocalAuth) {
  try {
    localStorage.setItem('access_token', auth.access_token);
    localStorage.setItem('refresh_token', auth.refresh_token);
  } catch (e) {
    console.warn('Failed to access localStorage', e);
  }
  authVar(auth);
}

export function clearAuth() {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } catch (e) {
    console.warn('Failed to clear localStorage', e);
  }
  authVar(null);
}

export function initAuthFromStorage() {
  const access = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');
  if (access || refresh) {
    authVar({
      access_token: access ?? '',
      refresh_token: refresh ?? '',
      user: undefined,
    });
  }
}

export async function refreshToken(
  client: ApolloClient,
): Promise<LocalAuth | null> {
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
      },
    });

    if (!data?.updateToken) throw new Error('No token returned');

    const updatedAuth: LocalAuth = {
      access_token: data.updateToken.access_token,
      refresh_token: data.updateToken.refresh_token,
    };

    setAuth(updatedAuth);
    return updatedAuth;
  } catch (e) {
    console.warn('Token refresh failed', e);
    clearAuth();
    return null;
  }
}
