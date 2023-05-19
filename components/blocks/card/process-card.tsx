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
  const { election } = useElection();
  const link = getPath(PROCESS_DETAILS, {
    electionId: electionId,
  });

  const anonymous = election?.electionType?.anonymous ?? false;
  const startDate = election?.startDate ?? new Date(electionSummary.startDate);
  const endDate = election?.endDate ?? new Date(electionSummary.endDate);
  const title = election?.title?.default ?? electionSummary.electionId;
  const organizationId = election?.organizationId ?? electionSummary.organizationId;
  const status = election?.status ?? getVoteStatus(electionSummary.status, startDate); // todo(kon): fix types here

  const Top = () => (
    <TopWrapper>
      <ProcessStatusBadge status={status} />
      {anonymous && <AnonVoteBadge />}
      <ProcessTimeLeft status={status} endDate={endDate} startDate={startDate} />
    </TopWrapper>
  );

  const Footer = () => (
    <OrganizationProvider id={organizationId}>
      <EntityWrapper>
        <ReducedOrganizationNameWithIcon organizationId={organizationId}></ReducedOrganizationNameWithIcon>
      </EntityWrapper>
    </OrganizationProvider>
  );

  return (
    <GenericCardWrapper link={link} top={<Top />} footer={<Footer />} {...rest}>
      <BodyWrapper>
        <CardItemTitle>{title}</CardItemTitle>
      </BodyWrapper>
    </GenericCardWrapper>
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
