import { Button } from '@components/elements/button'
import { Column, Grid } from '@components/elements/grid'
import { DivWithMarginChildren, FakedButton } from '@components/elements/styled-divs'
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
    <Grid>
      <Column>
        <DivWithMarginChildren>
          <Button
            positive
            small
            onClick={() => {
              onEnableFilter()
            }}
          >
            <FakedButton type="submit">
              {i18n.t('components.filters.apply_filters')}
            </FakedButton>
          </Button>
          <Button
            small
            onClick={() => {
              onDisableFilter()
            }}
          >
            <FakedButton>
              {i18n.t('components.filters.clear_filters')}
            </FakedButton>
          </Button>
        </DivWithMarginChildren>
      </Column>
    </Grid>
  )
}