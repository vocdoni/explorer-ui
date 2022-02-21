
import i18n from '@i18n'
import { Grid } from '@components/elements/grid'
import { Input } from '@components/elements/inputs'
import styled from 'styled-components'
import { FlexContainer } from '@components/elements/flex'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { SubmitFilterButtons } from '@components/blocks/filters/submit-buttons'
import { useState } from 'react'

// Used to send filter to the useProcessesList hook
export interface IFilterEntity {
    entityId?: string 
  }

export const ProcessFilter = ({
  filter,
  onEnableFilter,
  onDisableFilter,
}: {
  filter: IFilterEntity
  onEnableFilter: { (tempFilter: IFilterEntity): void }
  onDisableFilter: {
    (tempFilter: IFilterEntity, resetFilter: { (): void }): void
  }
}) => {
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
          placeholder={i18n.t('entities.search_by_organization_id')}
          value={searchTermIT}
          onChange={(ev) => {
            setSearchTermIT(ev.target.value)
            tempFilter.entityId = ev.target.value
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
export const SelectContainer = styled.div`
& > * {
  min-width: 200px;
}
`
