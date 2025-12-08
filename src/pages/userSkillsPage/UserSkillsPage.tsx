import { useParams } from 'react-router';
import { useReactiveVar } from '@apollo/client/react';
import { SkillsPageBase } from '../../components/templates/skillsPageBase';
import { authVar } from '../../graphql/state/auth';

export const UserSkillsPage = () => {
  const { userId } = useParams();
  const auth = useReactiveVar(authVar);

  if (!userId) return null;

  const isEditable = auth?.user.id === userId || auth?.user.role === 'Admin';

  return <SkillsPageBase userId={userId} readOnly={!isEditable} />;
};
