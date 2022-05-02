import { Paginator } from '@components/blocks/paginator'
import { Column } from '@components/elements/grid'
import {
  InvertedPaginatedListTemplate,
  useInvertedPaginatedList,
} from '@components/pages/app/page-templates/inverted-paginated-list-template'
import { renderSkeleton } from '@components/pages/app/page-templates/paginated-list-template'
import { useTxListById } from '@hooks/use-transactions'
import { TxById } from '@lib/types'
import React, { useEffect, useState } from 'react'
import {
  IFilterTransactions,
  TransactionsFilter,
} from '../components/transactions-filter'
import { DashboardTransactionItem } from './transaction-list-item'

interface IDashboardTransactionsListProps {
  pageSize?: number
  transactionHeight: number
  skeletonItems?: number
}

export const DashboardTransactionsList = ({
  pageSize,
  transactionHeight,
  skeletonItems = 4,
}: IDashboardTransactionsListProps) => {
  // Render item on the list from it summary
  const renderTransactionItem = (transaction: TxById) => {
    return (
      <DashboardTransactionItem key={transaction?.id} transactionData={transaction}></DashboardTransactionItem>
    )
  }

  const [filter, setFilter] = useState<IFilterTransactions>({})
  const [jumpTo, setJumpTo] = useState<number>()
  // Current from offset calling the backend
  const [dataPagination, setDataPagination] = useState<number>()

  const { transactions, loading: loadingTransactions } = useTxListById({
    from: dataPagination,
    listSize: pageSize,
    reverse: true,
  })

  const {
    loading,
    currentPage,
    methods: { setCurrentPage },
  } = useInvertedPaginatedList({
    pageSize: pageSize,
    lastElement: transactionHeight,
    loadingElements: loadingTransactions,
    jumpTo: jumpTo,
    setDataPagination: setDataPagination,
    dataPagination: dataPagination,
  })

  useEffect(() => {
    setJumpTo(filter.from)
  }, [filter])

  return (
    <>
      <InvertedPaginatedListTemplate
        filter={<TransactionsFilter setFilter={setFilter}></TransactionsFilter>}
        loading={loading}
        elementsList={transactions}
        totalElementsCount={transactionHeight}
        renderElementFunction={renderTransactionItem}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}
