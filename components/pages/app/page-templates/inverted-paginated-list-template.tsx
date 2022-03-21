import { Paginator } from '@components/blocks/paginator'
import { Column } from '@components/elements/grid'
import i18n from '@i18n'
import { ReactNode, useEffect, useState } from 'react'
import { renderSkeleton } from './paginated-list-template'

const skeletonItems = 3

interface IPaginatedListTemplateProps<Elements> {
  loading: boolean
  filter: ReactNode
  elementsList: Elements[]
  totalElementsCount: number
  pageSize?: number
//   // Function that render map of elements
  renderElementFunction: (element: ReactNode) => void
  currentPage: number
  setCurrentPage: (x: number) => void
}

/**
 * Template for those pages that show a list that starts from the end element
 */
export const InvertedPaginatedListTemplate = <Elements,>({
  loading,
  filter,
  elementsList,
  totalElementsCount,
  pageSize = 10,
  renderElementFunction,
  currentPage,
  setCurrentPage,
}: IPaginatedListTemplateProps<Elements>) => {
  return (
    <>
      {filter}
      {(loading && !elementsList?.length) || totalElementsCount == null ? (
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
        <h1>{i18n.t('paginated_template.no_elements_found')}</h1>
      )}
    </>
  )
}

interface IUseInvertedPaginatedListProps {
  pageSize?: number
  lastElement: number
  loadingElements: boolean
  jumpTo: number 
  setDataPagination: (newIndex: number) => void
  dataPagination: number
}

export function useInvertedPaginatedList({
  pageSize = 10,
  lastElement,
  loadingElements,
  jumpTo,
  setDataPagination,
  dataPagination
}: IUseInvertedPaginatedListProps) {
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)


  // Set loading
  useEffect(() => {
    setLoading(loadingElements || dataPagination == null || lastElement == null)
  }, [loadingElements, dataPagination])

  const getFirstPageIndex = (page) => page * pageSize

  // Jump to height on filter
  useEffect(() => {
    const totalPages = Math.ceil(lastElement / pageSize)
    if (jumpTo) {
      // Get the page where the block are you searching is
      const page = totalPages - Math.ceil(jumpTo / pageSize)
      setCurrentPage(page)
    } else {
      setCurrentPage(1)
    }
  }, [jumpTo])

  // When current page changed get next blocks
  useEffect(() => {
    if(lastElement) setDataPagination( lastElement - getFirstPageIndex(currentPage))
  }, [currentPage, lastElement])

  return {
    loading,
    currentPage,
    methods: {
      setCurrentPage,
    },
  }
}
