import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  CombinedGraphQLErrors,
  Observable,
} from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { authVar, clearAuth, refreshToken } from './state/auth';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
});

const authLink = new SetContextLink((prevContext, { operationName }) => {
  if (operationName === 'ResetPassword') {
    const urlToken = new URLSearchParams(window.location.search).get('token');

    return {
      headers: {
        ...prevContext.headers,
        Authorization: urlToken ? `Bearer ${urlToken}` : '',
      },
    };
  }

  const tokenData = authVar(); // AuthResult | null
  const token =
    tokenData?.access_token ?? localStorage.getItem('access_token') ?? '';

  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (!CombinedGraphQLErrors.is(error)) {
    console.error('[Network error]:', error);
    return;
  }

  const isUnauthorized = error.errors.some(
    (err) => err.message === 'Unauthorized',
  );
  if (!isUnauthorized) {
    error.errors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
    return;
  }

  console.warn('[Auth error]: Token expired, trying to refresh');

  return new Observable((observer) => {
    (async () => {
      try {
        const newAuth = await refreshToken(apolloClient);

        if (!newAuth) {
          clearAuth();
          observer.error(new Error('Refresh token failed'));
          return;
        }

        const oldHeaders = operation.getContext().headers || {};
        operation.setContext({
          headers: {
            ...oldHeaders,
            Authorization: `Bearer ${newAuth.access_token}`,
          },
        });

        const subscriber = forward(operation).subscribe({
          next: (value) => observer.next(value),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });

        return () => subscriber.unsubscribe();
      } catch (e) {
        clearAuth();
        observer.error(e);
      }
    })();
  });
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
