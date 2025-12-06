import type { Skill } from 'cv-graphql';

export const parseSkill = (skill: Skill) => {
  return {
    id: skill.id,
    label: skill.name,
    category: skill.category,
    group: skill.category_parent_name ?? skill.category_name,
    groupOrder: skill.category?.order ?? 99999,
  };
};
