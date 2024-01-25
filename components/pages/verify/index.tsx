import { Col, Row } from '@components/elements-v2';
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex';
import { Column, Grid } from '@components/elements/grid';
import { Input } from '@components/elements/inputs';
import { DivWithMarginChildren, FakedButton } from '@components/elements/styled-divs';
import { Typography, TypographyVariant } from '@components/elements/typography';
import i18n from '@i18n';
import { colors } from '@theme/colors';
import { useState } from 'react';
import styled from 'styled-components';
import { TopDiv } from '../app/page-templates/list-page';
import { Button } from '@components/elements/button';

const VerifyPage = ({ minified = false, onSubmit }: { minified?: boolean; onSubmit?: (etVoteId: string) => void }) => {
  const [etVoteId, setEtVoteId] = useState(''); // Handle edit text state

  const _onSubmit = (ev) => {
    ev.preventDefault();
    if (onSubmit) onSubmit(etVoteId);
  };

  const voteIdInput = (
    <Input
      wide
      placeholder={i18n.t('verify.add_vote_id')}
      value={etVoteId}
      onChange={(ev) => {
        setEtVoteId(ev.target.value);
      }}
    />
  );

  const logo = <img src="/images/add-vote.svg" alt="Vocdoni Logo" />;

  const title = (
    <Typography variant={TypographyVariant.H4} color={colors.blueText} margin="20px 0 20px 0 ">
      {i18n.t('verify.verify_your_vote')}
    </Typography>
  );

  const VerifyButton = () => (
    <Button positive small onClick={_onSubmit}>
      <FakedButton>{i18n.t('verify.verify')}</FakedButton>
    </Button>
  );

  const minifiedLayout = () => {
    return (
      <>
        <FlexContainer alignItem={FlexAlignItem.Start} justify={FlexJustifyContent.Start}>
          <VoteImageContainerMinified>
            <img src="/images/add-vote.svg" alt="Vocdoni Logo" />
          </VoteImageContainerMinified>
          {title}
        </FlexContainer>
        <TopDiv>
          <InlineInput>{voteIdInput}</InlineInput>
          <LeftMargin>
            <Grid>
              <Column>
                <DivWithMarginChildren>
                  <VerifyButton />
                </DivWithMarginChildren>
              </Column>
            </Grid>
          </LeftMargin>
        </TopDiv>
      </>
    );
  };

  const normalLayout = () => {
    return (
      <>
        <VoteImageContainer>{logo}</VoteImageContainer>
        {title}
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {i18n.t('verify.enter_the_voting_receipt_you_received_after_voting_to_verify_your_vote')}
        </Typography>
        <Col align="center">
          <Row align="center">{voteIdInput}</Row>
        </Col>
        <FlexContainer alignItem={FlexAlignItem.Center} justify={FlexJustifyContent.Center}>
          <ButtonContainer>
            <VerifyButton />
          </ButtonContainer>
        </FlexContainer>
      </>
    );
  };

  return <form onSubmit={_onSubmit}>{minified ? minifiedLayout() : normalLayout()}</form>;
};

export default VerifyPage;

const VoteImageContainer = styled.div`
  width: 100px;
  margin: 60px auto 26px;

  & > img {
    width: 100%;
  }
`;

const VoteImageContainerMinified = styled.div`
  width: 30px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 20px;
  margin-left: 10px;
  & > img {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const InlineInput = styled.span`
  width: 100%;
`;

const LeftMargin = styled.span`
  margin-left: 40px;
`;
