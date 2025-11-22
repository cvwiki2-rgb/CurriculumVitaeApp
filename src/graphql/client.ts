import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  CombinedGraphQLErrors,
} from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { authVar, clearAuth } from './state/auth';

const httpLink = new HttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql',
});

const authLink = new SetContextLink((prevContext) => {
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

const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
      if (message === 'Unauthorized') {
        clearAuth();
      }
    });
  } else {
    console.error('[Network error]:', error);
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
