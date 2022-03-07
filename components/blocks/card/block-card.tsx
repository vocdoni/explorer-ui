import { Card } from '@components/elements/cards'
import { ColumnProps } from '@components/elements/grid'
import { BLOCKS_DETAILS } from '@const/routes'
import i18n from '@i18n'
import { localizedDateDiff } from '@lib/date'
import RouterService from '@lib/router'
import { BlockInfo } from '@lib/types'
import { GenericListItemWithBadge } from '../list-items'

export const BlockCard = ({
  sm,
  md,
  lg,
  xl,
  blockData,
  proposerShrink,
  moreDetails = false,
}: ColumnProps & {
  blockData: BlockInfo
  proposerShrink?: number
  moreDetails?: boolean
}) => {
  const proposer = proposerShrink
    ? blockData?.proposer_address.substring(0, proposerShrink) + '...'
    : blockData?.proposer_address

  return (
    <GenericListItemWithBadge
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      key={blockData?.height}
      topLeft={
        <>
          {i18n.t('blocks.number')} {blockData?.height}
        </>
      }
      badge={
        <>
          {i18n.t('blocks.transactions')} {blockData?.num_txs}
        </>
      }
      dateText={localizedDateDiff(new Date(blockData?.timestamp))}
      link={RouterService.instance.get(BLOCKS_DETAILS, {
        blockHeight: blockData?.height.toString(),
      })}
      // title={}
    >
      <p>
        {i18n.t('blocks.proposer')}: <code>0x{proposer}</code>
      </p>
    </GenericListItemWithBadge>
  )
}
