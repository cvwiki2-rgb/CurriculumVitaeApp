import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client/react';
import { Box, CircularProgress } from '@mui/material';
import { fileToBase64 } from './constants';
import { showSnackbar } from '../../../app/state/snackbar';
import { extractGraphQLMessage } from '../../../graphql/errors';
import {
  DELETE_AVATAR,
  UPDATE_PROFILE,
  UPDATE_USER,
  UPLOAD_AVATAR,
} from '../../../graphql/profile/mutations';
import { DEPARTMENTS, POSITIONS, USER } from '../../../graphql/profile/queries';
import { authVar, updateUser } from '../../../graphql/state/auth';
import { userVar } from '../../../graphql/state/user';
import { ProfilePageLayout } from '../../organisms/profilePageLayout';
import type {
  DeleteAvatarInput,
  Department,
  Position,
  Profile,
  UpdateProfileInput,
  UpdateUserInput,
  UploadAvatarInput,
  User,
} from 'cv-graphql';

interface ProfilePageBaseProps {
  userId: string;
  readOnly?: boolean;
}

export const ProfilePageBase = ({ userId, readOnly }: ProfilePageBaseProps) => {
  const { t } = useTranslation();

  const { data: departmentsData } = useQuery<{ departments: Department[] }>(
    DEPARTMENTS,
  );

  const { data: positionsData } = useQuery<{ positions: Position[] }>(
    POSITIONS,
  );

  const {
    data,
    error,
    refetch: refetchUser,
  } = useQuery<{ user: User }, { userId: string }>(USER, {
    variables: { userId: userId ?? '' },
  });

  const [execUpdateProfile] = useMutation<
    { updateProfile: Profile },
    { profile: UpdateProfileInput }
  >(UPDATE_PROFILE, {
    onCompleted: () => showSnackbar(t('profile updated'), 'info'),
    onError: (e) =>
      showSnackbar(extractGraphQLMessage(e) || t('error'), 'error'),
  });

  const [execUpdateUser] = useMutation<
    { updateUser: User },
    { user: UpdateUserInput }
  >(UPDATE_USER, {
    onCompleted: () => showSnackbar(t('user updated'), 'info'),
    onError: (e) =>
      showSnackbar(extractGraphQLMessage(e) || t('error'), 'error'),
  });

  const [execUploadAvatar] = useMutation<
    { uploadAvatar: string },
    { avatar: UploadAvatarInput }
  >(UPLOAD_AVATAR, {
    onCompleted: () => showSnackbar(t('avatar uploaded'), 'info'),
    onError: (e) =>
      showSnackbar(extractGraphQLMessage(e) || t('error'), 'error'),
  });

  const [execDeleteAvatar] = useMutation<
    { deleteAvatar: void },
    { avatar: DeleteAvatarInput }
  >(DELETE_AVATAR, {
    onCompleted: () => showSnackbar(t('avatar deleted'), 'info'),
    onError: (e) =>
      showSnackbar(extractGraphQLMessage(e) || t('error'), 'error'),
  });

  const isSameUser = data?.user?.id === userId;
  const auth = useReactiveVar(authVar);
  const isCurrentUser = userId === auth?.user?.id;

  useEffect(() => {
    if (!data?.user) return;

    userVar(data.user);
    if (isCurrentUser) {
      updateUser(data.user);
    }
  }, [data?.user, isCurrentUser]);

  useEffect(() => {
    if (!error) return;

    const msg = extractGraphQLMessage(error) || 'Error';
    showSnackbar(msg, 'error');
  }, [error]);

  const handleUpdateClick = async (
    firstName: string,
    lastName: string,
    department: string,
    position: string,
  ) => {
    await Promise.all([
      execUpdateProfile({
        variables: {
          profile: {
            userId,
            first_name: firstName,
            last_name: lastName,
          },
        },
      }),
      execUpdateUser({
        variables: {
          user: {
            userId,
            departmentId: department,
            positionId: position,
          },
        },
      }),
    ]);

    refetchUser();
  };

  const handleAvatarUpload = async (file: File) => {
    const base64 = await fileToBase64(file);
    await execUploadAvatar({
      variables: {
        avatar: { userId, type: file.type, size: file.size, base64 },
      },
    });

    refetchUser();
  };

  const handleAvatarDelete = async () => {
    await execDeleteAvatar({ variables: { avatar: { userId } } });

    refetchUser();
  };

  if (!data || !isSameUser)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  return (
    <ProfilePageLayout
      departments={departmentsData?.departments ?? []}
      positions={positionsData?.positions ?? []}
      user={data?.user}
      readOnly={readOnly}
      onConfirm={handleUpdateClick}
      onAvatarUpload={handleAvatarUpload}
      onAvatarDelete={handleAvatarDelete}
    />
  );
};
