import React from 'react';
import { BaseStatusBadge } from '@components/elements/card-badge';
import { VoteStatus } from '@lib/util';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const ProcessStatusBadge = ({ status }: { status: VoteStatus }) => {
  const { i18n } = useTranslation();

  switch (status) {
    case VoteStatus.Active:
      return <ActiveVoteBadge>{i18n.t('vote.badge.active_vote')}</ActiveVoteBadge>;

    case VoteStatus.Upcoming:
      return <UpcomingVoteBadge>{i18n.t('vote.badge.upcoming_vote')}</UpcomingVoteBadge>;

    case VoteStatus.Ended:
      return <EndedVoteBadge>{i18n.t('vote.badge.ended_vote')}</EndedVoteBadge>;

    case VoteStatus.Paused || VoteStatus.Canceled:
      return <PausedVoteBadge>{i18n.t('vote.badge.paused_vote_or_canceled')}</PausedVoteBadge>;
    default:
      return <></>;
  }
};

const ActiveVoteBadge = styled(BaseStatusBadge)`
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
