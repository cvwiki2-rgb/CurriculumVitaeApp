import { useParams } from 'react-router';
import { useReactiveVar } from '@apollo/client/react';
import { LangsPageBase } from '../../components/templates/langsPageBase';
import { authVar } from '../../graphql/state/auth';

export const UserLanguagesPage = () => {
  const { userId } = useParams();
  const auth = useReactiveVar(authVar);

  if (!userId) return null;

  const isEditable = auth?.user.id === userId || auth?.user.role === 'Admin';

  return <LangsPageBase userId={userId} readOnly={!isEditable} />;
};
