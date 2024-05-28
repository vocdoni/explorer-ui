import { Card } from '@components/elements/cards';
import { BlockLink, EnvelopeLink, TransactionLink } from '@components/pages/app/components/get-links';
import { useTranslation } from 'next-i18next';
import React, { ReactNode } from 'react';
import { IconContext } from 'react-icons';
import { BiEnvelope } from 'react-icons/bi';
import styled from 'styled-components';
import { SkeletonOnlyBones } from '@components/blocks/skeleton';
import { IElectionVote } from '@vocdoni/sdk';

export const renderCardSkeleton = (skeletonItems) => {
  return (
    <>
      {Array(skeletonItems)
        .fill(0)
        .map((value, index: number) => (
          <EnvelopeCardSkeleton key={index}>
            <SkeletonOnlyBones />
          </EnvelopeCardSkeleton>
        ))}
    </>
  );
};

const EnvelopeCardSkeleton = ({ children }: { children: ReactNode }) => (
  <Card md={6} lg={3} xl={3}>
    {children}
  </Card>
);

export const EnvelopeCard = ({ envelope, idx }: { envelope: IElectionVote; idx: number }) => {
  const { t } = useTranslation();
  return (
    <EnvelopeCardSkeleton>
      <TopDiv>
        <strong>
          {t('processes.envelope_explorer.envelope_n', {
            number: idx, // Is not showing tx index, instead show index of map itself
          })}
        </strong>
        <RightIcon>
          <IconContext.Provider
            value={{
              color: 'gray',
              size: '1.5em',
              style: { paddingLeft: '10px', cursor: 'pointer' },
            }}
          >
            <div>
              <BiEnvelope />
            </div>
          </IconContext.Provider>
        </RightIcon>
      </TopDiv>
      <p>
        <BlockLink blockHeight={envelope.blockHeight}>
          {t('processes.envelope_explorer.block', {
            block: envelope.blockHeight || 0,
          })}
        </BlockLink>
      </p>
      <p>
        <TransactionLink blockHeight={envelope.blockHeight.toString()} index={envelope.transactionIndex.toString()}>
          {t('processes.envelope_explorer.tx_number', {
            txNumber: envelope.transactionIndex || 0,
          })}
        </TransactionLink>
      </p>
      <p>
        <EnvelopeLink nullifier={envelope.voteID}>{t('processes.envelope_explorer.details')}</EnvelopeLink>
      </p>
    </EnvelopeCardSkeleton>
  );
};

const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`;
const RightIcon = styled.div`
  line-height: 20px;
`;
