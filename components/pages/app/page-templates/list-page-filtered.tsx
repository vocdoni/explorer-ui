import { Paginator } from '@components/blocks/paginator'
import {
  FlexContainer,
  FlexAlignItem,
  FlexJustifyContent,
} from '@components/elements/flex'
import { Column, Grid } from '@components/elements/grid'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { renderSkeleton } from './list-page'

const skeletonItems = 3

interface IPaginatedListTemplateProps<Elements> {
  loading: boolean
  elementsList: Elements[]
  totalElementsCount: number
  pageSize?: number

  // Function that render map of elements
  renderElementFunction: (element: ReactNode) => void

  currentPage: number
  setCurrentPage: (x: number) => void
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
  const { i18n } = useTranslation()

  const paginator = () => (
    <Paginator
      totalCount={totalElementsCount}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
      disableGoLastBtn
    ></Paginator>
  )

  return (
    <>
      {loading ? (
        renderSkeleton(skeletonItems)
      ) : elementsList != null && elementsList.length ? (
        <>
          <Grid>
            <Column>{elementsList.map(renderElementFunction)}</Column>
          </Grid>
          <FlexContainer
            alignItem={FlexAlignItem.End}
            justify={FlexJustifyContent.End}
          >
            {paginator()}
          </FlexContainer>
        </>
      ) : (
        <h1>{i18n.t('paginated_template.no_elements_found')}</h1>
      )}
    </>
  )
}

interface IUsePaginatedListProps<Filter> {
  pageSize?: number
  // Paginate elements
  setDataPagination: (newIndex: number) => void
  filter: Filter
  setFilter: (Filter: Filter) => void
  lastElement: number
}

export function useFilteredPaginatedList<Filter>({
  pageSize,
  filter,
  setFilter,
  setDataPagination,
  lastElement,
}: IUsePaginatedListProps<Filter>) {
  ///////////////////////////////
  // PAGINATOR
  ///////////////////////////////

  // Paginator current page
  const [currentPage, setCurrentPage] = useState(1)

  // const getFirstPageIndex = (page) => page * pageSize
  const getFirstPageIndex = (page) => lastElement - page * pageSize

  // When current page changed get next blocks
  // useEffect(() => {
  //   setDataPagination(getFirstPageIndex(currentPage - 1))
  // }, [currentPage])
  useEffect(() => {
    if (lastElement) {
      setDataPagination(getFirstPageIndex(currentPage))
    }
  }, [currentPage, lastElement])

  ///////////////////////////////
  // FILTER
  ///////////////////////////////

  // Return true if two JSON.stringify objects are equal
  const compareJSONObjects = (obj1, obj2) =>
    JSON.stringify(obj1) === JSON.stringify(obj2)

  // Set the page at initial state
  const resetPage = useCallback(() => {
    setCurrentPage(1)
    setDataPagination(0)
  }, [])

  const enableFilter = (tempFilter) => {
    if (!compareJSONObjects(filter, tempFilter)) {
      resetPage()
      setFilter({ ...tempFilter })
    }
  }

  const disableFilter = (tempFilter, resetForm: { (): void }) => {
    resetForm()
    if (
      Object.keys(filter).length !== 0 // Check if filter is already reset
    ) {
      resetPage()
      setFilter({} as Filter)
    }
  }

  return {
    currentPage,
    methods: {
      enableFilter,
      disableFilter,
      setCurrentPage,
    },
  }
}
