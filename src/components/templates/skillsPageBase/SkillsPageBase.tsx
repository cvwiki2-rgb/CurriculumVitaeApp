import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client/react';
import { Box, CircularProgress } from '@mui/material';
import {
  type Mastery,
  type AddProfileSkillInput,
  type DeleteProfileSkillInput,
  type Profile,
  type SkillCategory,
  type UpdateProfileSkillInput,
} from 'cv-graphql';
import { showSnackbar } from '../../../app/state/snackbar';
import { extractGraphQLMessage } from '../../../graphql/errors';
import {
  ADD_PROFILE_SKILL,
  DELETE_PROFILE_SKILLS,
  UPDATE_PROFILE_SKILL,
} from '../../../graphql/profileSkills/mutations';
import {
  PROFILE_SKILLS,
  SKILL_CATEGORIES,
} from '../../../graphql/profileSkills/queries';
import { SkillsPageLayout } from '../../organisms/skillsPageLayout';

interface SkillsPageBaseProps {
  userId: string;
  readOnly?: boolean;
}

export const SkillsPageBase = ({
  userId,
  readOnly = false,
}: SkillsPageBaseProps) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: profileSkills,
    loading: skillsLoading,
    error: skillsError,
  } = useQuery<{ profile: Profile }, { userId: string }>(PROFILE_SKILLS, {
    variables: { userId },
  });

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery<{ skillCategories: SkillCategory[] }>(SKILL_CATEGORIES);

  const [execDeleteProfileSkills] = useMutation<
    { deleteProfileSkill: Profile },
    { skill: DeleteProfileSkillInput }
  >(DELETE_PROFILE_SKILLS, {
    onCompleted: () => showSnackbar(t('skills.info.skillRemoved'), 'info'),
    onError: (e) =>
      showSnackbar(
        extractGraphQLMessage(e) || t('skills.error.requestFailed'),
        'error',
      ),
  });

  const [execAddProfileSkill] = useMutation<
    { addProfileSkill: Profile },
    { skill: AddProfileSkillInput }
  >(ADD_PROFILE_SKILL, {
    onCompleted: () => showSnackbar(t('skills.info.skillAdded'), 'info'),
    onError: (e) =>
      showSnackbar(
        extractGraphQLMessage(e) || t('skills.error.requestFailed'),
        'error',
      ),
  });

  const [execUpdateProfileSkill] = useMutation<
    { updateProfileSkill: Profile },
    { skill: UpdateProfileSkillInput }
  >(UPDATE_PROFILE_SKILL, {
    onCompleted: () => showSnackbar(t('skills.info.skillUpdated'), 'info'),
    onError: (e) =>
      showSnackbar(
        extractGraphQLMessage(e) || t('skills.error.requestFailed'),
        'error',
      ),
  });

  const loading = skillsLoading || categoriesLoading;
  const error = skillsError || categoriesError;

  useEffect(() => {
    if (!error) return;
    showSnackbar(
      extractGraphQLMessage(error) || t('skills.error.requestFailed'),
      'error',
    );
  }, [error]);

  const handleSkillAdd = (
    name: string,
    mastery: Mastery,
    categoryId?: string | null,
  ) => {
    setDialogOpen(false);
    execAddProfileSkill({
      variables: { skill: { userId, name, mastery, categoryId } },
    });
  };

  const handleSkillUpdate = (
    name: string,
    mastery: Mastery,
    categoryId?: string | null,
  ) => {
    execUpdateProfileSkill({
      variables: { skill: { userId, name, mastery, categoryId } },
    });
  };

  const handleSkillsDelete = (skillsNames: string[]) => {
    execDeleteProfileSkills({
      variables: { skill: { userId, name: skillsNames } },
    });
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <CircularProgress color="primary" />
      </Box>
    );

  if (!profileSkills || !categories) return null;

  return (
    <SkillsPageLayout
      skills={profileSkills.profile.skills}
      categories={categories.skillCategories}
      handleAdd={handleSkillAdd}
      handleUpdate={handleSkillUpdate}
      handleDelete={handleSkillsDelete}
      dialogOpen={dialogOpen}
      onOpenDialog={() => setDialogOpen(true)}
      onCloseDialog={() => setDialogOpen(false)}
      readOnly={readOnly}
    />
  );
};
