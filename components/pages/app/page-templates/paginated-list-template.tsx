import { Paginator } from '@components/blocks/paginator'
import { Column, Grid } from '@components/elements/grid'
import { useCallback, useEffect } from 'react'
import i18n from '@i18n'
import { Card } from '@components/elements/cards'
import { Skeleton } from '@components/blocks/skeleton'

interface IPaginatedListTemplateProps {
  loading?: boolean
  setLoading: (loading: boolean) => void
  skeletonItems?: number
  pageSize?: number

  totalElementsCount: number
  cachedElements: any[]
  renderedElements: any[]

  currentPage: number
  setCurrentPage: (currentPage: number) => void

  loadMoreElements: () => void
  setRendererElements: (toRender: any[]) => void
  renderElementItem: (element: any) => void
}

export const PaginatedListTemplate = ({
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
}: IPaginatedListTemplateProps) => {
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

  const renderSkeleton = () => {
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

  return (
    <Grid>
      {loading ? (
        renderSkeleton()
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