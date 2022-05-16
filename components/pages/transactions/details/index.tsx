import { TransactionTypeBadge } from '@components/blocks/badges/transaction-type-badge'
import { GenericListItemWithBadge } from '@components/blocks/list-items'
import { Card, PageCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { Typography, TypographyVariant } from '@components/elements/typography'
import {
  BlockLink,
  EntityLink,
  getElectionDetailsPath,
} from '@components/pages/app/components/get-links'
import { useTranslation } from 'react-i18next'
import { localizedDateDiff } from '@lib/date'
import { GetTx, TxType } from '@lib/types'
import {
  b64ToHex,
  objectB64StringsToHex,
} from '@lib/util'
import { colors } from '@theme/colors'
import {
  AdminTx,
  NewProcessTx,
  SetProcessTx,
  VoteEnvelope,
} from '@vocdoni/data-models/dist/protobuf/build/ts/vochain/vochain'
import { useDateAtBlock } from '@vocdoni/react-hooks'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

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
  const [votePackage, setVotePackage] = useState('')
  const [txType, setTxType] = useState<TxType>()
  const [txRaw, setTxRaw] = useState<any>()
  const { date, loading, error } = useDateAtBlock(blockHeight)

  useEffect(() => {
    const txPayload = transactionData.payload
    const ignoreKeys: string[] = []

    // todo: for some reason, response payload converted transactions have some 
    // values into base64 string. This values, on the interface declaration are
    // `Uint8Array`, but on JSON decoding are treated as 'strings'.
    // So is a little bit tricky to know, if a payload value have to be 
    // converted to a b64 or not. Probably reflection could help with that. BTW 
    // is solved checking regex.
    switch (Object.keys(txPayload)[0] as TxType) {
      case 'vote': {
        const tx = txPayload['vote'] as VoteEnvelope
        ignoreKeys.push('votePackage')
        try {
          tx.votePackage = tx.encryptionKeyIndexes !== undefined && tx.encryptionKeyIndexes.length > 0 
          ? tx.votePackage
          : atob(tx.votePackage as any as string)
          setVotePackage(tx.votePackage as any as string)
        } catch (e) {
          console.debug(e)
        }
        
        // setVotePackage(tx.encryptionKeyIndexes !== undefined && tx.encryptionKeyIndexes.length > 0 
        //   ? tx.votePackage as any as string
        //   : atob(tx.votePackage as any as string))
        setBelongsToProcess(b64ToHex(tx.processId as any as string))
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
          setBelongsToProcess(b64ToHex(tx.process?.processId as any as string))
        }
        setBelongsToEntity(b64ToHex(tx.process.entityId as any as string))
        break
      }
      case 'admin': {
        const tx = txPayload['admin'] as AdminTx
        setBelongsToProcess(b64ToHex(tx.processId as any as string))
        break
      }
      case 'setProcess': {
        const tx = txPayload['setProcess'] as SetProcessTx
        setBelongsToProcess(b64ToHex(tx.processId as any as string))
        if (tx?.results?.entityId) {
          setBelongsToEntity(b64ToHex(tx?.results?.entityId as any as string))
        }
        break
      }
      default: {
        //statements;
        break
      }
    }
    objectB64StringsToHex(txPayload, ignoreKeys)  
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
            <BlockLink blockHeight={blockHeight}>
              <h2>
                {i18n.t('transactions.on_block_n', {
                  blockHeight: blockHeight,
                })}
              </h2>
            </BlockLink>
            <Typography
              variant={TypographyVariant.Small}
              color={colors.lightText}
            >
              <span>
                {i18n.t('transactions.transaction_index')}: {txIndex + 1}{' '}
              </span>
            </Typography>
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
        <OverflowScroll>

          {belongsToProcess?.length > 0 && (
            <p>
              {i18n.t('transactions.details.belongs_to_process')}:{' '}
              <Link href={getElectionDetailsPath(belongsToProcess)}>
                <a>0x{belongsToProcess}</a>
              </Link>
            </p>
          )}
          {belongsToEntity?.length > 0 && (
            <p>
              {i18n.t('transactions.details.belong_to_entity')}:
              <EntityLink entityId={belongsToEntity}>
                <a>0x{belongsToEntity}</a>
              </EntityLink>
            </p>
          )}
          {votePackage?.length > 0 && (
            <p>
              {i18n.t('transactions.details.vote_package')}:
              <pre>
                {votePackage}
              </pre>
            </p>
          )}
        </OverflowScroll>

        </GenericListItemWithBadge>

        {txRaw && (
          <Card>
            <h3>{i18n.t('transactions.details.raw_contents')}</h3>
            <OverflowScroll>{JSON.stringify(txRaw, null, 2)}</OverflowScroll>
          </Card>
        )}
      </>
    </PageCard>
  )
}

const OverflowScroll = styled.pre`
  overflow-x: scroll;
`
