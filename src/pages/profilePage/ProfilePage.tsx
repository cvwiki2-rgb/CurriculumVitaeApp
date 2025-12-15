import { useParams } from 'react-router';
import { useReactiveVar } from '@apollo/client/react';
import { ProfilePageBase } from '../../components/templates/profilePageBase';
import { authVar } from '../../graphql/state/auth';

export const ProfilePage = () => {
  const { userId } = useParams();
  const auth = useReactiveVar(authVar);
  const authUserId = auth?.user.id;

  if (!userId || !authUserId) return null;

  const isEditable = userId === authUserId || auth?.user.role === 'Admin';

  return <ProfilePageBase readOnly={!isEditable} userId={userId} />;
};
