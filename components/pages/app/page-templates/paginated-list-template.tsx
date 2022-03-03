import { Paginator } from '@components/blocks/paginator'
import { Column, Grid } from '@components/elements/grid'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import i18n from '@i18n'
import { Card } from '@components/elements/cards'
import { Skeleton } from '@components/blocks/skeleton'

interface IPaginatedListTemplateProps<Elements, RenderedElements> {
  loading?: boolean
  setLoading: (loading: boolean) => void
  skeletonItems?: number
  pageSize?: number

  totalElementsCount: number
  cachedElements: Elements[]
  renderedElements: RenderedElements[]

  currentPage: number
  setCurrentPage: (currentPage: number) => void

  loadMoreElements: () => void
  setRendererElements:{(toRender:Elements[]): void}
  renderElementItem: (element: ReactNode) => void
}

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

export const PaginatedListTemplate = <Elements, RenderedElements>({
  loading,
  setLoading,
  skeletonItems = 3,
  pageSize = 10,

  // The total elements that are going to be shown. Could be bigger than cached
  // elements
  totalElementsCount,
  // Total elements cached. Used to load next batch of cached elements. See
  // _beforePaginateCb function
  cachedElements,
  // Elements to be rendered. Length will be pageSize. This are defined outside
  // so we can get the information from outside using specific hooks. See
  // processes example
  renderedElements,

  // Used to change the page pon the parent element
  currentPage,
  setCurrentPage,

  // Callback function called when we need to load more cached elements
  loadMoreElements,
  // Set what cached elements we need to render
  setRendererElements,
  // Function to render a element item. For example, write info inside JXS code
  renderElementItem,
}: IPaginatedListTemplateProps<Elements, RenderedElements> ) => {
  // Get index for first and last process index on the current page
  const _getPageIndexes = useCallback(
    (page: number) => {
      const firstPageIndex = (page - 1) * pageSize
      const lastPageIndex = firstPageIndex + pageSize
      return { firstPageIndex, lastPageIndex }
    },
    [pageSize]
  )

  // const renderedProcess = useMemo(() => {
  useEffect(() => {
    if (cachedElements.length === 0) {
      setLoading(false)
      setRendererElements([])
    }
    const { firstPageIndex, lastPageIndex } = _getPageIndexes(currentPage)
    setRendererElements(cachedElements.slice(firstPageIndex, lastPageIndex))
  }, [
    currentPage,
    cachedElements,
    _getPageIndexes,
    setRendererElements,
    setLoading,
  ])

  /**
   * This is used when the total count of elements is less than cachedElements
   * lenght
   *
   * This could happend when loading data from 64 to 64 pagination from the
   * backend.
   */
  const _beforePaginateCb = (nextPage: number, ) => {
    const { lastPageIndex } = _getPageIndexes(nextPage)
    if (
      nextPage > currentPage &&
      lastPageIndex >= cachedElements.length &&
      cachedElements.length + 1 < totalElementsCount
    ) {
      setLoading(true)
      loadMoreElements()
    }
    return true
  }

  return (
    <Grid>
      {loading ? (
        renderSkeleton(skeletonItems)
      ) : cachedElements != null &&
        cachedElements.length &&
        renderedElements?.length ? (
        <>
          <Column md={8} sm={12}>
            <Paginator
              totalCount={totalElementsCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              beforePaginateCb={_beforePaginateCb}
              disableGoLastBtn
            ></Paginator>
          </Column>
          <Column md={8} sm={12}>
            {renderedElements.map(renderElementItem)}
          </Column>
        </>
      ) : (
        <h1>{i18n.t('elections.no_elections_found')}</h1>
      )}
    </Grid>
  )
}

interface IUsePaginatedListProps<Filter, DataList> {
  filter: Filter
  setFilter: (Filter: Filter) => void
  dataList: DataList[]
  backendDataPagination: number
  setBackendDataPagination: (number) => void
  backendPaginationIncrement?: number
}

export function usePaginatedList <Filter, DataList>({
  filter,
  setFilter,
  dataList,
  backendDataPagination,
  setBackendDataPagination,
  backendPaginationIncrement = 64,
}: IUsePaginatedListProps<Filter, DataList>) {

  const [cachedData, setCachedData] = useState<DataList[]>([])

  // Return true if two JSON.stringify objects are equal 
  const compareJSONObjects = (obj1, obj2) =>
    JSON.stringify(obj1) === JSON.stringify(obj2)

  ///////////////////////////////
  // PAGINATOR
  ///////////////////////////////

  // Paginator current page
  const [currentPage, setCurrentPage] = useState(1)

  // When processIds are retrieved, update the list of already loaded process ids
  // Used for pagination, if we need to load next 64 processes
  useEffect(() => {
    // if (loading != true) setLoading(true)
    if(!compareJSONObjects(cachedData, dataList)) setCachedData(cachedData.concat(dataList))
  }, [dataList])

  const [renderedData, setRenderedData] = useState<DataList[]>()

  const loadMoreData = () => {
    setBackendDataPagination(backendDataPagination + backendPaginationIncrement)
  }


  // Set the page at initial state
  const resetPage = useCallback(() => {
    setCurrentPage(1)
    setCachedData([])
    setRenderedData([])
  }, [])

  ///////////////////////////////
  // Filter
  ///////////////////////////////

  const enableFilter = (tempFilter) => {
    if (!compareJSONObjects(filter, tempFilter)) {
      resetPage()
      setFilter(Object.assign({}, tempFilter))
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
    cachedData,
    renderedData,
    currentPage,
    backendDataPagination,
    methods: {
      enableFilter,
      disableFilter,
      setRenderedData,
      setCurrentPage,
      loadMoreData,
    },
  }
}
