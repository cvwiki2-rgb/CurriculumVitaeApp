import { gql } from '@apollo/client';

export const PROFILE_LANGUAGES = gql`
  query ProfileLanguages($userId: ID!) {
    profile(userId: $userId) {
      id
      languages {
        name
        proficiency
        __typename
      }
      __typename
    }
  }
`;

export const LANGUAGES = gql`
  query Languages {
    languages {
      id
      iso2
      name
      native_name
      __typename
    }
  }
`;
