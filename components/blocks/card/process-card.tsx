import React from 'react';
import styled from 'styled-components';
import { AnonVoteBadge, ProcessStatusBadge } from '../badges/process-status-badge';
import { BodyWrapper, CardItemTitle, GenericCardWrapper, GenericCardWrapperProps } from '../../elements/card-generic';
import { ReducedOrganizationNameWithIcon } from './entity-card';
import { ensure0x } from '@vocdoni/common';
import { ProcessTimeLeft } from '@components/blocks/process_time_left';
import { ElectionProvider, useElection, OrganizationProvider } from '@vocdoni/chakra-components';
import {
  AllElectionStatus,
  ElectionStatus,
  ElectionStatusReady,
  IElectionSummary,
} from '../../../../VocdoniStack/vocdoni-sdk';
import { PROCESS_DETAILS } from '@const/routes';
import { getPath } from '@components/pages/app/components/get-links';

type ProcessCardProps = GenericCardWrapperProps & {
  electionId: string;
  electionSummary?: IElectionSummary;
  hideEntity?: boolean;
};

export const ElectionCard = ({ electionId, ...rest }: ProcessCardProps) => {
  return (
    <ElectionProvider id={electionId}>
      <InnerCard electionId={electionId} {...rest} />
    </ElectionProvider>
  );
};

const InnerCard = ({ electionId, electionSummary, hideEntity, ...rest }: ProcessCardProps) => {
  const { election, loading: electionLoading } = useElection();
  const link = getPath(PROCESS_DETAILS, {
    electionId: electionId,
  });

  const anonymous = election?.electionType?.anonymous ?? false;
  const startDate = election?.startDate ?? new Date(electionSummary?.startDate) ?? null;
  const endDate = election?.endDate ?? new Date(electionSummary?.endDate) ?? null;
  const title = election?.title?.default ?? electionId;
  const organizationId = election?.organizationId ?? electionSummary?.organizationId ?? null;
  const status = election?.status ?? getVoteStatus(electionSummary?.status, startDate) ?? null;

  const loading = electionLoading && !electionSummary;

  const Top = () => (
    <TopWrapper>
      <ProcessStatusBadge status={status} />
      {anonymous && <AnonVoteBadge />}
      <ProcessTimeLeft status={status} endDate={endDate} startDate={startDate} />
    </TopWrapper>
  );

  const Footer = () => {
    return (
      !hideEntity && (
        <OrganizationProvider id={organizationId}>
          <EntityWrapper>
            <ReducedOrganizationNameWithIcon organizationId={organizationId} />
          </EntityWrapper>
        </OrganizationProvider>
      )
    );
  };

  return (
    !loading && (
      <GenericCardWrapper link={link} top={<Top />} footer={<Footer />} {...rest}>
        <BodyWrapper>
          <CardItemTitle>{title}</CardItemTitle>
        </BodyWrapper>
      </GenericCardWrapper>
    )
  );
};

const EntityWrapper = styled.div`
  color: ${(props) => props.theme.textAccent1};
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0px;
  gap: 16px;
`;

// todo(kon): use SDK to do this conversion
export const getVoteStatus = (status: AllElectionStatus, startDate: Date): ElectionStatus => {
  return status === ElectionStatusReady.READY
    ? startDate <= new Date()
      ? ElectionStatus.ONGOING
      : ElectionStatus.UPCOMING
    : status;
};
