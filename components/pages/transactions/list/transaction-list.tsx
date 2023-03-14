import { InlineTitleChildrenContainer } from '@components/pages/app/page-templates/list-page';
import { useJumpToPaginatedList, JumpToPaginatedList } from '@components/pages/app/page-templates/list-page-jump-to';
import { useTxListById } from '@hooks/use-transactions';
import { TxById } from '@lib/types';
import React, { ReactNode, useEffect, useState } from 'react';
import { IFilterTransactions, TransactionsFilter } from '../components/transactions-filter';
import { DashboardTransactionItem } from './transaction-list-item';

interface IDashboardTransactionsListProps {
  pageSize?: number;
  transactionHeight: number;
  skeletonItems?: number;
  title: ReactNode;
}

export const DashboardTransactionsList = ({ pageSize, transactionHeight, title }: IDashboardTransactionsListProps) => {
  // Render item on the list from it summary
  const renderTransactionItem = (transaction: TxById) => {
    return <DashboardTransactionItem key={transaction?.id} transactionData={transaction}></DashboardTransactionItem>;
  };

  const [filter, setFilter] = useState<IFilterTransactions>({});
  const [jumpTo, setJumpTo] = useState<number>();
  // Current from offset calling the backend
  const [dataPagination, setDataPagination] = useState<number>();

  const { transactions, loading: loadingTransactions } = useTxListById({
    from: dataPagination,
    listSize: pageSize,
    reverse: true,
  });

  const {
    loading,
    currentPage,
    methods: { setCurrentPage },
  } = useJumpToPaginatedList({
    pageSize: pageSize,
    lastElement: transactionHeight + 1,
    loadingElements: loadingTransactions,
    jumpTo: jumpTo,
    setDataPagination: setDataPagination,
    dataPagination: dataPagination,
  });

  useEffect(() => {
    setJumpTo(filter.from);
  }, [filter]);

  return (
    <>
      <InlineTitleChildrenContainer title={title}>
        <TransactionsFilter setFilter={setFilter}></TransactionsFilter>
      </InlineTitleChildrenContainer>
      <JumpToPaginatedList
        loading={loading}
        elementsList={transactions}
        totalElementsCount={transactionHeight}
        renderElementFunction={renderTransactionItem}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
      />
    </>
  );
};
