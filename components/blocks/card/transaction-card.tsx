import { ColumnProps } from '@components/elements/grid'
import { TRANSACTIONS_DETAILS } from '@const/routes'
import i18n from '@i18n'
import RouterService from '@lib/router'
import { TxById, TxType } from '@lib/types'
import { getEnumKeyByEnumValue } from '@lib/util'
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
          <TransactionTypeBadge type={TxType[getEnumKeyByEnumValue(TxType, transactionData.tx.payload.$case)]}/>
        </>
      }
      // dateText={localizedDateDiff(new Date(blockData?.timestamp))}
      link={
        RouterService.instance.get(
          TRANSACTIONS_DETAILS, {
              blockHeight: transactionData?.block_height?.toString(),
              index: transactionData?.index?.toString() ?? "0",
            })
      }
    >
      <p>
        {i18n.t('transactions.hash')}: <code>0x{transactionData?.hash}</code>
      </p>
    </GenericListItemWithBadge>
  )
}
