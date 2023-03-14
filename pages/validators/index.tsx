import { Loader } from '@components/blocks/loader';
import { DashboardShowValidators } from '@components/pages/validators/list';
import { Else, If, Then } from 'react-if';
import { useTranslation } from 'react-i18next';
import { useValidators } from '@hooks/use-voconi-sdk';

const Page = () => {
  const { i18n } = useTranslation();
  const { loading, data: validatorsResponse } = useValidators();
  const validators = validatorsResponse?.validators ?? [];

  return (
    <>
      <If condition={loading}>
        <Then>
          <Loader visible />
        </Then>
      </If>
      <Else>
        <If condition={validators != null && validators.length}>
          <Then>
            <DashboardShowValidators validators={validators} />
          </Then>
          <Else>
            <h1>{i18n.t('validators.no_validators_found')}</h1>
          </Else>
        </If>
      </Else>
    </>
  );
};

export default Page;
