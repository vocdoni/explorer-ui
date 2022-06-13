import React, { useEffect, useMemo, useState } from 'react'
import { VochainProcessStatus } from 'dvote-js'
import { useTranslation } from 'react-i18next'
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
import { Column } from 'react-rainbow-components'

export const ProcessFilter = ({
  onEnableFilter,
  onDisableFilter,
}: {
  onEnableFilter: { (tempFilter: IFilterProcesses): void }
  onDisableFilter: {
    (tempFilter: IFilterProcesses, resetFilter: { (): void }): void
  }
}) => {
  const { i18n } = useTranslation()

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
  }

  const _onEnableFilter = () => {
    onEnableFilter(tempFilter)
  }
  const _onDisableFilter = () => {
    onDisableFilter(tempFilter, resetFilter)
  }

  return (
    <>
      <FilterContainer>
        <DivWithMarginChildren>
          <Input
            placeholder={i18n.t('processes.filter.search_by_search_term')}
            value={tempFilter.searchTerm || ''}
            onChange={(ev) => {
              tempFilter.searchTerm = ev.target.value
              setTempFilter(Object.assign({}, tempFilter))
            }}
          />
          <Input
            placeholder={i18n.t('processes.filter.search_by_entity_id')}
            value={tempFilter.entityId || ''}
            onChange={(ev) => {
              tempFilter.entityId = ev.target.value
              setTempFilter(Object.assign({}, tempFilter))
            }}
          />
        </DivWithMarginChildren>
        <FlexContainer>
          <DivWithMarginChildren>
            <SelectContainer>
              <Select
                instanceId={voteStatusSelectId} // Fix `react-select Prop `id` did not match`
                id={voteStatusSelectId}
                placeholder={i18n.t('processes.filter.select_by_vote_status')}
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
          </DivWithMarginChildren>
        </FlexContainer>
        <CheckBoxContainer>
            <Checkbox
              id="with_results"
              checked={tempFilter.withResults}
              onChange={(ack: boolean) => {
                // setWithResults(ack)
                tempFilter.withResults = ack

                setTempFilter(Object.assign({}, tempFilter))
              }}
              text={i18n.t('processes.filter.check_with_results')}
              labelColor={colors.lightText}
            />
        </CheckBoxContainer>
      </FilterContainer>
      <SubmitFilterButtons
        onEnableFilter={_onEnableFilter}
        onDisableFilter={_onDisableFilter}
      />
    </>
  )
}
const SelectContainer = styled.div`
  & > * {
    min-width: 200px;
  }
`

const CheckBoxContainer = styled(FlexContainer)`
  align-items: center;
  padding-bottom: 10px;
  margin-right: 20px;

`

const FilterContainer = styled(Grid)`
  margin: 0 0 0;
`
