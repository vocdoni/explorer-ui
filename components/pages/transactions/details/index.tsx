import { TransactionTypeBadge } from '@components/blocks/badges/transaction-type-badge';
import { GenericListItemWithBadge } from '@components/blocks/list-items';
import { Card, PageCard } from '@components/elements/cards';
import { Column, Grid } from '@components/elements/grid';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { BlockLink, EntityLink, ProcessLink } from '@components/pages/app/components/get-links';
import { useTranslation } from 'react-i18next';
import { localizedDateDiff } from '@lib/date';
import { b64ToHex, objectB64StringsToHex } from '@lib/util';
import { colors } from '@theme/colors';
import { AdminTx, ensure0x, NewProcessTx, SetProcessTx, TransactionType, VoteEnvelope } from '@vocdoni/sdk';
import { OverflowScroll } from '@components/elements/styled-divs';
import { Tx } from '@vocdoni/sdk';
import { useBlockToDate } from '@hooks/use-voconi-sdk';

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
  const { data } = useBlockToDate({ height: blockHeight });
  const date = new Date(data?.date);

  let belongsToEntity = '';
  let belongsToProcess = '';
  let votePackage = '';
  const txPayload = transactionData['tx'];
  const txType = Object.keys(transactionData['tx'])[0] as TransactionType;

  const rawTx: Tx = JSON.parse(JSON.stringify(transactionData));
  objectB64StringsToHex(rawTx, ['txInfo']);

  // todo: for some reason, response payload converted transactions have some
  // values into base64 string. This values, on the interface declaration are
  // `Uint8Array`, but on JSON decoding are treated as 'strings'.
  // So is a little bit tricky to know, if a payload value have to be
  // converted to a b64 or not. Probably reflection could help with that. BTW
  // is solved checking regex.
  switch (txType) {
    case 'vote': {
      const tx = txPayload['vote'] as VoteEnvelope;
      try {
        votePackage =
          tx.encryptionKeyIndexes !== undefined && tx.encryptionKeyIndexes.length > 0
            ? tx.votePackage
            : Buffer.from(tx.votePackage, 'base64').toString('ascii');
        (rawTx['tx']['vote'] as VoteEnvelope).votePackage = votePackage;
      } catch (e) {
        console.error(e);
      }
      belongsToProcess = b64ToHex(tx.processId as any as string);
      break;
    }
    case 'newProcess': {
      const tx = txPayload['newProcess'] as NewProcessTx;
      if (tx.process?.processId) {
        belongsToProcess = b64ToHex(tx.process?.processId as any as string);
      }
      belongsToEntity = b64ToHex(tx.process.entityId as any as string);
      break;
    }
    case 'admin': {
      const tx = txPayload['admin'] as AdminTx;
      belongsToProcess = b64ToHex(tx.processId as any as string);
      break;
    }
    case 'setProcess': {
      const tx = txPayload['setProcess'] as SetProcessTx;
      belongsToProcess = b64ToHex(tx.processId as any as string);

      if (tx?.results?.entityId) {
        belongsToEntity = b64ToHex(tx.results?.entityId as any as string);
      }
      break;
    }
  }

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
          title={ensure0x(transactionData.txInfo.transactionHash)}
        >
          <OverflowScroll>
            {belongsToProcess?.length > 0 && (
              <p>
                {i18n.t('transactions.details.belongs_to_process')}:{' '}
                <ProcessLink processId={belongsToProcess}>{ensure0x(belongsToProcess)}</ProcessLink>
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
