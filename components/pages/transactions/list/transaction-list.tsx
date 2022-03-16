import { Paginator } from '@components/blocks/paginator'
import { Column } from '@components/elements/grid'
import {
  renderSkeleton,
} from '@components/pages/app/page-templates/paginated-list-template'
import { useTransactionByHeight } from '@hooks/use-transactions'
import i18n from '@i18n'
import { TxByHeight } from '@lib/types'
import React, { useEffect, useState } from 'react'


interface IDashboardTransactionsListProps {
  pageSize?: number
  transactionHeight: number
  skeletonItems?: number
}

export const DashboardTransactionsList = ({
  pageSize = 10,
  transactionHeight,
  skeletonItems = 4,
}: IDashboardTransactionsListProps) => {

  // Render item on the list from it summary
  const renderTransactionItem = (transaction: TxByHeight) => {

    console.debug(transaction)

    return (
      <div>Transaction Height: {transaction.height}</div>
    )
  }
  const [loading, setLoading] = useState(true)
  // Current paginator page
  const [currentPage, setCurrentPage] = useState(1)
  // const [filter, setFilter] = useState<IFilterBlocks>({})
  // Current from offset calling the backend
  const [dataPagination, setDataPagination] = useState(-1)

  const { transactions, loading: loadingTransactions } = useTransactionByHeight({
    from: dataPagination,
    listSize: pageSize,
  })

  // Set loading
  useEffect(() => {
    setLoading(loadingTransactions && dataPagination > 0)
  }, [loadingTransactions, dataPagination])

  const getFirstPageIndex = (page) =>
    (page) * pageSize 

  // Jump to block
  // useEffect(() => {
  //   const totalPages = Math.ceil((transactionHeight / pageSize)) 
  //   if (filter.from) {
  //     // Get the page where the block are you searching is
  //     const page = (totalPages + 1 - Math.ceil(filter.from / pageSize) ) 
  //     setCurrentPage(page)
  //   } else {
  //     setCurrentPage(1)
  //   }
  // }, [filter])

  // When current page changed get next blocks
  useEffect(() => {
    setDataPagination(transactionHeight - getFirstPageIndex(currentPage))
  }, [currentPage, transactionHeight])

  return (
    <>
      {/* <BlocksFilter setFilter={setFilter}></BlocksFilter> */}
      {(loading && !transactions?.length ) ||  transactionHeight === null ? (
        renderSkeleton(skeletonItems)
      ) : transactions != null && transactions.length ? (
        <>

      <Column md={8} sm={12}>
        <Paginator
          totalCount={transactionHeight}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          disableGoLastBtn
        ></Paginator>
      </Column>
          <Column md={8} sm={12}>
            {transactions.map(renderTransactionItem)}
          </Column>
        </>
      ) : (
        <h1>{i18n.t('transactions.no_transactions_found')}</h1>
      )}
    </>
  )
}
