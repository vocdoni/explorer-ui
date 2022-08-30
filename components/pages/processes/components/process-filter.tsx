import React, { useEffect, useMemo, useState } from 'react'
import { VochainProcessStatus } from 'dvote-js'
import { useTranslation } from 'react-i18next'
import { Grid } from '@components/elements/grid'
import { Button } from '@components/elements/button'
import { colors } from '@theme/colors'
import { Input, Select } from '@components/elements/inputs'
import styled from 'styled-components'
import { OptionTypeBase } from 'react-select'
import {
  FlexAlignItem,
  FlexContainer,
  FlexJustifyContent,
} from '@components/elements/flex'
import { Checkbox } from '@components/elements/checkbox'
import { IFilterProcesses } from '../list/process-list'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { SubmitFilterButtons } from '@components/blocks/filters/submit-buttons'
import { ButtonOption, Column } from 'react-rainbow-components'
import { FilterForm } from '@components/pages/app/page-templates/filter-form'
import { ButtonGroupPicker } from 'react-rainbow-components'
import { isInValidEntityId } from '@lib/util'
import { DELAY_BOUNCE_TIME } from '@const/filters'

export const ProcessFilter = ({
  onEnableFilter,
}: {
  onEnableFilter: { (tempFilter: IFilterProcesses): void }
}) => {
  const { i18n } = useTranslation()

  // const [filter, setFilter] = useState<IFilterProcesses>({})
  const [tempFilter, setTempFilter] = useState<IFilterProcesses>({})

  const [searchTerm, setSearchTerm] = useState("")

  const voteStatusSelectId = 'vote_status_select_id_1'
  // Map vote status select options
  const voteStatusOpts = Object.keys(VochainProcessStatus)
    .filter((value) => isNaN(Number(value)) === false)
    .map((key) => {
      // return { value: key, label: VochainProcessStatus[key] }
      return (
        <ButtonOption
          key={key}
          name={key}
          label={VochainProcessStatus[key]}
        ></ButtonOption>
      )
    })

  const _onEnableFilter = () => {
    onEnableFilter(tempFilter)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      _onEnableFilter()
    }, DELAY_BOUNCE_TIME)
    return () => clearTimeout(delayDebounceFn)
  }, [tempFilter])

  return (
    <FilterForm onEnableFilter={_onEnableFilter}>
      <FilterContainer>
        <DivWithMarginChildren>
          <Input
            wide
            placeholder={i18n.t('processes.filter.search_by_term_or_organization_address')}
            value={searchTerm}
            onChange={(ev) => {
              setSearchTerm(ev.target.value)
              if (isInValidEntityId(ev.target.value)) {
                tempFilter.searchTerm = ev.target.value
                tempFilter.entityId = ""
                setTempFilter(Object.assign({}, tempFilter))
              } else {
                tempFilter.searchTerm = ""
                tempFilter.entityId = ev.target.value
                setTempFilter(Object.assign({}, tempFilter))
              }
            }}
          />
        </DivWithMarginChildren>
        <CheckBoxContainer>
          <Checkbox
            id="with_results"
            checked={tempFilter.withResults}
            onChange={(ack: boolean) => {
              // setWithResults(ack)
              tempFilter.withResults = ack

              setTempFilter(Object.assign({}, tempFilter))
            }}
            text={i18n.t('processes.filter.show_only_processes_with_results')}
            labelColor={colors.lightText}
          />
        </CheckBoxContainer>
      </FilterContainer>
      <FlexContainer
        alignItem={FlexAlignItem.End}
        justify={FlexJustifyContent.End}
      >
        <ButtonGroupContainer>
          <ButtonGroupPicker
            id="button-group-picker-component-1"
            value={
              tempFilter.status
                ? VochainProcessStatus[tempFilter.status]
                : 'ALL'
            }
            onChange={(value) => {
              if (value === 'ALL') tempFilter.status = null
              else {
                tempFilter.status = VochainProcessStatus[
                  value as string
                ] as any as VochainProcessStatus
              }
              setTempFilter(Object.assign({}, tempFilter))
            }}
            name="filter"
            size="medium"
            // bottomHelpText="Select one option"
          >
            <ButtonOption
              label={i18n.t('processes.filter.status_selector.all')}
              name="ALL"
            />
            <ButtonOption
              label={i18n.t('processes.filter.status_selector.active')}
              name="READY"
            />
            <ButtonOption
              label={i18n.t('processes.filter.status_selector.paused')}
              name="PAUSED"
            />
            <ButtonOption
              label={i18n.t('processes.filter.status_selector.ended')}
              name="ENDED"
            />
          </ButtonGroupPicker>
        </ButtonGroupContainer>
      </FlexContainer>
    </FilterForm>
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

const ButtonGroupContainer = styled.div`
  margin: 20px 0 0 0;
  label > span {
    border-radius: 8px !important;
    margin: 0 3px;
    padding: 0 1rem;
    font-weight: bold;
  }


  @media ${({ theme }) => theme.screenMin.tablet} {
    label > span { 
      margin: 0 7px;
      padding: 0 1.5rem;
    }
  }
`
