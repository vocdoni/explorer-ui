import { BlockCard } from '@components/blocks/card/block-card';
import { PageCard } from '@components/elements/cards';
import { Column, Grid } from '@components/elements/grid';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { TransactionListForBlock } from './transaction-list-for-block';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { ensure0x, IChainBlockInfoResponse } from '@vocdoni/sdk';
import { getPath } from '@components/pages/app/components/get-links';
import { BLOCKS_DETAILS } from '@const/routes';

export const BlockView = ({ blockData }: { blockData: IChainBlockInfoResponse }) => {
  const { i18n } = useTranslation();
  const txs = blockData?.data.txs;
  const blockHeight = blockData?.header.height;
  return (
    <PageCard>
      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>{i18n.t('blocks.details.block_details')}</Typography>
        </Column>
      </Grid>
      <BlockCard
        blockHeight={blockData.header.height}
        blockTime={blockData.header.time}
        proposer={blockData.header.proposerAddress}
      />
      {txs?.length > 0 ? (
        <TransactionListForBlock totalCount={txs.length} blockHeight={blockHeight}></TransactionListForBlock>
      ) : null}
      <>
        <p>{i18n.t('blocks.transactions', { transactions: txs.length })}</p>
        <p>{i18n.t('blocks.details.hash', { hash: ensure0x(blockData?.['hash']) })}</p>
        <p>
          {i18n.t('blocks.details.last_block_hash')}
          {/*I used the link  legacyBehavior here because for some reason the NextJS Link component changes the url but the
           useUrlHash hook doesn't detect the change, so it does not update to previous block data. Is a problem related to
           useUrlHash hook */}
          <Link
            href={getPath(BLOCKS_DETAILS, {
              blockHeight: (blockHeight - 1).toString(),
            })}
            passHref
            legacyBehavior
          >
            <a target="_blank" rel="noopener noreferrer">
              <code> {ensure0x(blockData?.lastCommit.blockId.hash)}</code>
            </a>
          </Link>
        </p>
        <p>{i18n.t('blocks.details.proposer', { proposer: ensure0x(blockData?.header.proposerAddress) })}</p>
      </>
    </PageCard>
  );
};
