import { ColumnProps } from '@components/elements/grid'
import { getPath } from '@components/pages/app/components/get-links'
import { NTransactionsBadge } from '@components/pages/blocks/components/block-n-transactions-badge'
import { BLOCKS_DETAILS } from '@const/routes'
import { useTranslation } from 'react-i18next'
import { localizedDateDiff } from '@lib/date'
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
  const { i18n } = useTranslation()
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
          {i18n.t('components.block_card.height_n' , {blockHeight: blockData?.height})}
        </>
      }
      badge={
        <>
          <NTransactionsBadge
            transactions={blockData?.num_txs}
          ></NTransactionsBadge>
          {/* {i18n.t('blocks.transactions')} {blockData?.num_txs} */}
        </>
      }
      dateText={localizedDateDiff(new Date(blockData?.timestamp))}
      link={
        blockData?.height && !moreDetails
          ? getPath(BLOCKS_DETAILS, {
              blockHeight: blockData?.height?.toString(),
            })
          : null
      }
    >
      {moreDetails ? (
        <>
          <p>
            {i18n.t('components.block_card.hash')}: <code>0x{blockData?.hash}</code>
          </p>
          <p>
            {i18n.t('components.block_card.last_block_hash')}:
            <a href={`#/${(blockData?.height - 1).toString()}`}>
              <code> 0x{blockData?.last_block_hash}</code>
            </a>
          </p>
        </>
      ) : null}
      <p>
        {i18n.t('components.block_card.proposer')}: <code>0x{proposer}</code>
      </p>
    </GenericListItemWithBadge>
  )
}
