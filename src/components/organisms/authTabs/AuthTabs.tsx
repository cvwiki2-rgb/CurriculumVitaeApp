import { useTranslation } from 'react-i18next';
import { AppTabs } from '../../molecules/appTabs';

export const AuthTabs = () => {
  const { t } = useTranslation();

  return (
    <AppTabs
      tabs={[
        { label: t('Log in'), to: 'login' },
        { label: t('Sign up'), to: 'signup' },
      ]}
      centered
    />
  );
};
