import { TransactionTypeBadge } from '@components/blocks/badges/transaction-type-badge'
import { GenericListItemWithBadge } from '@components/blocks/list-items'
import { Paginator } from '@components/blocks/paginator'
import { StatusCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { renderSkeleton } from '@components/pages/app/page-templates/paginated-list-template'
import { useTxForBlock } from '@hooks/use-transactions'
import { useTranslation } from 'react-i18next'
import { TxForBlock } from '@lib/types'
import { useEffect, useState } from 'react'
import { getTransactionLink } from '@components/pages/app/components/get-links'

export const TransactionListForBlock = ({
  pageSize,
  totalCount,
  blockHeight,
  skeletonItems = 4,
}: {
  pageSize?: number
  totalCount: number
  blockHeight?: number
  skeletonItems?: number
}) => {
  const { i18n } = useTranslation()
  // Current from offset calling the backend
  const [fromId, setFromId] = useState(0)
  const [loading, setLoading] = useState(true)
  // Current paginator page
  const [currentPage, setCurrentPage] = useState(1)

  const { transactions, loading: loadingTransactions } = useTxForBlock({
    blockHeight: blockHeight,
    listSize: pageSize,
    fromId,
  })

  // Set loading
  useEffect(() => {
    setLoading(loadingTransactions)
  }, [loadingTransactions])

  // When current page changed get next blocks
  useEffect(() => {
    setFromId(currentPage * pageSize)
  }, [currentPage])

  // Render item on the list from it summary
  const renderProcessItem = (tx: TxForBlock) => {
    return (
      <GenericListItemWithBadge 
        key={tx.hash}
        topLeft={i18n.t('transaction.card.index', {index: tx.index})} 
        badge={<TransactionTypeBadge type={tx.type} ></TransactionTypeBadge>}  
        lg={8}
        link={getTransactionLink(blockHeight, tx.index)}          
      >
        <h4>{i18n.t('transaction.card.block:') + tx.hash}</h4>
      </GenericListItemWithBadge>
    )
  }

  return (
    <>
      {(loading && !transactions?.length) || blockHeight === null ? (
        renderSkeleton(skeletonItems)
      ) : transactions != null && transactions.length ? (
        <>
          <Column md={8} sm={12}>
            <Paginator
              totalCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
              disableGoLastBtn
            ></Paginator>
          </Column>
          {/* <Column md={8} sm={12}> */}
          <Grid>{transactions.map(renderProcessItem)}</Grid>
          {/* </Column> */}
        </>
      ) : (
        <h1>{i18n.t('transactions.no_transactions_found')}</h1>
      )}
    </>
  )
}
