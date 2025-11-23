import { useTranslation } from 'react-i18next';
import { AppTabs } from '../../molecules/appTabs';

export const AuthTabs = () => {
  const { t } = useTranslation();

  return (
    <AppTabs
      tabs={[
        { label: t('auth.tabs.login'), to: 'login' },
        { label: t('auth.tabs.signup'), to: 'signup' },
      ]}
      centered
    />
  );
};
