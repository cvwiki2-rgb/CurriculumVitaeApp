import { gql } from '@apollo/client';

export const USERS = gql`
  query Users {
    users {
      id
      email
      profile {
        id
        first_name
        last_name
        full_name
        avatar
        __typename
      }
      department {
        id
        name
        __typename
      }
      position {
        id
        name
        __typename
      }
      role
      __typename
    }
  }
`;
