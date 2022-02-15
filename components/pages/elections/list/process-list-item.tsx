import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useBlockStatus, SummaryProcess, useEntity } from '@vocdoni/react-hooks'
import { EntityMetadata, VotingApi } from 'dvote-js'
// import { useTranslation } from 'react-i18next'
import i18n from '@i18n'

import { DateDiffType, localizedDateDiff } from '@lib/date'
import { VoteStatus } from '@lib/util'
import { IProcessesSummary } from '@lib/types'

import { FALLBACK_ACCOUNT_ICON } from '@const/account'
import { Image } from '@components/elements/image'
import { ImageContainer } from '@components/elements/images'

import { ProcessSummaryListItem } from '@components/blocks/list-items'
import moment from 'moment'

interface IDashboardProcessListItemProps {
  process: SummaryProcess
  status: VoteStatus
  entityId?: string
  entityLogo?: string
  link?: string
}

export const DashboardProcessListItem = ({
  process,
  entityId,
  status,
  entityLogo,
  link,
}: IDashboardProcessListItemProps) => {
  // const { i18n } = useTranslation()

  const [date, setDate] = useState<string>('')
  const { blockStatus } = useBlockStatus()
  const { metadata } = useEntity(entityId)
  const entityMetadata = metadata as EntityMetadata

  useEffect(() => {
    let startDate

    switch (status) {
      case VoteStatus.Active:
        const endDate = VotingApi.estimateDateAtBlockSync(
          process?.summary?.endBlock,
          blockStatus
        )
        const timeLeft = localizedDateDiff(endDate)
        setDate(timeLeft)
        break

      case VoteStatus.Ended:
        setDate(i18n.t('dashboard.process_ended'))
        break

      case VoteStatus.Paused:
        startDate = VotingApi.estimateDateAtBlockSync(
          process?.summary?.startBlock,
          blockStatus
        )

        if (!moment(startDate).isAfter(moment.now())) {
          setDate(i18n.t('dashboard.process_paused'))
          break
        }

      case VoteStatus.Upcoming:
        startDate = VotingApi.estimateDateAtBlockSync(
          process?.summary?.startBlock,
          blockStatus
        )

        const timetoStart = localizedDateDiff(startDate)

        setDate(timetoStart)
        status = VoteStatus.Upcoming
        break
    }
  }, [blockStatus])

  return (
    <VoteItemWrapper>
      <ProcessSummaryListItem
        icon={
          <ImageContainer width="30px" height="30px">
            <Image src={entityMetadata?.media?.avatar || FALLBACK_ACCOUNT_ICON} />
          </ImageContainer>
        }
        link={link}
        description={
          process?.metadata?.description?.default ?? ''
        }
        title={process?.metadata?.title?.default ?? process?.id}
        entityId={entityId}
        entityName={
          entityMetadata?.name?.default
            ? entityMetadata?.name?.default
            : entityId
        }
        dateText={date}
        status={status}
      />
    </VoteItemWrapper>
  )
}

const VoteItemWrapper = styled.div`
  margin-bottom: 10px;
`
