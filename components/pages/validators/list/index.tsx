import { useTranslation } from 'react-i18next'
import { ListPageTemplate } from '@components/pages/app/page-templates/list-page-template'
import { Validator } from '@lib/types'
import { ValidatorCard } from '@components/blocks/card/validator-card'

export const DashboardShowValidators = ({validators} : {validators: Validator[]}) => {
  const { i18n } = useTranslation()

  return (
    <ListPageTemplate
      title={i18n.t('validators_list.validators_list_title')}
      subtitle={i18n.t('validators_list.validators_count', {validatorsCount: validators.length})} 
    >
        {validators.map((validator, i) => <ValidatorCard key={i} validatorData={validator}/>)}
    </ListPageTemplate>
  )
}
