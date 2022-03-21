import { Paginator } from '@components/blocks/paginator'
import { Column } from '@components/elements/grid'
import {
  renderSkeleton,
} from '@components/pages/app/page-templates/paginated-list-template'
import { useTransactionById } from '@hooks/use-transactions'
import i18n from '@i18n'
import { TxById } from '@lib/types'
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
  const renderTransactionItem = (transaction: TxById) => {

    return (
      <div key={transaction.hash}>Transaction Height: {transaction.id}</div>
    )
  }
  const [loading, setLoading] = useState(true)
  // Current paginator page
  const [currentPage, setCurrentPage] = useState(1)
  // const [filter, setFilter] = useState<IFilterBlocks>({})
  // Current from offset calling the backend
  const [dataPagination, setDataPagination] = useState<number>()

  const { transactions, loading: loadingTransactions } = useTransactionById({
    from: dataPagination,
    listSize: pageSize,
    reverse: true
  })

  // Set loading
  useEffect(() => {
    setLoading(loadingTransactions || dataPagination == null || transactionHeight == null )
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
    if(transactionHeight) setDataPagination( transactionHeight - getFirstPageIndex(currentPage))
  }, [currentPage, transactionHeight])

  return (
    <>
      {/* <BlocksFilter setFilter={setFilter}></BlocksFilter> */}
      {(loading && !transactions?.length ) ||  transactionHeight == null ? (
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
