import { TransactionTypeBadge } from '@components/blocks/badges/transaction-type-badge'
import { GenericListItemWithBadge } from '@components/blocks/list-items'
import { Card, PageCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { Typography, TypographyVariant } from '@components/elements/typography'
import {
  EntityLink,
  getElectionDetailsPath,
  getPath,
} from '@components/pages/app/components/get-links'
import { useTranslation } from 'react-i18next'
import { localizedDateDiff } from '@lib/date'
import { GetTx, TxType } from '@lib/types'
import { getEnumKeyByEnumValue, objectBytesArrayToHex } from '@lib/util'
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
import { BLOCKS_DETAILS } from '@const/routes'

export const TransactionDetails = ({
  txIndex,
  blockHeight,
  transactionData,
}: {
  txIndex: number
  transactionData: GetTx
  blockHeight: number
}) => {
  const { i18n } = useTranslation()
  const [belongsToEntity, setBelongsToEntity] = useState('')
  const [belongsToProcess, setBelongsToProcess] = useState('')
  const [txType, setTxType] = useState<TxType>()
  const [txRaw, setTxRaw] = useState<any>()
  const { date, loading, error } = useDateAtBlock(blockHeight)

  const byteArrayToHex = (bytes: Uint8Array): string =>
    Buffer.from(bytes).toString('hex')

  useEffect(() => {
    const txPayload = transactionData.payload
    switch (Object.keys(txPayload)[0] as TxType) {
      case 'vote': {
        const tx = txPayload['vote'] as VoteEnvelope
        setBelongsToProcess(byteArrayToHex(tx.processId))
        // For the moment, this is not needed. Let this here for future uses,
        // maybe will be needed.
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
        const tx = txPayload['newProcess'] as NewProcessTx
        if (tx.process?.processId) {
          setBelongsToProcess(byteArrayToHex(tx.process?.processId))
        }
        setBelongsToEntity(byteArrayToHex(tx.process.entityId))
        break
      }
      case 'admin': {
        const tx = txPayload['admin'] as AdminTx
        setBelongsToProcess(byteArrayToHex(tx.processId))
        break
      }
      case 'setProcess': {
        const tx = txPayload['setProcess'] as SetProcessTx
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
    objectBytesArrayToHex(txPayload)
    setTxRaw(txPayload)
    setTxType(TxType[Object.keys(txPayload)[0]])
  }, [transactionData])

  return (
    <PageCard>
      <>
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.H3}>
              {i18n.t('transactions.details.transaction_details')}
            </Typography>
            <a
              href={
                // todo(ritmo): DRY
                getPath(BLOCKS_DETAILS, {
                  blockHeight: blockHeight.toString(),
                })
              }
            >
              <Typography variant={TypographyVariant.Small}>
                {i18n.t('transactions.details.n_transaction_for_block_n', {
                  txIndex: txIndex + 1,
                  blockHeight: blockHeight,
                })}
              </Typography>
            </a>

            <Typography
              variant={TypographyVariant.Small}
              color={colors.lightText}
            >
              <span>{i18n.t('transactions.created_on')}: </span>
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
          {belongsToProcess?.length ? (
            <p>
              {i18n.t('transactions.details.belongs_to_process')}:{' '}
              <Link href={getElectionDetailsPath(belongsToProcess)}>
                <a>0x{belongsToProcess}</a>
              </Link>
            </p>
          ) : null}
          {belongsToEntity.length ? (
            <p>
              {i18n.t('transactions.details.belong_to_entity')}:
              <EntityLink entityId={belongsToEntity}>
                <a>0x{belongsToEntity}</a>
              </EntityLink>
            </p>
          ) : null}
        </GenericListItemWithBadge>

        {txRaw ? (
          <Card>
            <h3>{i18n.t('transactions.details.raw_contents')}</h3>
            <pre>{JSON.stringify(txRaw, null, 2)}</pre>
          </Card>
        ) : null}
      </>
    </PageCard>
  )
}
