import { ColumnProps } from '@components/elements/grid'
import { getPath } from '@components/pages/app/components/get-links'
import { TRANSACTIONS_DETAILS } from '@const/routes'
import { useTranslation } from 'react-i18next'
import { TxById, TxType } from '@lib/types'
import { getEnumKeyByEnumValue } from '@lib/util'
import { TransactionTypeBadge } from '../badges/transaction-type-badge'
import { GenericListItemWithBadge } from '../list-items'
import {
  CardItemTitle,
  GenericCardWrapper,
  GenericCardWrapperProps,
} from '@components/elements/card-generic'
import { ensure0x } from '@vocdoni/common'
import styled from 'styled-components'
import {  ReducedTextAndCopy } from '@components/blocks/copy-button'


export const TransactionCard = ({
  transactionData,
}: GenericCardWrapperProps & {
  transactionData: TxById
}) => {
  const { i18n } = useTranslation()

  const link = getPath(TRANSACTIONS_DETAILS, {
    blockHeight: transactionData?.block_height?.toString(),
    index: transactionData?.index?.toString() ?? '0',
  })

  const Top = () => (
    <>
      <TransactionTypeBadge
        type={TxType[Object.keys(transactionData.payload)[0]]}
      ></TransactionTypeBadge>
    </>
  )

  const Footer = () => {
    const hash = ensure0x(transactionData?.hash)
    return (
      <FooterWrapper>
        <div id="hash-text">{i18n.t('components.transaction_card.hash')} {': '}</div> <ReducedTextAndCopy text={hash} toCopy={hash}></ReducedTextAndCopy>
      </FooterWrapper>
    )
  }

  return (
    <GenericCardWrapper link={link} top={<Top />} footer={<Footer />}>
      <>
        <CardItemTitle>{'#' + transactionData?.id}</CardItemTitle>
      </>
    </GenericCardWrapper>
  )
}

const FooterWrapper = styled.span`
  color: ${(props) => props.theme.textAccent1};
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;

  & > #hash-text { 
    color: ${(props) => props.theme.text};
  }
`