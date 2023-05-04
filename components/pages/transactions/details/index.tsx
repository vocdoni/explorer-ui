import { TransactionTypeBadge } from '@components/blocks/badges/transaction-type-badge';
import { GenericListItemWithBadge } from '@components/blocks/list-items';
import { Card, PageCard } from '@components/elements/cards';
import { Column, Grid } from '@components/elements/grid';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { BlockLink, EntityLink, getProcessDetailsPath } from '@components/pages/app/components/get-links';
import { useTranslation } from 'react-i18next';
import { localizedDateDiff } from '@lib/date';
import { b64ToHex, objectB64StringsToHex } from '@lib/util';
import { colors } from '@theme/colors';
import { AdminTx, NewProcessTx, SetProcessTx, TransactionType, VoteEnvelope } from '@vocdoni/sdk';
import { useDateAtBlock } from '@vocdoni/react-hooks';
import Link from 'next/link';
import { OverflowScroll } from '@components/elements/styled-divs';
import { Tx } from '@vocdoni/sdk';

export const TransactionDetails = ({
  txIndex,
  blockHeight,
  transactionData,
}: {
  txIndex: number;
  transactionData: Tx;
  blockHeight: number;
}) => {
  const { i18n } = useTranslation();
  const { date } = useDateAtBlock(blockHeight);

  let belongsToEntity = '';
  let belongsToProcess = '';
  let votePackage = '';
  const txType = Object.keys(transactionData)[0] as TransactionType;

  const ignoreKeys: string[] = [];

  // todo: for some reason, response payload converted transactions have some
  // values into base64 string. This values, on the interface declaration are
  // `Uint8Array`, but on JSON decoding are treated as 'strings'.
  // So is a little bit tricky to know, if a payload value have to be
  // converted to a b64 or not. Probably reflection could help with that. BTW
  // is solved checking regex.
  switch (txType) {
    case 'vote': {
      const tx = transactionData['vote'] as VoteEnvelope;
      ignoreKeys.push('votePackage');
      try {
        tx.votePackage =
          tx.encryptionKeyIndexes !== undefined && tx.encryptionKeyIndexes.length > 0
            ? tx.votePackage
            : atob(tx.votePackage as any as string);
        votePackage = tx.votePackage;
      } catch (e) {
        console.error(e);
      }
      belongsToProcess = b64ToHex(tx.processId as any as string);
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
      break;
    }
    case 'newProcess': {
      const tx = transactionData['newProcess'] as NewProcessTx;
      if (tx.process?.processId) {
        belongsToProcess = b64ToHex(tx.process?.processId as any as string);
      }
      belongsToEntity = b64ToHex(tx.process.entityId as any as string);
      break;
    }
    case 'admin': {
      const tx = transactionData['admin'] as AdminTx;
      belongsToProcess = b64ToHex(tx.processId as any as string);
      break;
    }
    case 'setProcess': {
      const tx = transactionData['setProcess'] as SetProcessTx;
      belongsToProcess = b64ToHex(tx.processId as any as string);

      if (tx?.results?.entityId) {
        belongsToEntity = b64ToHex(tx.results?.entityId as any as string);
      }
      break;
    }
    default: {
      //statements;
      break;
    }
  }

  const rawTx = JSON.parse(JSON.stringify(transactionData));
  objectB64StringsToHex(rawTx, ignoreKeys);

  return (
    <PageCard>
      <>
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.H3}>{i18n.t('transactions.details.transaction_details')}</Typography>
            <BlockLink blockHeight={blockHeight}>
              <h2>
                {i18n.t('transactions.on_block_n', {
                  blockHeight: blockHeight,
                })}
              </h2>
            </BlockLink>
            <Typography variant={TypographyVariant.Small} color={colors.lightText}>
              <span>
                {i18n.t('transactions.transaction_index')}: {txIndex + 1}{' '}
              </span>
            </Typography>
            <Typography variant={TypographyVariant.Small} color={colors.lightText}>
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
          title={'todo hash'} // todo(kon): tx hash is not actually present on Tx object
          // title={'0x' + transactionData?.hash}
        >
          <OverflowScroll>
            {belongsToProcess?.length > 0 && (
              <p>
                {i18n.t('transactions.details.belongs_to_process')}:{' '}
                <Link href={getProcessDetailsPath(belongsToProcess)}>0x{belongsToProcess}</Link>
              </p>
            )}
            {belongsToEntity?.length > 0 && (
              <p>
                {i18n.t('transactions.details.belong_to_organization')}:
                <EntityLink entityId={belongsToEntity}>0x{belongsToEntity}</EntityLink>
              </p>
            )}
            {votePackage?.length > 0 && (
              <p>
                {i18n.t('transactions.details.vote_package')}:<pre>{votePackage}</pre>
              </p>
            )}
          </OverflowScroll>
        </GenericListItemWithBadge>

        {rawTx && (
          <Card>
            <h3>{i18n.t('transactions.details.raw_contents')}</h3>
            <OverflowScroll>{JSON.stringify(rawTx, null, 2)}</OverflowScroll>
          </Card>
        )}
      </>
    </PageCard>
  );
};
