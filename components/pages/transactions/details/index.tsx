import { TransactionTypeBadge } from '@components/blocks/badges/transaction-type-badge'
import { GenericListItemWithBadge } from '@components/blocks/list-items'
import { Card, PageCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { Typography, TypographyVariant } from '@components/elements/typography'
import {
  EntityLink,
  getElectionDetailsPath,
} from '@components/pages/app/components/get-links'
import i18n from '@i18n'
import { localizedDateDiff } from '@lib/date'
import { GetTx, TxType } from '@lib/types'
import {
  byteArrayToHex,
  getEnumKeyByEnumValue,
  objectBytesArrayToHex,
} from '@lib/util'
import { colors } from '@theme/colors'
import {
  AdminTx,
  NewProcessTx,
  SetProcessTx,
  VoteEnvelope,
} from '@vocdoni/data-models/dist/protobuf/build/ts/vochain/vochain'
import { useDateAtBlock } from '@vocdoni/react-hooks'
import { Tx } from 'dvote-js'
import Link from 'next/link'
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
  const [txType, setTxType] = useState<TxType>()
  const [txRaw, setTxRaw] = useState<any>()
  const { date, loading, error } = useDateAtBlock(blockHeight)

  useEffect(() => {
    const txInterface = transactionData.tx as Tx
    switch (txInterface.payload.$case) {
      case 'vote': {
        const tx: VoteEnvelope = txInterface.payload.vote
        setBelongsToProcess(byteArrayToHex(tx.processId))
        // todo(ritmo): for the moment, this is not needed because we decode all
        // byte array on the txRaw object. So let this here for future uses, maybe
        // will be needed.
        // switch(tx.proof.payload.$case){
        //   case 'graviton':
        //   break
        //   case 'ethereumStorage':
        //   break
        //   case 'iden3':
        //   break
        //   default:
        //     console.debug("Other proof type")
        // }
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
    setTxType(TxType[getEnumKeyByEnumValue(TxType, txInterface.payload.$case)])
  }, [transactionData])

  return (
    <PageCard>
      <>
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
              <span>{localizedDateDiff(date)}</span>
            </Typography>
          </Column>
        </Grid>
        <GenericListItemWithBadge
          topLeft={<></>}
          badge={
            <>
              <TransactionTypeBadge type={txType} />
            </>
          }
          dateText={localizedDateDiff(date)}
          link={
            null
            //   blockData?.height && !moreDetails
            //     ? RouterService.instance.get(BLOCKS_DETAILS, {
            //         blockHeight: blockData?.height?.toString(),
            //       })
            //     : null
          }
          title={'0x' + transactionData?.hash}
        >
          {belongsToProcess.length ? (
            <p>
              {i18n.t('transactions.belongs_to_process')}:{' '}
              <Link href={getElectionDetailsPath(belongsToProcess)}>
                <a>0x{belongsToProcess}</a>
              </Link>
            </p>
          ) : null}
          {belongsToEntity.length ? (
            <p>
              {i18n.t('transactions.belong_to_entity')}:
              <EntityLink entityId={belongsToEntity}>
                <a>0x{belongsToEntity}</a>
              </EntityLink>
            </p>
          ) : null}
        </GenericListItemWithBadge>

        {txRaw ? (
          <Card>
            <h3>{i18n.t('transactions.contents')}</h3>
            <pre>{JSON.stringify(txRaw, null, 2)}</pre>
          </Card>
        ) : null}
      </>
    </PageCard>
  )
}
