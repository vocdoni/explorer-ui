import { useTranslation } from 'react-i18next';
import { Case, Default, Switch } from 'react-if';
import { CustomTag } from '@components/elements/CustomTag';

export const EncryptionKeysIndexesBadge = ({ type }: { type: number }) => {
  const { i18n } = useTranslation();
  return (
    <Switch>
      <Case condition={type > 0}>
        <CustomTag>{type}</CustomTag>
      </Case>
      <Default>
        <CustomTag>{i18n.t('envelopes.encryption_keys.none')}</CustomTag>
      </Default>
    </Switch>
  );
};
