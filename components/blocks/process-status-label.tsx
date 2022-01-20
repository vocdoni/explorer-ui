import React from 'react'
import { ActiveBadge, UpcomingBadge, EndedBadge, CanceledBadge } from '@components/elements/text-badge'
// import { useTranslation } from 'react-i18next'
import { VoteStatus } from '@lib/util'
import i18n from '@i18n'

interface IProcessStatusLabelProps {
  status : VoteStatus
}

export const ProcessStatusLabel = ({status}: IProcessStatusLabelProps) => {
  // const { i18n } = useTranslation()

  switch (status) {
    case VoteStatus.Active:
        return <ActiveBadge>{i18n.t('vote.active_vote')}</ActiveBadge>

    case VoteStatus.Upcoming:
        return <UpcomingBadge>{i18n.t('vote.upcoming_vote')}</UpcomingBadge>

    case VoteStatus.Ended:
      return <EndedBadge>{i18n.t('vote.ended_vote')}</EndedBadge>

    case VoteStatus.Paused:
      return <EndedBadge>{i18n.t('vote.paused_vote')}</EndedBadge>

    case VoteStatus.Canceled:
      return <CanceledBadge>{i18n.t('vote.canceled_vote')}</CanceledBadge>

    default:
      return <></>
  }
}
