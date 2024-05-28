import { PaginatorRouterParams } from '@components/blocks/paginator-router-params';
import { FlexContainer, FlexAlignItem, FlexJustifyContent } from '@components/elements/flex';
import { Column, ListCardContainer } from '@components/elements/grid';
import { ReactNode, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { Else, If, Then } from 'react-if';
import { renderSkeleton } from './list-page';

const skeletonItems = 3;

interface IPaginatedListTemplateProps<Elements> {
  loading: boolean;
  elementsList: Elements[];
  totalElementsCount: number;
  pageSize?: number;
  // Function that render map of elements
  renderElementFunction: (element: never, i: number) => ReactNode;
  currentPage: number;
  setCurrentPage: (x: number) => void;
}

export const FilteredPaginatedList = <Elements,>({
  loading,
  elementsList,
  totalElementsCount,
  pageSize,
  renderElementFunction,
  currentPage,
  setCurrentPage,
}: IPaginatedListTemplateProps<Elements>) => {
  const { t } = useTranslation();
  const paginator = () => (
    <PaginatorRouterParams
      totalCount={totalElementsCount}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
      disableGoLastBtn={totalElementsCount === null}
    ></PaginatorRouterParams>
  );

  return (
    <>
      <If condition={loading || elementsList === undefined}>
        <Then>{renderSkeleton(skeletonItems)}</Then>
        <Else>
          <If condition={elementsList != null && elementsList.length}>
            <Then>
              <>
                <ListCardContainer>
                  <Column>{elementsList?.map(renderElementFunction)}</Column>
                </ListCardContainer>
                <FlexContainer alignItem={FlexAlignItem.Start} justify={FlexJustifyContent.Start}>
                  {paginator()}
                </FlexContainer>
              </>
            </Then>
            <Else>
              <h1>{t('paginated_template.no_elements_found')}</h1>
            </Else>
          </If>
        </Else>
      </If>
    </>
  );
};

interface IUsePaginatedSDKListProps<Filter> {
  setCurrentPage: (newIndex: number) => void;
  filter: Filter;
  setFilter: (Filter: Filter) => void;
}

export function useFilteredSDKPaginatedList<Filter>({
  filter,
  setFilter,
  setCurrentPage,
}: IUsePaginatedSDKListProps<Filter>) {
  // Return true if two JSON.stringify objects are equal
  const compareJSONObjects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

  // Set the page at initial state
  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  const enableFilter = (tempFilter) => {
    if (!compareJSONObjects(filter, tempFilter)) {
      resetPage();
      setFilter({ ...tempFilter });
    }
  };

  const disableFilter = (tempFilter, resetForm: { (): void }) => {
    resetForm();
    // Check if filter is already reset
    if (Object.keys(filter).length !== 0) {
      resetPage();
      setFilter({} as Filter);
    }
  };

  return {
    methods: {
      enableFilter,
      disableFilter,
    },
  };
}
