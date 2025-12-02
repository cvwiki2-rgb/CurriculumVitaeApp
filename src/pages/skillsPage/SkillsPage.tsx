import { useEffect } from 'react';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client/react';
import { Box, CircularProgress } from '@mui/material';
import { showSnackbar } from '../../app/state/snackbar';
import { SkillsPageLayout } from '../../components/organisms/skillsPageLayout';
import { extractGraphQLMessage } from '../../graphql/errors';
import { DELETE_PROFILE_SKILLS } from '../../graphql/profileSkills/mutations';
import {
  PROFILE_SKILLS,
  SKILL_CATEGORIES,
} from '../../graphql/profileSkills/queries';
import { authVar } from '../../graphql/state/auth';
import type { Skill } from '../../types/skills';
import type { SkillCategory } from 'cv-graphql';

export const SkillsPage = () => {
  const auth = useReactiveVar(authVar);

  const {
    data: profileSkills,
    loading: skillsLoading,
    error: skillsError,
  } = useQuery<
    { profile: { id: string; skills: Skill[] } },
    { userId: string }
  >(PROFILE_SKILLS, {
    variables: { userId: auth?.user?.id || '' },
  });

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery<{
    skillCategories: SkillCategory[];
  }>(SKILL_CATEGORIES);

  const [execDeleteProfileSkills] = useMutation(DELETE_PROFILE_SKILLS, {
    onCompleted: () => {
      showSnackbar('Skill was removed', 'info');
    },
    onError: (error) => {
      const msg = extractGraphQLMessage(error) || 'fail';
      showSnackbar(msg, 'error');
    },
  });

  const loading = skillsLoading || categoriesLoading;
  const error = skillsError || categoriesError;

  useEffect(() => {
    if (!error) return;

    const msg = extractGraphQLMessage(error) || 'fail';
    showSnackbar(msg, 'error');
  }, [error]);

  const handleSkillAdd = () => {
    console.log('add');
  };
  const handleSkillsDelete = (skillsNames: string[]) => {
    if (!auth?.user?.id) return;
    execDeleteProfileSkills({
      variables: { skill: { name: skillsNames, userId: auth.user.id } },
    });
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <CircularProgress color="primary" />
      </Box>
    );

  return !profileSkills || !categories ? null : (
    <SkillsPageLayout
      skills={profileSkills.profile.skills}
      categories={categories.skillCategories}
      handleDelete={handleSkillsDelete}
      handleAdd={handleSkillAdd}
    />
  );
};
