import { Paginator } from '@components/blocks/paginator'
import { Column } from '@components/elements/grid'
import {
  InvertedPaginatedListTemplate,
  useInvertedPaginatedList,
} from '@components/pages/app/page-templates/inverted-paginated-list-template'
import { InlineTitleChildrenContainer } from '@components/pages/app/page-templates/list-page-template'
import { renderSkeleton } from '@components/pages/app/page-templates/paginated-list-template'
import { useTxListById } from '@hooks/use-transactions'
import { TxById } from '@lib/types'
import React, { ReactNode, useEffect, useState } from 'react'
import {
  IFilterTransactions,
  TransactionsFilter,
} from '../components/transactions-filter'
import { DashboardTransactionItem } from './transaction-list-item'

interface IDashboardTransactionsListProps {
  pageSize?: number
  transactionHeight: number
  skeletonItems?: number
  title: ReactNode
}

export const DashboardTransactionsList = ({
  pageSize,
  transactionHeight,
  skeletonItems = 4,
  title,
}: IDashboardTransactionsListProps) => {
  // Render item on the list from it summary
  const renderTransactionItem = (transaction: TxById) => {
    return (
      <DashboardTransactionItem
        key={transaction?.id}
        transactionData={transaction}
      ></DashboardTransactionItem>
    )
  }

  const [filter, setFilter] = useState<IFilterTransactions>({})
  const [jumpTo, setJumpTo] = useState<number>()
  // Current from offset calling the backend
  const [dataPagination, setDataPagination] = useState<number>(1)

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
      <InlineTitleChildrenContainer title={title}>
        <TransactionsFilter setFilter={setFilter}></TransactionsFilter>
      </InlineTitleChildrenContainer>
      <InvertedPaginatedListTemplate
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
