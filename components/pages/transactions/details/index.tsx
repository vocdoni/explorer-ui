import { TransactionTypeBadge } from '@components/blocks/badges/transaction-type-badge'
import { GenericListItemWithBadge } from '@components/blocks/list-items'
import { PageCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { useTxBody } from '@hooks/use-transactions'
import i18n from '@i18n'
import { localizedDateDiff } from '@lib/date'
import { GetTx, TxType } from '@lib/types'
import { colors } from '@theme/colors'
import { useEffect, useState } from 'react'

export const TransactionDetails = ({
  txIndex,
  blockHeight,
  transactionData,
}: {
  txIndex: number
  transactionData: GetTx
  blockHeight: number
}) => {

  const [encodedBody, setEncodedBody] = useState<string>()
  const { decodedBody } = useTxBody({ encodedBody })

  useEffect(() => {
    if (transactionData) {
      setEncodedBody(transactionData.tx)
    }
  }, [transactionData])

  return (
    <PageCard>
      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.H3}>
            {i18n.t('transaction.details.transaction_details')}
          </Typography>
          <Typography variant={TypographyVariant.Small}>
            {txIndex + 1}
            {i18n.t('transaction.details.n_transaction_for_block_n')}
            {blockHeight}
          </Typography>

          <Typography
            variant={TypographyVariant.Small}
            color={colors.lightText}
          >
            <span>{i18n.t('transaction.created_on')}: </span>
            <span>{localizedDateDiff(new Date())}</span>
          </Typography>
        </Column>
      </Grid>
      <GenericListItemWithBadge
        topLeft={
          <>
            {i18n.t('transaction.number')} {'#'}
          </>
        }
        badge={
          <>
            <TransactionTypeBadge
              type={
                TxType.VOTE
              }
            />
          </>
        }
        dateText={localizedDateDiff(new Date())}
        link={
          null
          //   blockData?.height && !moreDetails
          //     ? RouterService.instance.get(BLOCKS_DETAILS, {
          //         blockHeight: blockData?.height?.toString(),
          //       })
          //     : null
        }
      >
        <p>
          {i18n.t('transactions.hash')}: <code>0x{transactionData?.hash}</code>
        </p>
        <p>
          {i18n.t('transactions.belong_to_entity')}: <code>0x{transactionData?.hash}</code>
        </p>
        <p>
          {i18n.t('transactions.belong_to_process')}: <code>0x{transactionData?.hash}</code>
        </p>
      </GenericListItemWithBadge>
    </PageCard>
  )
}
