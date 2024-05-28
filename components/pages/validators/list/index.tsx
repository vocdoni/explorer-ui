import { useTranslation } from 'next-i18next';
import { InlineTitleChildrenContainer, ListPage } from '@components/pages/app/page-templates/list-page';
import { ValidatorCard } from '@components/pages/validators/components/ValidatorCard';
import { IChainValidatorsListResponse } from '@vocdoni/sdk';

export const DashboardShowValidators = ({ validators }: IChainValidatorsListResponse) => {
  const { t } = useTranslation();
  return (
    <>
      <InlineTitleChildrenContainer
        title={
          <ListPage
            title={t('validators_list.validators')}
            subtitle={t('validators_list.count') + ': ' + validators.length}
          />
        }
      ></InlineTitleChildrenContainer>

      {validators.map((validator, i) => (
        <ValidatorCard key={i} validatorData={validator} />
      ))}
    </>
  );
};
