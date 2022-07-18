import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  useBlockStatus,
  SummaryProcess,
  useBlockHeight,
} from '@vocdoni/react-hooks'
import { EntityMetadata, VotingApi } from 'dvote-js'
import { useTranslation } from 'react-i18next'

import { DateDiffType, localizedDateDiff } from '@lib/date'
import { getVoteStatus, VoteStatus } from '@lib/util'

import { FALLBACK_ACCOUNT_ICON } from '@const/account'
import { Image } from '@components/elements/image'
import { ImageContainer } from '@components/elements/images'

import { ProcessSummaryListItem } from '@components/blocks/list-items'
import moment from 'moment'

interface IProcessListItemProps {
  process: SummaryProcess
  entityId?: string
  entityLogo?: string
  link?: string
  entityMetadata?: EntityMetadata
  hideEntity?: boolean
}

export const ProcessListItem = ({
  process,
  entityId,
  entityLogo,
  link,
  entityMetadata,
  hideEntity = false
}: IProcessListItemProps) => {
  const { i18n } = useTranslation()

  const [date, setDate] = useState<string>('')
  const { blockStatus } = useBlockStatus()
  const { blockHeight } = useBlockHeight()
  const [status, setStatus] = useState<VoteStatus>()

  useEffect(() => {
    setStatus(getVoteStatus(process.summary, blockHeight))
  }, [blockHeight])

  useEffect(() => {
    let startDate

      switch (status) {
        case VoteStatus.Active: {
          const endDate = VotingApi.estimateDateAtBlockSync(
            process?.summary?.endBlock,
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
            process?.summary?.startBlock,
            blockStatus
          )

          if (
            !moment(startDate).isAfter(moment.now()) &&
            status === VoteStatus.Paused
          ) {
            setDate(i18n.t('dashboard.process_paused'))
            break
          }

          setDate(localizedDateDiff(startDate))
          setStatus(VoteStatus.Upcoming)
          break
      }
  }, [blockStatus])

  return (
    <VoteItemWrapper>
      <ProcessSummaryListItem
        icon={ entityLogo }
        link={link}
        description={process?.metadata?.description?.default ?? ''}
        title={process?.metadata?.title?.default ?? process?.id}
        entityId={entityId}
        entityName={
          entityMetadata?.name?.default
            ? entityMetadata?.name?.default
            : entityId
        }
        dateText={date}
        status={status}
        hideEntity={hideEntity}
      />
    </VoteItemWrapper>
  )
}

const VoteItemWrapper = styled.div`
  margin-bottom: 10px;
`
