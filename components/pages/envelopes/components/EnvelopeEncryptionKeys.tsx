import { useTranslation } from 'react-i18next';
import { Switch, Case, Default } from 'react-if';
import { BaseStatusBadge } from '@components/elements/card-badge';

export const EncryptionKeysIndexesBadge = ({ type }: { type: number }) => {
  const { i18n } = useTranslation();
  return (
    <Switch>
      <Case condition={type > 0}>
        <BaseStatusBadge>{type}</BaseStatusBadge>
      </Case>
      <Default>
        <BaseStatusBadge>{i18n.t('envelopes.encryption_keys.none')}</BaseStatusBadge>
      </Default>
    </Switch>
  );
};
