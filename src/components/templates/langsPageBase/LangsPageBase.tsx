import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client/react';
import { Box, CircularProgress } from '@mui/material';
import {
  type Profile,
  type AddProfileLanguageInput,
  type Proficiency,
  type DeleteProfileLanguageInput,
  type UpdateProfileLanguageInput,
} from 'cv-graphql';
import { showSnackbar } from '../../../app/state/snackbar';
import { extractGraphQLMessage } from '../../../graphql/errors';
import {
  ADD_PROFILE_LANGUAGE,
  DELETE_PROFILE_LANGUAGES,
  UPDATE_PROFILE_LANGUAGE,
} from '../../../graphql/profileLanguages/mutations';
import { PROFILE_LANGUAGES } from '../../../graphql/profileLanguages/queries';
import { LangsPageLayout } from '../../organisms/langsPageLayout';

interface LangsPageBaseProps {
  userId: string;
  readOnly?: boolean;
}

export const LangsPageBase = ({
  userId,
  readOnly = false,
}: LangsPageBaseProps) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: languages,
    loading,
    error,
  } = useQuery<{ profile: Profile }, { userId: string }>(PROFILE_LANGUAGES, {
    variables: { userId },
  });

  const [execDeleteProfileLangs] = useMutation<
    { deleteProfileLanguage: Profile },
    { language: DeleteProfileLanguageInput }
  >(DELETE_PROFILE_LANGUAGES, {
    onCompleted: () =>
      showSnackbar(t('languages.info.languageRemoved'), 'info'),
    onError: (e) =>
      showSnackbar(
        extractGraphQLMessage(e) || t('languages.error.requestFailed'),
        'error',
      ),
  });

  const [execAddProfileLang] = useMutation<
    { addProfileLanguage: Profile },
    { language: AddProfileLanguageInput }
  >(ADD_PROFILE_LANGUAGE, {
    onCompleted: () => showSnackbar(t('languages.info.languageAdded'), 'info'),
    onError: (e) =>
      showSnackbar(
        extractGraphQLMessage(e) || t('languages.error.requestFailed'),
        'error',
      ),
  });

  const [execUpdateProfileLang] = useMutation<
    { updateProfileLanguage: Profile },
    { language: UpdateProfileLanguageInput }
  >(UPDATE_PROFILE_LANGUAGE, {
    onCompleted: () =>
      showSnackbar(t('languages.info.languageUpdated'), 'info'),
    onError: (e) =>
      showSnackbar(
        extractGraphQLMessage(e) || t('languages.error.requestFailed'),
        'error',
      ),
  });

  useEffect(() => {
    if (!error) return;
    showSnackbar(
      extractGraphQLMessage(error) || t('languages.error.requestFailed'),
      'error',
    );
  }, [error]);

  const handleLangAdd = (name: string, proficiency: Proficiency) => {
    setDialogOpen(false);
    execAddProfileLang({
      variables: { language: { userId, name, proficiency } },
    });
  };

  const handleLangUpdate = (name: string, proficiency: Proficiency) => {
    execUpdateProfileLang({
      variables: { language: { userId, name, proficiency } },
    });
  };

  const handleLangsDelete = (langsNames: string[]) => {
    execDeleteProfileLangs({
      variables: { language: { userId, name: langsNames } },
    });
  };

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <CircularProgress color="primary" />
      </Box>
    );

  if (!languages) return null;

  return (
    <LangsPageLayout
      languages={languages.profile.languages}
      handleAdd={handleLangAdd}
      handleUpdate={handleLangUpdate}
      handleDelete={handleLangsDelete}
      dialogOpen={dialogOpen}
      onOpenDialog={() => setDialogOpen(true)}
      onCloseDialog={() => setDialogOpen(false)}
      readOnly={readOnly}
    />
  );
};
