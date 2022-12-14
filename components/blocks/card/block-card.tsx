import { ColumnProps } from '@components/elements/grid'
import { getPath } from '@components/pages/app/components/get-links'
import { NTransactionsBadge } from '@components/pages/blocks/components/block-n-transactions-badge'
import { BLOCKS_DETAILS } from '@const/routes'
import { useTranslation } from 'react-i18next'
import { localizedDateDiff } from '@lib/date'
import { BlockInfo } from '@lib/types'
import { GenericListItemWithBadge } from '../list-items'
import {
  CardItemTitle,
  GenericCardWrapper,
  GenericCardWrapperProps,
} from '@components/elements/card-generic'
import { ItemDate } from '@components/elements/styled-divs'
import { ensure0x } from 'dvote-js'
import styled from 'styled-components'
import { ReducedTextAndCopy } from '../copy-button'

export const BlockCard = ({
  blockData,
  ...props
}: GenericCardWrapperProps & {
  blockData: BlockInfo
}) => {
  const { i18n } = useTranslation()
  const link =
    blockData?.height
      ? getPath(BLOCKS_DETAILS, {
          blockHeight: blockData?.height?.toString(),
        })
      : null

  const Body = () => (
    <BodyWrapper>
      <CardItemTitle>{'#' + blockData?.height}</CardItemTitle>
      <CustomItemDate>{localizedDateDiff(new Date(blockData?.timestamp))}</CustomItemDate>
    </BodyWrapper>
  )

  const Footer = () => {
    const proposer = ensure0x(blockData?.proposerAddress)
    return (
      <FooterWrapper>
        <div id="hash-text">
          {i18n.t('components.block_card.proposer')} {': '}
        </div>
        <ReducedTextAndCopy
          text={proposer}
          toCopy={proposer}
          copyMessage={i18n.t('copy.hash_copied_to_the_clipboard')}
        ></ReducedTextAndCopy>
      </FooterWrapper>
    )
  }

  return (
    <GenericCardWrapper {...props} link={link} footer={<Footer />}>
      <Body />
    </GenericCardWrapper>
  )
}

const FooterWrapper = styled.span`
  color: ${(props) => props.theme.textAccent1};
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;

  & > #hash-text {
    color: ${(props) => props.theme.text};
  }
`

const BodyWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  & > h3 {
    margin: 0;
  }
`


const CustomItemDate = styled(ItemDate)`
  font-size: 100%;
`
