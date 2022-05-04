import { ColumnProps } from '@components/elements/grid'
import { getPath } from '@components/pages/app/components/get-links'
import { TRANSACTIONS_DETAILS } from '@const/routes'
import { useTranslation } from 'react-i18next'
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
  const { i18n } = useTranslation()
  return (
    <GenericListItemWithBadge
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      topLeft={
        <>
          {i18n.t('components.transaction_card.number')} {'#' + transactionData?.id}
        </>
      }
      badge={
        <>
          <TransactionTypeBadge type={TxType[getEnumKeyByEnumValue(TxType, transactionData.tx?.payload?.$case)]}/>
        </>
      }
      // dateText={localizedDateDiff(new Date(blockData?.timestamp))}
      link={
        getPath(
          TRANSACTIONS_DETAILS, {
              blockHeight: transactionData?.block_height?.toString(),
              index: transactionData?.index?.toString() ?? "0",
            })
      }
    >
      <p>
        {i18n.t('components.transaction_card.hash')}: <code>0x{transactionData?.hash}</code>
      </p>
    </GenericListItemWithBadge>
  )
}
