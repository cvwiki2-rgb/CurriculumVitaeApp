import type { SkillMastery } from 'cv-graphql';

export type Mastery =
  | 'Novice'
  | 'Advanced'
  | 'Competent'
  | 'Proficient'
  | 'Expert';

export type Skill = Omit<SkillMastery, 'mastery'> & {
  mastery: Mastery;
};
