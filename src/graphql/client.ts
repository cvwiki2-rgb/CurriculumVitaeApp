import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { authVar, clearAuth } from './state/auth';
import type { ExecutionResult, GraphQLError } from 'graphql';

const httpLink = new HttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  const tokenData = authVar(); // AuthResult | null
  const token =
    tokenData?.access_token ?? localStorage.getItem('access_token') ?? '';

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response: ExecutionResult) => {
    const { graphQLErrors, networkError } = operation.getContext();

    if (graphQLErrors) {
      graphQLErrors.forEach((err: GraphQLError) => {
        console.error('GraphQL Error:', err.message);

        if (err.message === 'Unauthorized') {
          clearAuth();
        }
      });
    }

    if (networkError) {
      console.error('Network Error:', networkError);
    }

    return response;
  });
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
