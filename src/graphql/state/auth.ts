import { makeVar } from '@apollo/client';
import type { AuthResult, User } from 'cv-graphql';

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
