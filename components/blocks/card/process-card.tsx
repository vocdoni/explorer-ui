import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  useBlockStatus,
  SummaryProcess,
  useBlockHeight,
} from '@vocdoni/react-hooks'
import { EntityMetadata, VotingApi } from 'dvote-js'
import { useTranslation } from 'react-i18next'

import { localizedDateDiff } from '@lib/date'
import { getVoteStatus, VoteStatus } from '@lib/util'


import moment from 'moment'
import { ProcessStatusLabel } from '../process-status-label'
import { ReducedEntityNameWithIcon } from '@components/pages/app/components/entity'
import { ItemDate } from '@components/elements/styled-divs'
import { CardItemSubTitle, CardItemTitle, GenericCardWrapper, GenericCardWrapperProps } from '../../elements/card-generic'


type ProcessCardProps = GenericCardWrapperProps & {
  process: SummaryProcess
  entityId?: string
  entityLogo?: string
  link?: string
  entityMetadata?: EntityMetadata
  hideEntity?: boolean
}

export const ProcessCard = ({
  process,
  entityId,
  entityLogo,
  link,
  entityMetadata,
}: ProcessCardProps) => {
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

  const t = process?.metadata?.title?.default
  const title = t && t.length > 0 ? t : process?.id
  const entityName = entityMetadata?.name?.default
    ? entityMetadata?.name?.default
    : entityId

  const Top = () => (
    <>
      <ProcessStatusLabel status={status}></ProcessStatusLabel>
      <ItemDate>{date}</ItemDate>
    </>
  )

  const Footer = () => (
    <EntityWrapper>
      <ReducedEntityNameWithIcon
        entityName={entityName}
        entityId={entityId}
        icon={entityLogo}
      ></ReducedEntityNameWithIcon>
    </EntityWrapper>
  )

  return (
    <GenericCardWrapper link={link} top={<Top />} footer={<Footer />}>
      <>
        <CardItemTitle>{title}</CardItemTitle>
        <CardItemSubTitle>
          <strong>{i18n.t('processes.list.votes_submitted')}: </strong>xx
        </CardItemSubTitle>
      </>
    </GenericCardWrapper>
  )
}

const EntityWrapper = styled.div`
  color: ${(props) => props.theme.textAccent1};
`


