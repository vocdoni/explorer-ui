import i18n from '@i18n'
import { Grid } from '@components/elements/grid'
import { Input } from '@components/elements/inputs'
import styled from 'styled-components'
import { FlexContainer } from '@components/elements/flex'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { SubmitFilterButtons } from '@components/blocks/filters/submit-buttons'
import { useState } from 'react'

// Used to filter blocks by height
export interface IFilterBlocks {
    from?: number
  }
  
export const BlocksFilter = ({
  onEnableFilter,
  onDisableFilter,
}: {
  onEnableFilter: { (tempFilter: IFilterBlocks): void }
  onDisableFilter: {
    (tempFilter: IFilterBlocks, resetFilter: { (): void }): void
  }
}) => {
  const [searchTermIT, setSearchTermIT] = useState('')


  const [tempFilter, setTempFilter] = useState<IFilterBlocks>({})

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
          placeholder={i18n.t('blocks.search_by_block_height')}
          value={searchTermIT}
          onChange={(ev) => {
            setSearchTermIT(ev.target.value)
            tempFilter.from = +ev.target.value
            setTempFilter(Object.assign({}, tempFilter))
          }}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
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