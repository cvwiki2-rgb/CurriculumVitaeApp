import { useReactiveVar } from '@apollo/client/react';
import { LangsPageBase } from '../../components/templates/langsPageBase';
import { authVar } from '../../graphql/state/auth';

export const LanguagesPage = () => {
  const auth = useReactiveVar(authVar);
  const userId = auth?.user.id;

  if (!userId) return null;

  return <LangsPageBase userId={userId} readOnly={false} />;
};
