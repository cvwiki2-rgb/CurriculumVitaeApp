import { useTranslation } from 'react-i18next';
import { AppTabs } from '../../molecules/appTabs';

export const UserIdTabs = () => {
  const { t } = useTranslation();

  return (
    <AppTabs
      tabs={[
        { label: t('userId.tabs.profile'), to: '.' },
        { label: t('userId.tabs.skills'), to: 'skills' },
        { label: t('userId.tabs.languages'), to: 'languages' },
      ]}
      sx={{
        position: 'sticky',
        top: '44px',
        backgroundColor: 'background.default',
        zIndex: 'appBar',
      }}
    />
  );
};
