import React from 'react';
import styled from 'styled-components';
import { SummaryProcess, useBlockHeight, useEntity } from '@vocdoni/react-hooks';
import { EntityMetadata, ProcessSummary } from 'dvote-js';
import { AnonVoteBadge, ProcessStatusBadge } from '../badges/process-status-badge';
import { BodyWrapper, CardItemTitle, GenericCardWrapper, GenericCardWrapperProps } from '../../elements/card-generic';
import { ReducedEntityNameWithIcon } from './entity-card';
import { ensure0x } from '@vocdoni/common';
import { ProcessTimeLeft } from '@components/blocks/process_time_left';
import { getVoteStatus } from '@lib/util';

type ProcessCardProps = GenericCardWrapperProps & {
  process: SummaryProcess;
  entityId?: string;
  link?: string;
  hideEntity?: boolean;
};

export const ProcessCard = ({ process, entityId, link }: ProcessCardProps) => {
  const { metadata } = useEntity(ensure0x(entityId));
  const entityMetadata = metadata as EntityMetadata;
  const entityLogo = metadata?.media.header;

  const t = process?.metadata?.title?.default;
  const title = t && t.length > 0 ? t : process?.id;
  const entityName = entityMetadata?.name?.default ? entityMetadata?.name?.default : entityId;

  const Top = () => (
    <TopWrapper>
      <StatusBadgeAndTimeLeft summary={process.summary} />
    </TopWrapper>
  );

  const Footer = () => (
    <EntityWrapper>
      <ReducedEntityNameWithIcon
        entityName={entityName}
        entityId={entityId}
        icon={entityLogo}
      ></ReducedEntityNameWithIcon>
    </EntityWrapper>
  );

  return (
    <GenericCardWrapper link={link} top={<Top />} footer={<Footer />}>
      <BodyWrapper>
        <CardItemTitle>{title}</CardItemTitle>
        {/* <CardItemSubTitle>
          <strong>{i18n.t('processes.list.votes_submitted')}: </strong>xx
        </CardItemSubTitle> */}
      </BodyWrapper>
    </GenericCardWrapper>
  );
};

const StatusBadgeAndTimeLeft = ({ summary }: { summary?: ProcessSummary }) => {
  const { blockHeight } = useBlockHeight();
  // todo(kon): use the sdk to do this. Actually it gets the election summary using the old RPC, mixing types.
  const status = getVoteStatus(summary, blockHeight);
  return (
    <>
      <ProcessStatusBadge status={status} />
      {summary.envelopeType.anonymous && <AnonVoteBadge />}
      <ProcessTimeLeft status={status} summary={summary} />
    </>
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
