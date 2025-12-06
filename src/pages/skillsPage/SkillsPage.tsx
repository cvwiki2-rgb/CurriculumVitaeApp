import { useReactiveVar } from '@apollo/client/react';
import { SkillsPageBase } from '../../components/templates/skillsPageBase';
import { authVar } from '../../graphql/state/auth';

export const SkillsPage = () => {
  const auth = useReactiveVar(authVar);
  const userId = auth?.user?.id;

  if (!userId) return null;

  return <SkillsPageBase userId={userId} readOnly={false} />;
};
