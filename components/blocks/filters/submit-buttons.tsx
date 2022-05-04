import { Button } from '@components/elements/button'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { useTranslation } from 'react-i18next'

export const SubmitFilterButtons = ({
  onEnableFilter,
  onDisableFilter,
}: {
  onEnableFilter: () => void 
  onDisableFilter
}) => {
  const { i18n } = useTranslation()
  return (
    <DivWithMarginChildren>
      <Button
        positive
        small
        onClick={() => {
          onEnableFilter()
        }}
      >
        {i18n.t('components.filters.apply_filters')}
      </Button>
      <Button
        small
        onClick={() => {
          onDisableFilter()
        }}
      >
        {i18n.t('components.filters.clear_filters')}
      </Button>
    </DivWithMarginChildren>
  )
}
