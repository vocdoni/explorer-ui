import { InlineTitleChildrenContainer } from '@components/pages/app/page-templates/list-page';
import { JumpToPaginatedList } from '@components/pages/app/page-templates/list-page-jump-to';
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { IFilterTransactions, TransactionsFilter } from '../components/transactions-filter';
import { useTxList } from '@hooks/use-voconi-sdk';
import { TransactionCard } from '@components/blocks/card/transaction-card';
import { IChainTxReference } from '@vocdoni/sdk';

interface IDashboardTransactionsListProps {
  pageSize?: number;
  transactionHeight: number;
  skeletonItems?: number;
  title: ReactNode;
}

export const DashboardTransactionsList = ({ transactionHeight, title }: IDashboardTransactionsListProps) => {
  // Render item on the list from it summary
  const renderTransactionItem = (transaction: IChainTxReference) => {
    return <TransactionCard tx={transaction}></TransactionCard>;
  };

  const [filter, setFilter] = useState<IFilterTransactions>({});
  const jumpTo = filter.from;
  const [dataPagination, setDataPagination] = useState<number>(0);
  const [paginatorPage, setPaginatorPage] = useState<number>(1);

  const pageSize = 10;
  const lastPage = useMemo(() => Math.floor(transactionHeight / pageSize), [transactionHeight]);

  const getPageFromPosition = useCallback(
    (elementNumber: number) => {
      // Calculate the position of the element in reversed order
      const reversedElementPosition = transactionHeight - elementNumber;
      // Calculate the page number
      return Math.floor(reversedElementPosition / pageSize);
    },
    [transactionHeight]
  );

  // Jump to height on filter
  useEffect(() => {
    if (jumpTo) {
      const page = getPageFromPosition(jumpTo);
      setPaginatorPage(page + 1);
    } else {
      setPaginatorPage(1);
    }
  }, [getPageFromPosition, jumpTo]);

  useEffect(() => {
    if (paginatorPage && (paginatorPage >= 0 || paginatorPage <= lastPage)) {
      setDataPagination(paginatorPage - 1);
    }
  }, [lastPage, paginatorPage]);

  const { data: txList, loading } = useTxList({
    page: dataPagination,
  });

  return (
    <>
      <InlineTitleChildrenContainer title={title}>
        <TransactionsFilter setFilter={setFilter}></TransactionsFilter>
      </InlineTitleChildrenContainer>
      <JumpToPaginatedList
        loading={loading}
        elementsList={txList?.transactions ?? []}
        totalElementsCount={transactionHeight}
        renderElementFunction={renderTransactionItem}
        currentPage={paginatorPage}
        setCurrentPage={setPaginatorPage}
      />
    </>
  );
};
