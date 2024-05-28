import { useTranslation } from 'next-i18next';
import { Case, Default, Switch } from 'react-if';
import { CustomTag } from '@components/elements/CustomTag';

export const EncryptionKeysIndexesBadge = ({ type }: { type: number }) => {
  const { t } = useTranslation();
  return (
    <Switch>
      <Case condition={type > 0}>
        <CustomTag>{type}</CustomTag>
      </Case>
      <Default>
        <CustomTag>{t('envelopes.encryption_keys.none')}</CustomTag>
      </Default>
    </Switch>
  );
};
