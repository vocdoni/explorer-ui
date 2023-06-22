import { TransactionTypeBadge } from '@components/blocks/badges/transaction-type-badge';
import { GenericListItemWithBadge } from '@components/blocks/list-items';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { getTransactionLink } from '@components/pages/app/components/get-links';
import { renderSkeleton } from '@components/pages/app/page-templates/list-page';
import { useBlockTransactions } from '@hooks/use-voconi-sdk';
import { JumpToPaginatedList } from '@components/pages/app/page-templates/list-page-jump-to';
import { IChainTxReference } from '@vocdoni/sdk';

export const TransactionListForBlock = ({
  totalCount,
  blockHeight,
  skeletonItems = 4,
}: {
  pageSize?: number;
  totalCount: number;
  blockHeight?: number;
  skeletonItems?: number;
}) => {
  const { i18n } = useTranslation();

  const [paginatorPage, setPaginatorPage] = useState<number>(1);

  const { data, loading } = useBlockTransactions({ height: blockHeight, page: paginatorPage - 1 });
  const transactions = data?.transactions;

  // Render item on the list from it summary
  const renderTxItem = (tx: IChainTxReference, i: number) => {
    return (
      <GenericListItemWithBadge
        key={i}
        topLeft={i18n.t('transaction.card.index_n', { index: tx.transactionIndex })}
        badge={<TransactionTypeBadge type={tx.transactionType}></TransactionTypeBadge>}
        lg={8}
        link={getTransactionLink(blockHeight, tx.transactionIndex)}
      >
        <h4>{i18n.t('transaction.card.block:') + tx.transactionHash}</h4>
      </GenericListItemWithBadge>
    );
  };

  return (
    <>
      {(loading && !transactions?.length) || blockHeight === null ? (
        renderSkeleton(skeletonItems)
      ) : transactions != null && transactions.length ? (
        <>
          <JumpToPaginatedList
            loading={loading}
            elementsList={transactions ?? []}
            totalElementsCount={totalCount}
            renderElementFunction={renderTxItem}
            currentPage={paginatorPage}
            setCurrentPage={setPaginatorPage}
          />
        </>
      ) : (
        <h1>{i18n.t('transactions.no_transactions_found')}</h1>
      )}
    </>
  );
};
