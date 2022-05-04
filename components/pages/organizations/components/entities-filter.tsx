
import { useTranslation } from 'react-i18next'
import { Grid } from '@components/elements/grid'
import { Input } from '@components/elements/inputs'
import styled from 'styled-components'
import { FlexContainer } from '@components/elements/flex'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { SubmitFilterButtons } from '@components/blocks/filters/submit-buttons'
import { useState } from 'react'

// Used to send filter to the useProcessesList hook
export interface IFilterEntity {
    searchTerm?: string 
  }

export const EntitiesFilter = ({
  onEnableFilter,
  onDisableFilter,
}: {
  onEnableFilter: { (tempFilter: IFilterEntity): void }
  onDisableFilter: {
    (tempFilter: IFilterEntity, resetFilter: { (): void }): void
  }
}) => {
  const { i18n } = useTranslation()

  const [searchTermIT, setSearchTermIT] = useState('')


  const [tempFilter, setTempFilter] = useState<IFilterEntity>({})

  const resetFilter = () => {
    setTempFilter({})
    setSearchTermIT('')
  }

  const _onEnableFilter = () => {
    onEnableFilter(tempFilter)
  }
  const _onDisableFilter = () => {
    onDisableFilter(tempFilter, resetFilter)
  }

  return (
    <>
      <DivWithMarginChildren>
        <Input
          placeholder={i18n.t('entities.filter.search_by_organization_id')}
          value={searchTermIT}
          onChange={(ev) => {
            setSearchTermIT(ev.target.value)
            tempFilter.searchTerm = ev.target.value
            setTempFilter(Object.assign({}, tempFilter))
          }}
        />
      </DivWithMarginChildren>
      <Grid>
        <FlexContainer>
            <SubmitFilterButtons onEnableFilter={_onEnableFilter} onDisableFilter={_onDisableFilter}/>
        </FlexContainer>
      </Grid>
    </>
  )
}