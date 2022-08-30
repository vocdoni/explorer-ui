import { useTranslation } from 'react-i18next'
import { Column, Grid } from '@components/elements/grid'
import { Input } from '@components/elements/inputs'
import { FlexContainer, InlineFlex } from '@components/elements/flex'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { SubmitFilterButtons } from '@components/blocks/filters/submit-buttons'
import { useEffect, useState } from 'react'
import { FilterForm } from '@components/pages/app/page-templates/filter-form'
import { DELAY_BOUNCE_TIME } from '@const/filters'

// Used to filter blocks by height
export interface IFilterBlocks {
  from?: number
}

export const BlocksFilter = ({
  setFilter,
}: {
  setFilter: (IFilterBlocks) => void
}) => {
  const { i18n } = useTranslation()

  const [searchTermIT, setSearchTermIT] = useState('')

  const [tempFilter, setTempFilter] = useState<IFilterBlocks>({})

  const resetFilter = () => {
    setTempFilter({})
    setSearchTermIT('')
  }

  const _onEnableFilter = () => {
    setFilter(Object.assign({}, tempFilter))
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      _onEnableFilter()
    }, DELAY_BOUNCE_TIME)
    return () => clearTimeout(delayDebounceFn)
  }, [tempFilter])

  return (
    <FilterForm onEnableFilter={_onEnableFilter}>
      <InlineFlex>
        <DivWithMarginChildren>
          <Input
            wide
            placeholder={i18n.t('blocks.filter.search_by_block_height')}
            value={searchTermIT}
            onChange={(ev) => {
              if (ev.target.value.length === 0) {
                resetFilter()
              } else {
                setSearchTermIT(ev.target.value)
                tempFilter.from = +ev.target.value
                setTempFilter(Object.assign({}, tempFilter))
              }
            }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault()
              }
            }}
          />
        </DivWithMarginChildren>
      </InlineFlex>
    </FilterForm>
  )
}
