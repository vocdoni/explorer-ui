import { Button } from '@components/elements/button'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import i18n from '@i18n'

export const SubmitFilterButtons = ({
  onEnableFilter,
  onDisableFilter,
}: {
  onEnableFilter: () => void 
  onDisableFilter
}) => {
  return (
    <DivWithMarginChildren>
      <Button
        positive
        small
        onClick={() => {
          onEnableFilter()
        }}
      >
        {i18n.t('filters.apply_filters')}
      </Button>
      <Button
        small
        onClick={() => {
          onDisableFilter()
        }}
      >
        {i18n.t('filters.clear_filters')}
      </Button>
    </DivWithMarginChildren>
  )
}
