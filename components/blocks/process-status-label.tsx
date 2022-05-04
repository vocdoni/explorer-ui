import React from 'react'
import { ActiveBadge, UpcomingBadge, EndedBadge, CanceledBadge } from '@components/elements/text-badge'
import { VoteStatus } from '@lib/util'
import { useTranslation } from 'react-i18next'

interface IProcessStatusLabelProps {
  status : VoteStatus
}

export const ProcessStatusLabel = ({status}: IProcessStatusLabelProps) => {
  const { i18n } = useTranslation()

  switch (status) {
    case VoteStatus.Active:
        return <ActiveBadge>{i18n.t('vote.badge.active_vote')}</ActiveBadge>

    case VoteStatus.Upcoming:
        return <UpcomingBadge>{i18n.t('vote.badge.upcoming_vote')}</UpcomingBadge>

    case VoteStatus.Ended:
      return <EndedBadge>{i18n.t('vote.badge.ended_vote')}</EndedBadge>

    case VoteStatus.Paused:
      return <EndedBadge>{i18n.t('vote.badge.paused_vote')}</EndedBadge>

    case VoteStatus.Canceled:
      return <CanceledBadge>{i18n.t('vote.badge.canceled_vote')}</CanceledBadge>

    default:
      return <></>
  }
}
