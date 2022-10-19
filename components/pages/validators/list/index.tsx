import { useTranslation } from 'react-i18next'
import { InlineTitleChildrenContainer, ListPage } from '@components/pages/app/page-templates/list-page'
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
     <InlineTitleChildrenContainer title={
         <ListPage
         title={i18n.t('validators_list.validators')}
         subtitle={i18n.t('validators_list.count') + ": " + validators.length}
       />
      }>
      </InlineTitleChildrenContainer>

      {validators.map((validator, i) => (
        <ValidatorCard key={i} validatorData={validator} />
      ))}
    </>
  )
}
