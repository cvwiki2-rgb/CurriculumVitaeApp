import { useTranslation } from 'react-i18next';
import { AppTabs } from '../../molecules/appTabs';

export const UserIdTabs = () => {
  const { t } = useTranslation();

  return (
    <AppTabs
      tabs={[
        { label: t('Profile'), to: '.' },
        { label: t('Skills'), to: 'skills' },
        { label: t('Languages'), to: 'languages' },
      ]}
    />
  );
};
