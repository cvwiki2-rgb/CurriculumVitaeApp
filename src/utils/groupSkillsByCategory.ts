import type { SkillCategory, SkillMastery } from 'cv-graphql';

export const groupSkillsByCategory = (
  categories: SkillCategory[],
  skills: SkillMastery[],
) => {
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  const groups: Record<
    string,
    { category: SkillCategory; skills: SkillMastery[] }
  > = {};

  for (const skill of skills) {
    if (!skill.categoryId) continue;
    const cat = categoryMap.get(skill.categoryId);
    if (!cat) continue;

    let root = cat;
    while (root.parent) root = root.parent;

    if (!groups[root.id]) {
      groups[root.id] = { category: root, skills: [] };
    }

    groups[root.id].skills.push(skill);
  }

  return Object.values(groups);
};
