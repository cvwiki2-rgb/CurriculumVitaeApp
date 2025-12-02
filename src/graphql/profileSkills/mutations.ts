import { gql } from '@apollo/client';

export const DELETE_PROFILE_SKILLS = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
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
