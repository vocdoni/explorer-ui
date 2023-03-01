import React, { ReactNode, useEffect, useState } from 'react'
import { VochainProcessStatus } from 'dvote-js'
import { useTranslation } from 'react-i18next'
import { Column, ColumnDiv, Grid } from '@components/elements/grid'
import { colors } from '@theme/colors'
import { InputSearch } from '@components/elements/inputs'
import styled from 'styled-components'
import {
  FlexAlignItem,
  FlexContainer,
  FlexJustifyContent,
} from '@components/elements/flex'
import { Checkbox } from '@components/elements/checkbox'
import { IFilterProcesses } from '../list/process-list'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { FilterForm } from '@components/pages/app/page-templates/filter-form'
import { isInValidEntityId } from '@lib/util'
import { DELAY_BOUNCE_TIME } from '@const/filters'
import { TopDiv } from '@components/pages/app/page-templates/list-page'
import { IRadioOpts, RadioGroup } from '@components/elements/radio'

export const ProcessFilter = ({
                                onEnableFilter,
                                title,
                              }: {
  onEnableFilter: { (tempFilter: IFilterProcesses): void }
  title: ReactNode
}) => {
  const [tempFilter, setTempFilter] = useState<IFilterProcesses>({})

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
      <SelectorContainer>
        <FlexContainer
          alignItem={FlexAlignItem.Start}
          justify={FlexJustifyContent.Start}
        >
          <ProcessStatusSelector
            tempFilter={tempFilter}
            setTempFilter={setTempFilter}
          />
        </FlexContainer>
      </SelectorContainer>
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
          onChange={(ev) => {
            tempFilter.withResults = ev.target.checked
            setTempFilter(Object.assign({}, tempFilter))
          }}
          text={i18n.t('processes.filter.show_only_processes_with_results')}
          labelColor={colors.text}
        />
      </CheckBoxContainer>
      <DivWithMarginChildren>
        <InputSearch
          wide
          placeholder={i18n.t(
            'processes.filter.search'
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

const SelectorContainer = styled(Column)`
  margin: 0;
`

const ProcessStatusSelector = ({
                                 tempFilter,
                                 setTempFilter,
                               }: {
  tempFilter: IFilterProcesses
  setTempFilter: { (tempFilter: IFilterProcesses): void }
}) => {
  const { i18n } = useTranslation()

  const opts: IRadioOpts[] = [
    {
      label: i18n.t('processes.filter.status_selector.all'),
      key: 'ALL',
    },
    {
      label: i18n.t('processes.filter.status_selector.active'),
      key: 'RESULTS',
    },
    {
      label: i18n.t('processes.filter.status_selector.paused'),
      key: 'PAUSED',
    },
    {
      label: i18n.t('processes.filter.status_selector.ended'),
      key: 'ENDED',
    },
  ]

  return (
    <ButtonGroupContainer>
      <RadioGroup
        name={"process-filter"}
        defaultValue={'ALL'}
        onChange={(value) => {
          if (value === 'ALL') tempFilter.status = null
          else {
            tempFilter.status = VochainProcessStatus[
              value as string
              ] as any as VochainProcessStatus
          }
          setTempFilter(Object.assign({}, tempFilter))
        }}
        options={opts}
      ></RadioGroup>
    </ButtonGroupContainer>
  )
}

const CheckBoxContainer = styled(FlexContainer)`
  align-items: center;
  margin-right: 20px;
`

const SearchBoxContainer = styled(Grid)`
  margin: 0 0 0;

  div[class^='inputs__'], div[class*=' inputs__']{
    margin: 0;
  }

  @media ${({ theme }) => theme.screenMax.tablet} {
    flex-direction: column-reverse;
  }
`

const FilterContainer = styled(ColumnDiv)`
  margin: 0 10px;
`

const ButtonGroupContainer = styled.div`
  background-color: transparent;
  margin: 0 0 0 0;
  width: 100%;

  label {
    flex-grow: 1;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 1;
    gap: 5px;
  }

  @media ${({ theme }) => theme.screenMin.tablet} {
    label > span {
      padding: 0 1.5rem !important;
    }
  }
`
