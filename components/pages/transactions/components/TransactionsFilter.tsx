import { useTranslation } from 'react-i18next';
import { InputSearch } from '@components/elements/inputs';
import { InlineFlex } from '@components/elements/flex';
import { DivWithMarginChildren } from '@components/elements/styled-divs';
import { useCallback, useEffect, useState } from 'react';
import { FilterForm } from '@components/pages/app/page-templates/filter-form';
import { DELAY_BOUNCE_TIME } from '@const/filters';

// Used to filter blocks by height
export interface IFilterTransactions {
  from?: number;
}

export const TransactionsFilter = ({ setFilter }: { setFilter: (IFilterTransactions) => void }) => {
  const { i18n } = useTranslation();

  const [searchTermIT, setSearchTermIT] = useState('');

  const [tempFilter, setTempFilter] = useState<IFilterTransactions>({});

  const resetFilter = () => {
    setTempFilter({});
    setSearchTermIT('');
  };

  const _onEnableFilter = useCallback(() => {
    setFilter(Object.assign({}, tempFilter));
  }, [setFilter, tempFilter]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      _onEnableFilter();
    }, DELAY_BOUNCE_TIME);
    return () => clearTimeout(delayDebounceFn);
  }, [_onEnableFilter, tempFilter]);

  return (
    <FilterForm onEnableFilter={_onEnableFilter}>
      <InlineFlex>
        <DivWithMarginChildren>
          <InputSearch
            wide
            placeholder={i18n.t('transactions.filter.search')}
            value={searchTermIT}
            onChange={(ev) => {
              if (ev.target.value.length === 0) {
                resetFilter();
              } else {
                setSearchTermIT(ev.target.value);
                tempFilter.from = +ev.target.value;
                setTempFilter(Object.assign({}, tempFilter));
              }
            }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key) && event.key !== 'Enter') {
                event.preventDefault();
              }
            }}
          />
        </DivWithMarginChildren>
      </InlineFlex>
    </FilterForm>
  );
};
