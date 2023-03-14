import { useTranslation } from 'react-i18next';
import { InputSearch } from '@components/elements/inputs';
import { InlineFlex } from '@components/elements/flex';
import { DivWithMarginChildren } from '@components/elements/styled-divs';
import { useEffect, useState } from 'react';
import { FilterForm } from '@components/pages/app/page-templates/filter-form';
import { DELAY_BOUNCE_TIME } from '@const/filters';

// Used to send filter to the useProcessesList hook
export interface IFilterEntity {
  searchTerm?: string;
}

export const EntitiesFilter = ({ onEnableFilter }: { onEnableFilter: { (tempFilter: IFilterEntity): void } }) => {
  const { i18n } = useTranslation();

  const [searchTermIT, setSearchTermIT] = useState('');

  const [tempFilter, setTempFilter] = useState<IFilterEntity>({});

  const _onEnableFilter = () => {
    onEnableFilter(tempFilter);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      _onEnableFilter();
    }, DELAY_BOUNCE_TIME);
    return () => clearTimeout(delayDebounceFn);
  }, [tempFilter]);

  return (
    <FilterForm onEnableFilter={_onEnableFilter}>
      <InlineFlex>
        <DivWithMarginChildren>
          <InputSearch
            wide
            placeholder={i18n.t('organizations.filter.search')}
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
