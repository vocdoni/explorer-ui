import { useTranslation } from 'react-i18next';
import { ActiveBadge } from '@components/elements/text-badge';

export const ValidatorPowerBadge = ({ power }: { power: number }) => {
  const { i18n } = useTranslation();
  return (
    <ActiveBadge>
      {i18n.t('validators.badge.voting_power')}: {power}
    </ActiveBadge>
  );
};
