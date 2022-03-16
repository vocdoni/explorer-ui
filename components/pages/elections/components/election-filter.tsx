import React, { useEffect, useMemo, useState } from 'react'
import { VochainProcessStatus } from 'dvote-js'
import i18n from '@i18n'
import { Grid } from '@components/elements/grid'
import { Button } from '@components/elements/button'
import { colors } from '@theme/colors'
import { Input, Select } from '@components/elements/inputs'
import styled from 'styled-components'
import { OptionTypeBase } from 'react-select'
import { FlexContainer } from '@components/elements/flex'
import { Checkbox } from '@components/elements/checkbox'
import { IFilterProcesses } from '../list/process-list'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { SubmitFilterButtons } from '@components/blocks/filters/submit-buttons'


export const ProcessFilter = ({
  onEnableFilter,
  onDisableFilter,
}: {
  onEnableFilter: { (tempFilter: IFilterProcesses): void }
  onDisableFilter: {
    (tempFilter: IFilterProcesses, resetFilter: { (): void }): void
  }
}) => {
  const [searchTermIT, setSearchTermIT] = useState('')

  // const [filter, setFilter] = useState<IFilterProcesses>({})
  const [tempFilter, setTempFilter] = useState<IFilterProcesses>({})

  const voteStatusSelectId = 'vote_status_select_id_1'
  // Map vote status select options
  const voteStatusOpts = Object.keys(VochainProcessStatus)
    .filter((value) => isNaN(Number(value)) === false)
    .map((key) => {
      return { value: key, label: VochainProcessStatus[key] }
    })

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
          placeholder={i18n.t('elections.search_by_search_term')}
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
          <SelectContainer>
            <Select
              instanceId={voteStatusSelectId} // Fix `react-select Prop `id` did not match`
              id={voteStatusSelectId}
              placeholder={i18n.t('elections.select_by_vote_status')}
              options={voteStatusOpts}
              value={
                tempFilter.status
                  ? {
                      value: tempFilter.status,
                      label: VochainProcessStatus[tempFilter.status],
                    }
                  : null
              }
              onChange={(selectedValue: OptionTypeBase) => {
                tempFilter.status = VochainProcessStatus[
                  selectedValue.label
                ] as any as VochainProcessStatus
                setTempFilter(Object.assign({}, tempFilter))
              }}
            />
          </SelectContainer>
        </FlexContainer>
        <FlexContainer>
          <Checkbox
            id="with_results"
            checked={tempFilter.withResults}
            onChange={(ack: boolean) => {
              // setWithResults(ack)
              tempFilter.withResults = ack

              setTempFilter(Object.assign({}, tempFilter))
            }}
            text={i18n.t('elections.check_with_results')}
            labelColor={colors.lightText}
          />
        </FlexContainer>
        <FlexContainer>
          <DivWithMarginChildren>
            <SubmitFilterButtons onEnableFilter={_onEnableFilter} onDisableFilter={_onDisableFilter}/>
          </DivWithMarginChildren>
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
