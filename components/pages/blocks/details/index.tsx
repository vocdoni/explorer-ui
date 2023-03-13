import { BlockCard } from '@components/blocks/card/block-card'
import { PageCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { BlockInfo } from '@lib/types'
import { TransactionListForBlock } from './transaction-list-for-block'
import { useTranslation } from 'react-i18next'
import { ensure0x } from 'dvote-js'
import Link from 'next/link'

export const BlockView = ({ blockData }: { blockData: BlockInfo }) => {
  const { i18n } = useTranslation()
  return (
    <PageCard>
      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>
            {i18n.t('blocks.details.block_details')}
          </Typography>
        </Column>
      </Grid>
      <BlockCard blockData={blockData} />
      {blockData?.numTxs > 0 ? (
        <TransactionListForBlock
          totalCount={blockData?.numTxs}
          blockHeight={blockData?.height}
        ></TransactionListForBlock>
      ) : null}
      <>
       <p>{i18n.t('blocks.transactions')} {blockData?.numTxs}</p>
        <p>
          {i18n.t('components.block_card.hash')}:{' '}
          <code>0x{blockData?.hash}</code>
        </p>
        <p>
          {i18n.t('components.block_card.last_block_hash')}:
          <Link href={`#/${(blockData?.height - 1).toString()}`}>
            <code> 0x{blockData?.lastBlockHash}</code>
          </Link>
        </p>
        <p>
        {i18n.t('components.block_card.proposer')} {ensure0x(blockData?.proposerAddress)}
        </p>
      </>
    </PageCard>
  )
}
