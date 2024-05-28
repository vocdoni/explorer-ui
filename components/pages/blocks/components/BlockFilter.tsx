import { useTranslation } from 'next-i18next';
import { InputSearch } from '@components/elements/inputs';
import { InlineFlex } from '@components/elements/flex';
import { DivWithMarginChildren } from '@components/elements/styled-divs';
import { useCallback, useEffect, useState } from 'react';
import { FilterForm } from '@components/pages/app/page-templates/filter-form';
import { DELAY_BOUNCE_TIME } from '@const/filters';

// Used to filter blocks by height
export interface IFilterBlocks {
  from?: number;
}

export const BlocksFilter = ({ setFilter }: { setFilter: (IFilterBlocks) => void }) => {
  const { t } = useTranslation();
  const [searchTermIT, setSearchTermIT] = useState('');

  const [tempFilter, setTempFilter] = useState<IFilterBlocks>({});

  const resetFilter = useCallback(() => {
    setTempFilter({});
    setSearchTermIT('');
  }, []);

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
            placeholder={t('blocks.filter.search')}
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
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </DivWithMarginChildren>
      </InlineFlex>
    </FilterForm>
  );
};
