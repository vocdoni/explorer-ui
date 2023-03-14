import { useTranslation } from 'react-i18next';
import { Switch, Case, Default } from 'react-if';
import { ActiveBadge } from '@components/elements/text-badge';
import { UpcomingVoteBadge } from '@components/blocks/badges/process-status-badge';

export const EncryptionKeysIndexesBadge = ({ type }: { type: number }) => {
  const { i18n } = useTranslation();
  return (
    <Switch>
      <Case condition={type > 0}>
        <ActiveBadge>{type}</ActiveBadge>
      </Case>
      <Default>
        <UpcomingVoteBadge>{i18n.t('envelopes.encryption_keys.none')}</UpcomingVoteBadge>
      </Default>
    </Switch>
  );
};
