import { BlockCard } from '@components/blocks/card/block-card';
import { PageCard } from '@components/elements/cards';
import { Column, Grid } from '@components/elements/grid';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { TransactionListForBlock } from './transaction-list-for-block';
import { useTranslation } from 'react-i18next';
import { ensure0x } from 'dvote-js';
import Link from 'next/link';
import { IChainBlockInfoResponse } from '@vocdoni/sdk';

export const BlockView = ({ blockData }: { blockData: IChainBlockInfoResponse }) => {
  const { i18n } = useTranslation();
  const txs = blockData?.data.txs;
  const blockHeight = +blockData?.header.height; // todo: on new sdk version this is a number
  return (
    <PageCard>
      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>{i18n.t('blocks.details.block_details')}</Typography>
        </Column>
      </Grid>
      <BlockCard
        blockHeight={+blockData.header.height} // todo: on new sdk versions this will be a number
        blockTime={blockData.header.time}
        proposer={blockData.header.proposerAddress}
      />
      {txs?.length > 0 ? (
        <TransactionListForBlock totalCount={txs.length} blockHeight={blockHeight}></TransactionListForBlock>
      ) : null}
      <>
        <p>{i18n.t('blocks.transactions', { transactions: txs.length })}</p>
        <p>
          {/*todo: appHash is not block hash*/}
          {i18n.t('blocks.details.hash', { hash: `0x${blockData?.header.appHash}` })}
        </p>
        <p>
          {i18n.t('blocks.details.last_block_hash')}
          <Link href={`#/${(blockHeight - 1).toString()}`}>
            <code> {ensure0x(blockData?.lastCommit.blockId.hash)})</code>
          </Link>
        </p>
        <p>{i18n.t('blocks.details.proposer', { proposer: ensure0x(blockData?.header.proposerAddress) })}</p>
      </>
    </PageCard>
  );
};
