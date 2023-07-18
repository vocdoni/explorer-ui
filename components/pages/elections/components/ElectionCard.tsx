import React from 'react';
import styled from 'styled-components';
import {
  BodyWrapper,
  CardItemTitle,
  GenericCardWrapper,
  GenericCardWrapperProps,
} from '../../../elements/card-generic';
import { ReducedOrganizationNameWithIcon } from '../../organizations/components/OrganizationCard';
import { ProcessTimeLeft } from '@components/blocks/process_time_left';
import { ElectionProvider, OrganizationProvider } from '@vocdoni/chakra-components';
import { IElectionSummary, PublishedElection } from '@vocdoni/sdk';
import { PROCESS_DETAILS } from '@const/routes';
import { getPath } from '@components/pages/app/components/get-links';
import useExtendedElection from '@hooks/use-extended-election';
import { AnonVoteBadge } from '@components/pages/elections/components/ElectionTypeBadge';
import { CustomElectionStatusBadge } from '@components/pages/elections/components/ElectionStatusBadge';

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
  const { election, loading: electionLoading, anonymous } = useExtendedElection();
  const link = getPath(PROCESS_DETAILS, {
    processId: electionId,
  });

  const startDate = election?.startDate ?? new Date(electionSummary?.startDate) ?? null;
  const endDate = election?.endDate ?? new Date(electionSummary?.endDate) ?? null;
  const title = election?.title?.default ?? electionId;
  const organizationId = election?.organizationId ?? electionSummary?.organizationId ?? null;
  const status = election?.status ?? PublishedElection.getStatus(electionSummary?.status, startDate) ?? null;

  const loading = electionLoading && !electionSummary;

  const Top = () => (
    <TopWrapper>
      <CustomElectionStatusBadge status={status} />
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