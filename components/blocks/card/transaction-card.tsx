import { ColumnProps } from '@components/elements/grid'
import i18n from '@i18n'
import { TxById, TxType } from '@lib/types'
import { TransactionTypeBadge } from '../badges/transaction-type-badge'
import { GenericListItemWithBadge } from '../list-items'

export const TransactionCard = ({
  sm,
  md,
  lg,
  xl,
  transactionData,
}: ColumnProps & {
  transactionData: TxById
}) => {
  return (
    <GenericListItemWithBadge
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      topLeft={
        <>
          {i18n.t('transactions.number')} {'#' + transactionData?.id}
        </>
      }
      badge={
        <>
          <TransactionTypeBadge type={TxType.VOTE} /* todo(ritmo): once implemented send real state */ />
        </>
      }
      // dateText={localizedDateDiff(new Date(blockData?.timestamp))}
      link={
        null
        // todo: write this
        // blockData?.height && !moreDetails
        //   ? RouterService.instance.get(BLOCKS_DETAILS, {
        //       blockHeight: blockData?.height?.toString(),
        //     })
        //   : null
      }
    >
      <p>
        {i18n.t('transactions.hash')}: <code>0x{transactionData?.hash}</code>
      </p>
    </GenericListItemWithBadge>
  )
}
