import React from 'react';
import { BaseStatusBadge } from '@components/elements/card-badge';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ElectionStatus } from '@vocdoni/sdk';

export const ElectionStatusBadge = ({ status }: { status: ElectionStatus }) => {
  const { i18n } = useTranslation();

  switch (status) {
    case ElectionStatus.ONGOING:
      return <OngoingVoteBadge>{i18n.t('vote.badge.ongoing_vote')}</OngoingVoteBadge>;

    case ElectionStatus.UPCOMING:
      return <UpcomingVoteBadge>{i18n.t('vote.badge.upcoming_vote')}</UpcomingVoteBadge>;

    case ElectionStatus.ENDED:
      return <EndedVoteBadge>{i18n.t('vote.badge.ended_vote')}</EndedVoteBadge>;

    case ElectionStatus.RESULTS:
      return <EndedVoteBadge>{i18n.t('vote.badge.results')}</EndedVoteBadge>;

    case ElectionStatus.PAUSED:
    case ElectionStatus.CANCELED:
      return <PausedVoteBadge>{i18n.t('vote.badge.paused_vote_or_canceled')}</PausedVoteBadge>;
    default:
      return <></>;
  }
};

const OngoingVoteBadge = styled(BaseStatusBadge)`
  color: #74af07;
  background: #f3fccc;
`;

export const UpcomingVoteBadge = styled(BaseStatusBadge)`
  color: #1588b9;
  background: #d1fdfa;
`;

const EndedVoteBadge = styled(BaseStatusBadge)`
  color: #db7d24;
  background: #fff3d6;
`;

const PausedVoteBadge = styled(BaseStatusBadge)`
  color: #d62736;
  background: #fee4d6;
`;

export const AnonVoteBadge = () => {
  const { i18n } = useTranslation();
  return <AnonVoteBadgeStyle>{i18n.t('vote.badge.anonymous')}</AnonVoteBadgeStyle>;
};

const AnonVoteBadgeStyle = styled(BaseStatusBadge)`
  color: #c9eaf8;
  background: #2e6864;
`;
