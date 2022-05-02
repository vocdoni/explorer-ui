import { useTranslation } from 'react-i18next'
import { Grid } from '@components/elements/grid'
import { Input } from '@components/elements/inputs'
import { FlexContainer } from '@components/elements/flex'
import { DivWithMarginChildren } from '@components/elements/styled-divs'
import { SubmitFilterButtons } from '@components/blocks/filters/submit-buttons'
import { useState } from 'react'

// Used to filter blocks by height
export interface IFilterTransactions {
    from?: number
  }
  
export const TransactionsFilter = ({setFilter}: {setFilter: (IFilterTransactions) => void}) => {
  const { i18n } = useTranslation()

  const [searchTermIT, setSearchTermIT] = useState('')


  const [tempFilter, setTempFilter] = useState<IFilterTransactions>({})

  const resetFilter = () => {
    setTempFilter({})
    setSearchTermIT('')
  }

  const _onEnableFilter = () => {
    setFilter(Object.assign({}, tempFilter))
  }
  const _onDisableFilter = () => {
    setFilter({})
    resetFilter()
  }

  return (
    <>
      <DivWithMarginChildren>
        <Input
          placeholder={i18n.t('transactions.filter.search_by_transaction_height')}
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