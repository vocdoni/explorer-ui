import { useTranslation } from 'react-i18next';
import { InlineTitleChildrenContainer, ListPage } from '@components/pages/app/page-templates/list-page';
import { ValidatorCard } from '@components/blocks/card/validator-card';
import { IChainValidatorsListResponse } from '@vocdoni/sdk';

export const DashboardShowValidators = ({ validators }: IChainValidatorsListResponse) => {
  const { i18n } = useTranslation();

  return (
    <>
      <InlineTitleChildrenContainer
        title={
          <ListPage
            title={i18n.t('validators_list.validators')}
            subtitle={i18n.t('validators_list.count') + ': ' + validators.length}
          />
        }
      ></InlineTitleChildrenContainer>

      {validators.map((validator, i) => (
        <ValidatorCard key={i} validatorData={validator} />
      ))}
    </>
  );
};
