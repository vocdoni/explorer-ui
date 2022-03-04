import { Card } from '@components/elements/cards'
import { ColumnProps } from '@components/elements/grid'
import i18n from '@i18n'
import { localizedDateDiff } from '@lib/date'
import { BlockInfo } from '@lib/types'

export const BlockCard = ({sm, md, lg, xl, blockData, proposerShrink}: ColumnProps & { blockData: BlockInfo, proposerShrink?: number }) => {
    const proposer = proposerShrink ? blockData.proposer_address.substring(0, proposerShrink) + "..." : blockData.proposer_address
    return (
    <Card sm={sm} md={md} lg={lg} xl={xl} key={blockData.height}>
      <h4>
        {i18n.t('blocks.number')} {blockData.height}
      </h4>
      <p>
        <small>{localizedDateDiff(new Date(blockData.timestamp))}</small>
      </p>
      <p>
        {i18n.t('blocks.transactions')}: {blockData.num_txs}
      </p>
      <p>
        {i18n.t('blocks.proposer')}:{' '}
        <code>0x{proposer}</code>
      </p>
    </Card>
  )
}
