import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
  query Users {
    users {
      id
      email
      is_verified
      department_name
      position_name
      profile {
        id
        full_name
        avatar
      }
    }
  }
`;
