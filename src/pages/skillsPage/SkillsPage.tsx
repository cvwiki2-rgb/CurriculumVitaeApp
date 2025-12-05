import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client/react';
import { Box, CircularProgress } from '@mui/material';
import {
  type Mastery,
  type AddProfileSkillInput,
  type DeleteProfileSkillInput,
  type Profile,
  type SkillCategory,
  type UpdateProfileSkillInput,
} from 'cv-graphql';
import { showSnackbar } from '../../app/state/snackbar';
import { SkillsPageLayout } from '../../components/organisms/skillsPageLayout';
import { extractGraphQLMessage } from '../../graphql/errors';
import {
  ADD_PROFILE_SKILL,
  DELETE_PROFILE_SKILLS,
  UPDATE_PROFILE_SKILL,
} from '../../graphql/profileSkills/mutations';
import {
  PROFILE_SKILLS,
  SKILL_CATEGORIES,
} from '../../graphql/profileSkills/queries';
import { authVar } from '../../graphql/state/auth';

export const SkillsPage = () => {
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);

  const auth = useReactiveVar(authVar);

  const {
    data: profileSkills,
    loading: skillsLoading,
    error: skillsError,
  } = useQuery<{ profile: Profile }, { userId: string }>(PROFILE_SKILLS, {
    variables: { userId: auth?.user?.id || '' },
  });

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery<{
    skillCategories: SkillCategory[];
  }>(SKILL_CATEGORIES);

  const [execDeleteProfileSkills] = useMutation<
    { deleteProfileSkill: Profile },
    { skill: DeleteProfileSkillInput }
  >(DELETE_PROFILE_SKILLS, {
    onCompleted: () => {
      showSnackbar(t('skills.info.skillRemoved'), 'info');
    },
    onError: (error) => {
      const msg =
        extractGraphQLMessage(error) || t('skills.error.requestFailed');
      showSnackbar(msg, 'error');
    },
  });

  const [execAddProfileSkill] = useMutation<
    { addProfileSkill: Profile },
    { skill: AddProfileSkillInput }
  >(ADD_PROFILE_SKILL, {
    onCompleted: () => {
      showSnackbar(t('skills.info.skillAdded'), 'info');
    },
    onError: (error) => {
      const msg =
        extractGraphQLMessage(error) || t('skills.error.requestFailed');
      showSnackbar(msg, 'error');
    },
  });

  const [execUpdateProfileSkill] = useMutation<
    { updateProfileSkill: Profile },
    { skill: UpdateProfileSkillInput }
  >(UPDATE_PROFILE_SKILL, {
    onCompleted: () => {
      showSnackbar(t('skills.info.skillUpdated'), 'info');
    },
    onError: (error) => {
      const msg =
        extractGraphQLMessage(error) || t('skills.error.requestFailed');
      showSnackbar(msg, 'error');
    },
  });

  const loading = skillsLoading || categoriesLoading;
  const error = skillsError || categoriesError;

  useEffect(() => {
    if (!error) return;

    const msg = extractGraphQLMessage(error) || t('skills.error.requestFailed');
    showSnackbar(msg, 'error');
  }, [error]);

  const handleSkillAdd = (
    name: string,
    mastery: Mastery,
    categoryId?: string | null,
  ) => {
    setDialogOpen(false);
    console.log(name, mastery);
    if (!auth?.user?.id) return;
    execAddProfileSkill({
      variables: {
        skill: {
          userId: auth.user.id,
          name,
          mastery,
          categoryId,
        },
      },
    });
  };

  const handleSkillUpdate = (
    name: string,
    mastery: Mastery,
    categoryId?: string | null,
  ) => {
    if (!auth?.user?.id) return;
    execUpdateProfileSkill({
      variables: { skill: { userId: auth.user.id, name, mastery, categoryId } },
    });
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
      handleUpdate={handleSkillUpdate}
      dialogOpen={dialogOpen}
      onOpenDialog={() => setDialogOpen(true)}
      onCloseDialog={() => setDialogOpen(false)}
    />
  );
};
