import { ColumnProps } from '@components/elements/grid'
import i18n from '@i18n'
import { TxById } from '@lib/types'
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
      key={transactionData?.id}
      topLeft={
        <>
          {i18n.t('transactions.number')} {'#' + transactionData?.id}
        </>
      }
      badge={
        <>
          {/* todo: once implemented, show a badge with the transaction type */}
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
