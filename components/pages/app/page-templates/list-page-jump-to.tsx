import { Column, ListCardContainer } from '@components/elements/grid';
import { useTranslation } from 'react-i18next';
import { ReactNode, useEffect, useState } from 'react';
import { renderSkeleton } from './list-page';
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex';
import { Else, If, Then } from 'react-if';
import { PaginatorRouterParams } from '@components/blocks/paginator-router-params';

const skeletonItems = 3;

interface IPaginatedListTemplateProps<Elements> {
  loading: boolean;
  elementsList: Elements[];
  totalElementsCount: number;
  pageSize?: number;
  // Function that render map of elements
  renderElementFunction: (element: any) => ReactNode;
  currentPage: number;
  setCurrentPage: (x: number) => void;
}

/**
 * Template for those pages that show a list that starts from the end element
 */
export const JumpToPaginatedList = <Elements,>({
  loading,
  elementsList,
  totalElementsCount,
  pageSize = 10,
  renderElementFunction,
  currentPage,
  setCurrentPage,
}: IPaginatedListTemplateProps<Elements>) => {
  const { i18n } = useTranslation();

  const paginator = () => (
    <PaginatorRouterParams
      totalCount={totalElementsCount}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
    ></PaginatorRouterParams>
  );

  return (
    <>
      <If
        condition={
          (loading && !elementsList?.length) ||
          totalElementsCount == null ||
          elementsList === undefined ||
          !elementsList?.length
        }
      >
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
              <h1>{i18n.t('paginated_template.no_elements_found')}</h1>
            </Else>
          </If>
        </Else>
      </If>
    </>
  );
};

interface IUseInvertedPaginatedListProps {
  pageSize?: number;
  lastElement: number;
  loadingElements: boolean;
  jumpTo: number;
  setDataPagination: (newIndex: number) => void;
  dataPagination: number;
}

export function useJumpToPaginatedList({
  pageSize = 10,
  lastElement,
  loadingElements,
  jumpTo,
  setDataPagination,
  dataPagination,
}: IUseInvertedPaginatedListProps) {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Set loading
  useEffect(() => {
    setLoading(loadingElements || dataPagination == null || lastElement == null);
  }, [loadingElements, dataPagination]);

  const getFirstPageIndex = (page) => {
    const index = lastElement - page * pageSize;
    return index < 0 ? 0 : index;
  };

  // Get the page where the block are you searching is
  const getPageFromPosition = () => {
    const totalPages = Math.ceil(lastElement / pageSize);
    return totalPages - Math.ceil(jumpTo / pageSize);
  };

  const jumpToPosition = (newPos) => {
    // Calculate new position
    // const jumpToPosition = (jumpTo + 1) - pageSize
    // But if paginator is used, page can change but the filter could be still set
    // As we are using the paginator with pages instead of with positions, we have to handle
    // the fact that somebody jump to a position and then advance the page.
    // todo(ritmo): use paginator based on positions and not on pages for easy use.
    const pageOfPosition = getPageFromPosition();
    const offset = () => newPos + 1 - getFirstPageIndex(pageOfPosition);
    setDataPagination(getFirstPageIndex(currentPage) + offset() - pageSize);
  };

  // Jump to height on filter
  useEffect(() => {
    if (jumpTo) {
      const page = getPageFromPosition();
      // Sometimes you want to jump to a position that is in the same page that previous position
      if (page === currentPage) {
        jumpToPosition(jumpTo);
      } else {
        setCurrentPage(page);
      }
    } else {
      setCurrentPage(1);
    }
  }, [jumpTo]);

  // When current page changed get next blocks
  useEffect(() => {
    if (lastElement) {
      // If jumpTo is set (from the page filter), don't use normal pagination
      if (jumpTo) {
        jumpToPosition(jumpTo);
      } else setDataPagination(getFirstPageIndex(currentPage));
    }
  }, [currentPage, lastElement]);

  return {
    loading,
    currentPage,
    methods: {
      setCurrentPage,
    },
  };
}
