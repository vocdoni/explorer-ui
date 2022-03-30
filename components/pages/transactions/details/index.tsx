import { TransactionTypeBadge } from '@components/blocks/badges/transaction-type-badge'
import { GenericListItemWithBadge } from '@components/blocks/list-items'
import { PageCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { Typography, TypographyVariant } from '@components/elements/typography'
import i18n from '@i18n'
import { localizedDateDiff } from '@lib/date'
import { GetTx, TxType } from '@lib/types'
import { byteArrayToHex, objectBytesArrayToHex } from '@lib/util'
import { colors } from '@theme/colors'
import {
  AdminTx,
  NewProcessTx,
  SetProcessTx,
  VoteEnvelope,
} from '@vocdoni/data-models/dist/protobuf/build/ts/vochain/vochain'
import { Tx } from 'dvote-js'
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
  const [belongsToEntity, setBelongsToEntity] = useState('')
  const [belongsToProcess, setBelongsToProcess] = useState('')
  const [txRaw, setTxRaw] = useState<any>()

  useEffect(() => {
    const txInterface = transactionData.tx as Tx
    switch (txInterface.payload.$case) {
      case 'vote': {
        const tx = txInterface.payload.vote as VoteEnvelope
        setBelongsToProcess(byteArrayToHex(tx.processId))
        break
      }
      case 'newProcess': {
        const tx = txInterface.payload.newProcess as NewProcessTx
        setBelongsToProcess(byteArrayToHex(tx.process.processId))
        setBelongsToEntity(byteArrayToHex(tx.process.entityId))
        break
      }
      case 'admin': {
        const tx = txInterface.payload.admin as AdminTx
        setBelongsToProcess(byteArrayToHex(tx.processId))
        break
      }
      case 'setProcess': {
        const tx = txInterface.payload.setProcess as SetProcessTx
        setBelongsToProcess(byteArrayToHex(tx.processId))
        if (tx?.results?.entityId) {
          setBelongsToEntity(byteArrayToHex(tx?.results?.entityId))
        }
        break
      }
      default: {
        //statements;
        break
      }
    }
    objectBytesArrayToHex(txInterface)
    setTxRaw(txInterface)
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
        topLeft={<></>}
        badge={
          <>
            <TransactionTypeBadge type={TxType.VOTE} />
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
          {/* {i18n.t('transactions.hash')}: <a><code>0x{decodedBody?.payload.admin.}</code></a> */}
        </p>
        <p>
          {i18n.t('transactions.belong_to_entity')}:{' '}
          <code>0x{transactionData?.hash}</code>
        </p>
        <p>
          {i18n.t('transactions.belong_to_process')}:{' '}
          <code>0x{transactionData?.hash}</code>
        </p>
      </GenericListItemWithBadge>
    </PageCard>
  )
}