import { getPath } from '@components/pages/app/components/get-links';
import { TRANSACTIONS_DETAILS } from '@const/routes';
import { useTranslation } from 'react-i18next';
import { TransactionTypeBadge } from '../badges/transaction-type-badge';
import { CardItemTitle, GenericCardWrapper, GenericCardWrapperProps } from '@components/elements/card-generic';
import styled from 'styled-components';
import { ReducedTextAndCopy } from '@components/blocks/copy-button';
import { ensure0x, IChainTxReference } from '@vocdoni/sdk';

export const TransactionCard = ({
  tx,
}: GenericCardWrapperProps & {
  tx: IChainTxReference;
}) => {
  const { i18n } = useTranslation();

  const link = getPath(TRANSACTIONS_DETAILS, {
    blockHeight: tx?.blockHeight?.toString(),
    index: tx?.transactionIndex?.toString() ?? '0',
  });

  const Top = () => (
    <>
      <TransactionTypeBadge type={tx.transactionType}></TransactionTypeBadge>
    </>
  );

  const Footer = () => {
    const hash = ensure0x(tx?.transactionHash);
    return (
      <FooterWrapper>
        <div id="hash-text">
          {i18n.t('components.transaction_card.hash')} {': '}
        </div>
        <ReducedTextAndCopy text={hash} toCopy={hash} copyMessage={i18n.t('copy.hash_copied_to_the_clipboard')} />
      </FooterWrapper>
    );
  };

  return (
    <GenericCardWrapper link={link} top={<Top />} footer={<Footer />}>
      <>
        <CardItemTitle>{'#' + tx?.transactionNumber}</CardItemTitle>
      </>
    </GenericCardWrapper>
  );
};

const FooterWrapper = styled.span`
  color: ${(props) => props.theme.textAccent1};
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;

  & > #hash-text {
    color: ${(props) => props.theme.text};
  }
`;
