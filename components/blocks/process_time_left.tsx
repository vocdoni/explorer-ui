import React, { useEffect, useState } from 'react'
import { useBlockStatus } from '@vocdoni/react-hooks'
import { ProcessSummary, VotingApi } from 'dvote-js'
import { localizedDateDiff } from '@lib/date'
import { VoteStatus } from '@lib/util'
import { useTranslation } from 'react-i18next'
import { ItemDate } from '@components/elements/styled-divs'


export const ProcessTimeLeft = ({ status, summary } : {status: VoteStatus, summary?: ProcessSummary}) => {
  const { i18n } = useTranslation()

  const [date, setDate] = useState<string>('')
  const { blockStatus } = useBlockStatus()

  useEffect(() => {
    let startDate
    switch (status) {
      case VoteStatus.Active: {
        const endDate = VotingApi.estimateDateAtBlockSync(
          summary?.endBlock,
          blockStatus
        )
        const timeLeft = localizedDateDiff(endDate)
        setDate(timeLeft)
        break
      }

      case VoteStatus.Ended:
        setDate(i18n.t('dashboard.process_ended'))
        break

      case VoteStatus.Paused:
      case VoteStatus.Upcoming:
        startDate = VotingApi.estimateDateAtBlockSync(
          summary?.startBlock,
          blockStatus
        )

        if (new Date(startDate) > new Date() && status === VoteStatus.Paused ) {
          setDate(i18n.t('dashboard.process_paused'))
          break
        }

        setDate(localizedDateDiff(startDate))
        break
    }
  }, [blockStatus])

  return (<ItemDate>{date}</ItemDate>)
}
