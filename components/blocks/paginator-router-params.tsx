import { Paginator, PaginatorProps } from './paginator'
import { usePaginatorRouter } from '@hooks/use-pagination-router'


export const PaginatorRouterParams = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  disableGoFirstBtn = false,
  disableGoLastBtn = false,
}: PaginatorProps) => {

  usePaginatorRouter({onPageChange, currentPage})

  return <Paginator
    totalCount={totalCount}
    pageSize={pageSize}
    currentPage={currentPage}
    onPageChange={onPageChange}
    disableGoFirstBtn={disableGoFirstBtn}
    disableGoLastBtn={disableGoLastBtn}
  ></Paginator>

}
