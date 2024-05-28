import { useTranslation } from 'next-i18next';
import { InputSearch } from '@components/elements/inputs';
import { InlineFlex } from '@components/elements/flex';
import { DivWithMarginChildren } from '@components/elements/styled-divs';
import { useCallback, useEffect, useState } from 'react';
import { FilterForm } from '@components/pages/app/page-templates/filter-form';
import { DELAY_BOUNCE_TIME } from '@const/filters';

// Used to send filter to the useProcessesList hook
export interface IFilterEntity {
  searchTerm?: string;
}

export const OrganizationsFilter = ({ onEnableFilter }: { onEnableFilter: { (tempFilter: IFilterEntity): void } }) => {
  const { t } = useTranslation();
  const [searchTermIT, setSearchTermIT] = useState('');

  const [tempFilter, setTempFilter] = useState<IFilterEntity>({});

  const _onEnableFilter = useCallback(() => {
    onEnableFilter(tempFilter);
  }, [onEnableFilter, tempFilter]);

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
            placeholder={t('organizations.filter.search_by_org_address')}
            value={searchTermIT}
            onChange={(ev) => {
              if (ev.target.value.length === 0) {
                setSearchTermIT(ev.target.value);
                setTempFilter({});
              } else {
                setSearchTermIT(ev.target.value);
                tempFilter.searchTerm = ev.target.value;
                setTempFilter(Object.assign({}, tempFilter));
              }
            }}
          />
        </DivWithMarginChildren>
      </InlineFlex>
    </FilterForm>
  );
};
