import { gql } from '@apollo/client';

export const UPDATE_TOKEN = gql`
  mutation UpdateToken($refreshToken: String!) {
    updateToken(refreshToken: $refreshToken) {
      access_token
      refresh_token
      user {
        id
        email
        name
      }
    }
  }
`;
