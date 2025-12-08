import { gql } from '@apollo/client';

export const UPDATE_TOKEN = gql`
  mutation UpdateToken {
    updateToken {
      access_token
      refresh_token
      __typename
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

export const RESET_PASSWORD = gql`
  mutation ResetPassword($auth: ResetPasswordInput!) {
    resetPassword(auth: $auth)
  }
`;
