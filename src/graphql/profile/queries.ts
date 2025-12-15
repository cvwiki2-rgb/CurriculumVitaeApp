import { gql } from '@apollo/client';

export const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
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
      is_verified
      role
      __typename
    }
  }
`;

export const DEPARTMENTS = gql`
  query Departments {
    departments {
      id
      name
      __typename
    }
  }
`;

export const POSITIONS = gql`
  query Positions {
    positions {
      id
      name
      __typename
    }
  }
`;
