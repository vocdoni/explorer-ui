import { Paginator } from '@components/blocks/paginator'
import { Column, Grid } from '@components/elements/grid'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import i18n from '@i18n'
import { Card } from '@components/elements/cards'
import { Skeleton } from '@components/blocks/skeleton'

export const renderSkeleton = (skeletonItems) => {
  return (
    <Column md={8} sm={12}>
      {Array(skeletonItems)
        .fill(0)
        .map((value, index: number) => (
          <Card key={index}>
            <Skeleton />
          </Card>
        ))}
    </Column>
  )
}

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

export const PaginatedListTemplate = <Elements,>({
  loading,
  elementsList,
  totalElementsCount,
  pageSize = 10,
  renderElementFunction,
  currentPage,
  setCurrentPage,
}: IPaginatedListTemplateProps<Elements>) => {
  return (
    <Grid>
      {loading ? (
        renderSkeleton(skeletonItems)
      ) : elementsList != null && elementsList.length ? (
        <>
          <Column md={8} sm={12}>
            <Paginator
              totalCount={totalElementsCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              disableGoLastBtn
            ></Paginator>
          </Column>
          <Column md={8} sm={12}>
            {elementsList.map(renderElementFunction)}
          </Column>
        </>
      ) : (
        <h1>{i18n.t('elections.no_elections_found')}</h1>
      )}
    </Grid>
  )
}

interface IUsePaginatedListProps<Filter> {
  pageSize?: number
  // Paginate elements
  setDataPagination: (newIndex: number) => void
  filter: Filter
  setFilter: (Filter: Filter) => void
}

export function usePaginatedList<Filter,>({
  pageSize = 10,
  filter,
  setFilter,
  setDataPagination,
}: IUsePaginatedListProps<Filter>) {
  ///////////////////////////////
  // PAGINATOR
  ///////////////////////////////

  // Paginator current page
  const [currentPage, setCurrentPage] = useState(1)

  const getFirstPageIndex = (page) => page * pageSize

  // When current page changed get next blocks
  useEffect(() => {
    setDataPagination(getFirstPageIndex(currentPage - 1))
  }, [currentPage])

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
