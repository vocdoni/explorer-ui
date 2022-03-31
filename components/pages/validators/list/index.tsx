import i18n from '@i18n'
import { ListPageTemplate } from '@components/pages/app/page-templates/list-page-template'
import { Validator } from '@lib/types'
import { ValidatorCard } from '@components/blocks/card/validator-card'

const PER_PAGE = 10

export const DashboardShowValidators = ({validators} : {validators: Validator[]}) => {
  return (
    <ListPageTemplate
      title={   i18n.t('validators_list.validators_list_title')}
      subtitle={i18n.t('validators_list.validators_count') + validators.length} 
    >
        {validators.map((validator, i) => <ValidatorCard key={i} validatorData={validator}/>)}
    </ListPageTemplate>
  )
}
