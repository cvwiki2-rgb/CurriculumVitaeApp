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

export const SIGNUP = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      access_token
      refresh_token
      user {
        id
        email
        role
        is_verified
        profile {
          id
          full_name
          avatar
        }
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($auth: ForgotPasswordInput!) {
    forgotPassword(auth: $auth)
  }
`;
