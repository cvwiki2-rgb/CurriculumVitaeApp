import { gql } from '@apollo/client';

export const PROFILE_SKILLS = gql`
  query ProfileSkills($userId: ID!) {
    profile(userId: $userId) {
      id
      skills {
        name
        categoryId
        mastery
        __typename
      }
      __typename
    }
  }
`;

export const SKILL_CATEGORIES = gql`
  query SkillCategories {
    skillCategories {
      id
      name
      parent {
        id
        name
        __typename
      }
      __typename
    }
  }
`;
