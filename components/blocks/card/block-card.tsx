import { getPath } from '@components/pages/app/components/get-links';
import { BLOCKS_DETAILS } from '@const/routes';
import { useTranslation } from 'react-i18next';
import { localizedDateDiff } from '@lib/date';
import { CardItemTitle, GenericCardWrapper, GenericCardWrapperProps } from '@components/elements/card-generic';
import { ItemDate } from '@components/elements/styled-divs';
import { ensure0x } from 'dvote-js';
import styled from 'styled-components';
import { ReducedTextAndCopy } from '../copy-button';

export const BlockCard = ({
  blockHeight,
  blockTime,
  proposer,
  ...props
}: GenericCardWrapperProps & {
  blockHeight: number;
  blockTime: string;
  proposer: string;
}) => {
  const { i18n } = useTranslation();
  const link = blockHeight
    ? getPath(BLOCKS_DETAILS, {
        blockHeight: blockHeight.toString(),
      })
    : null;

  const Body = () => (
    <BodyWrapper>
      <CardItemTitle>{'#' + blockHeight}</CardItemTitle>
      <CustomItemDate>{localizedDateDiff(new Date(blockTime))}</CustomItemDate>
    </BodyWrapper>
  );

  const Footer = () => {
    const p = ensure0x(proposer);
    return (
      <FooterWrapper>
        <div id="hash-text">
          {i18n.t('components.block_card.proposer')} {': '}
        </div>
        <ReducedTextAndCopy
          text={p}
          toCopy={p}
          copyMessage={i18n.t('copy.hash_copied_to_the_clipboard')}
        ></ReducedTextAndCopy>
      </FooterWrapper>
    );
  };

  return (
    <GenericCardWrapper {...props} link={link} footer={<Footer />}>
      <Body />
    </GenericCardWrapper>
  );
};

const FooterWrapper = styled.span`
  color: ${(props) => props.theme.textAccent1};
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;

  & > #hash-text {
    color: ${(props) => props.theme.text};
  }
`;

const BodyWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  & > h3 {
    margin: 0;
  }
`;

const CustomItemDate = styled(ItemDate)`
  font-size: 100%;
`;
