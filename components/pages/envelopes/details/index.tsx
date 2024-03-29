import { Card, PageCard } from '@components/elements/cards';
import { BadgeColumn, Column, Grid } from '@components/elements/grid';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { BlockLink, ProcessLink, TransactionLink } from '@components/pages/app/components/get-links';
import { useTranslation } from 'react-i18next';
import { colors } from '@theme/colors';
import { BreakWordAll, CenterText, ItemDate, OverflowScroll } from '@components/elements/styled-divs';
import { EncryptionKeysIndexesBadge } from '@components/pages/envelopes/components/EnvelopeEncryptionKeys';
import { localizedDateDiff } from '@lib/date';
import { useState } from 'react';
import { Button } from '@components/elements/button';
import { FlexAlignItem, FlexContainer, FlexJustifyContent, FlexWrap } from '@components/elements/flex';
import styled from 'styled-components';
import { IVoteInfoResponse } from '@vocdoni/sdk';

export const EnvelopeDetails = ({ envelope }: { envelope: IVoteInfoResponse }) => {
  const { i18n } = useTranslation();

  const [showRawContent, setShowRawContent] = useState(false);

  const noLinks = process.env.VERIFY_SINGLE_PAGE;

  return (
    <PageCard>
      <>
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.H3}>{i18n.t('envelopes.details.envelope_details')}</Typography>
            <VoteImageContainer>
              <img src="/images/vocdoni-vote.png" alt="Vote registered" />
            </VoteImageContainer>
            <FlexContainer alignItem={FlexAlignItem.Center} justify={FlexJustifyContent.Center}>
              <h2>{i18n.t('envelopes.details.vote_has_been_registered_correctly')}</h2>
            </FlexContainer>

            <FlexContainer alignItem={FlexAlignItem.Center} justify={FlexJustifyContent.Center} wrap={FlexWrap.Wrap}>
              <Typography variant={TypographyVariant.H5} color={colors.blueText}>
                <CenterText>
                  <strong>{i18n.t('envelopes.details.verifier_code')}</strong>
                  <br></br>
                </CenterText>
                <BreakWordAll>
                  <span>{envelope.voteID}</span>
                </BreakWordAll>
              </Typography>
            </FlexContainer>
            <ItemDate>
              {i18n.t('envelopes.details.emitted')} {localizedDateDiff(new Date(envelope.date))}
            </ItemDate>
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.encryption_keys_used')}:
              <BadgeColumn>
                {envelope.encryptionKeys?.length > 0 ? (
                  envelope.encryptionKeys.map((n) => {
                    return <EncryptionKeysIndexesBadge key={n} type={n}></EncryptionKeysIndexesBadge>;
                  })
                ) : (
                  <EncryptionKeysIndexesBadge type={null}></EncryptionKeysIndexesBadge>
                )}
              </BadgeColumn>
            </Typography>
            {envelope.overwriteCount > 0 && (
              <Typography variant={TypographyVariant.Small}>
                {i18n.t('envelopes.details.overwrite_count')}: {envelope.overwriteCount}
              </Typography>
            )}
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.envelope_weight')}: {envelope.weight}
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.commited_in_block')}:
              {noLinks ? (
                '#' + envelope.blockHeight
              ) : (
                <BlockLink blockHeight={envelope.blockHeight}>#{envelope.blockHeight}</BlockLink>
              )}
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.belongs_to_process')}
              {': '}
              {noLinks ? (
                '0x' + envelope.electionID
              ) : (
                <ProcessLink processId={envelope.electionID}>0x{envelope.electionID}</ProcessLink>
              )}
            </Typography>
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('envelopes.details.transaction_hash')}
              {': '}
              {noLinks ? (
                '0x' + envelope.txHash
              ) : (
                <TransactionLink
                  blockHeight={envelope.blockHeight.toString()}
                  index={envelope.transactionIndex.toString()}
                >
                  0x{envelope.txHash}
                </TransactionLink>
              )}
            </Typography>
          </Column>
        </Grid>
        <Button small positive onClick={() => setShowRawContent(!showRawContent)}>
          {i18n.t('processes.details.see_raw_envelopment_content')}
        </Button>
        {showRawContent && (
          <Card>
            <h3>{i18n.t('transactions.details.raw_contents')}</h3>
            <OverflowScroll>{JSON.stringify(envelope, null, 2)}</OverflowScroll>
          </Card>
        )}
      </>
    </PageCard>
  );
};

const VoteImageContainer = styled.div`
  width: 100px;
  margin: 60px auto 26px;

  & > img {
    width: 100%;
  }
`;
