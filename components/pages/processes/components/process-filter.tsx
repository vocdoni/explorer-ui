import React, { ReactNode, useEffect, useState } from 'react'
import { VochainProcessStatus } from 'dvote-js'
import { useTranslation } from 'react-i18next'
import { Grid } from '@components/elements/grid'
import { colors } from '@theme/colors'
import { Input } from '@components/elements/inputs'
import styled from 'styled-components'
import {
  FlexAlignItem,
  FlexContainer,
  FlexJustifyContent,
} from '@components/elements/flex'
import { Checkbox } from '@components/elements/checkbox'
import { IFilterProcesses } from '../list/process-list'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { ButtonOption } from 'react-rainbow-components'
import { FilterForm } from '@components/pages/app/page-templates/filter-form'
import { ButtonGroupPicker } from 'react-rainbow-components'
import { isInValidEntityId } from '@lib/util'
import { DELAY_BOUNCE_TIME } from '@const/filters'
import { TopDiv } from '@components/pages/app/page-templates/list-page'

export const ProcessFilter = ({
  onEnableFilter,
  title,
}: {
  onEnableFilter: { (tempFilter: IFilterProcesses): void }
  title: ReactNode
}) => {
  const [tempFilter, setTempFilter] = useState<IFilterProcesses>({})

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
    <FilterContainer>
      <TopDiv>
        {title}
        <FilterForm onEnableFilter={_onEnableFilter}>
          <SearchBoxContainer>
            <CheckBoxAndSearchBar
              tempFilter={tempFilter}
              setTempFilter={setTempFilter}
            />
          </SearchBoxContainer>
        </FilterForm>
      </TopDiv>
      <FlexContainer
        alignItem={FlexAlignItem.Start}
        justify={FlexJustifyContent.Start}
      >
        <ProcessStatusSelector
          tempFilter={tempFilter}
          setTempFilter={setTempFilter}
        />
      </FlexContainer>
    </FilterContainer>
  )
}

const CheckBoxAndSearchBar = ({
  tempFilter,
  setTempFilter,
}: {
  tempFilter: IFilterProcesses
  setTempFilter: { (tempFilter: IFilterProcesses): void }
}) => {
  const { i18n } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
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
          labelColor={colors.text}
        />
      </CheckBoxContainer>
      <DivWithMarginChildren>
        <Input
          wide
          placeholder={i18n.t(
            'processes.filter.search_by_term_or_organization_address'
          )}
          value={searchTerm}
          onChange={(ev) => {
            setSearchTerm(ev.target.value)
            if (isInValidEntityId(ev.target.value)) {
              tempFilter.searchTerm = ev.target.value
              tempFilter.entityId = ''
              setTempFilter(Object.assign({}, tempFilter))
            } else {
              tempFilter.searchTerm = ''
              tempFilter.entityId = ev.target.value
              setTempFilter(Object.assign({}, tempFilter))
            }
          }}
        />
      </DivWithMarginChildren>
    </>
  )
}

const ProcessStatusSelector = ({
  tempFilter,
  setTempFilter,
}: {
  tempFilter: IFilterProcesses
  setTempFilter: { (tempFilter: IFilterProcesses): void }
}) => {
  const { i18n } = useTranslation()

  return (
    <ButtonGroupContainer>
      <ButtonGroupPicker
        id="button-group-picker-component-1"
        value={
          tempFilter.status ? VochainProcessStatus[tempFilter.status] : 'ALL'
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
  )
}

const CheckBoxContainer = styled(FlexContainer)`
  align-items: center;
  padding-bottom: 10px;
  margin-right: 20px;
`

const SearchBoxContainer = styled(Grid)`
  margin: 0 0 0;
`

const FilterContainer = styled.div`
  margin: 10px;
`

const ButtonGroupContainer = styled.div`
  background-color: white;
  margin: 0 0 0 0;
  width: 100%;

  label {
    flex-grow: 1;
  }

  fieldset > div {
    flex-grow: 1;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 1;
  }

  label > span {
    border-radius: 8px !important;
    // border-color: transparent;
    padding: 0 1rem;
    font-weight: bold;
  }

  @media ${({ theme }) => theme.screenMin.tablet} {
    label > span {
      // margin: 0 7px;
      padding: 0 1.5rem;

    }
  }
`
