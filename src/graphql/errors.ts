/* eslint-disable @typescript-eslint/no-explicit-any */
import { CombinedGraphQLErrors, type ErrorLike } from '@apollo/client';
import type { GraphQLError } from 'graphql';

export type GraphQLErrorWithExtensions = GraphQLError & {
  extensions?: {
    response?: {
      message?: string | string[];
      [key: string]: any;
    };
    exception?: {
      response?: {
        message?: string | string[];
        [key: string]: any;
      };
      [key: string]: any;
    };
    message?: string;
    [key: string]: any;
  };
};

export const extractGraphQLMessage = (
  error: CombinedGraphQLErrors | ErrorLike,
): string | null => {
  if (CombinedGraphQLErrors.is(error)) {
    const err = error.errors?.[0] as GraphQLErrorWithExtensions | undefined;
    if (!err) return null;

    const extensions = err.extensions;

    const messageArray =
      extensions?.response?.message ?? extensions?.exception?.response?.message;
    if (messageArray)
      return Array.isArray(messageArray)
        ? messageArray.join(', ')
        : messageArray;
    if (typeof extensions?.message === 'string') return extensions.message;
  }

  if ('message' in error && typeof error.message === 'string')
    return error.message;

  return null;
};
