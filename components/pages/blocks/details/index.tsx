import { BlockCard } from '@components/blocks/card/block-card'
import { PageCard } from '@components/elements/cards'
import { Column, Grid } from '@components/elements/grid'
import { Typography, TypographyVariant } from '@components/elements/typography'
import { BlockInfo } from '@lib/types'
import { TransactionListForBlock } from './transaction-list-for-block'
import { useTranslation } from 'react-i18next'

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
      <BlockCard blockData={blockData} moreDetails />
      {blockData?.num_txs > 0 ? (
        <TransactionListForBlock
          totalCount={blockData?.num_txs}
          blockHeight={blockData?.height}
        ></TransactionListForBlock>
      ) : null}
    </PageCard>
  )
}
