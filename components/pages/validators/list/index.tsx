import { useTranslation } from 'react-i18next'
import { ListPageTitle } from '@components/pages/app/page-templates/list-page-template'
import { Validator } from '@lib/types'
import { ValidatorCard } from '@components/blocks/card/validator-card'

export const DashboardShowValidators = ({
  validators,
}: {
  validators: Validator[]
}) => {
  const { i18n } = useTranslation()

  return (
    <>
      <ListPageTitle
        title={i18n.t('validators_list.validators_list_title')}
        subtitle={i18n.t('validators_list.validators_count', {
          validatorsCount: validators.length,
        })}
      />

      {validators.map((validator, i) => (
        <ValidatorCard key={i} validatorData={validator} />
      ))}
    </>
  )
}
