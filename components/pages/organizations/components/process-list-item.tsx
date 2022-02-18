import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useBlockStatus,  SummaryProcess} from '@vocdoni/react-hooks'
import { VotingApi } from 'dvote-js'

import { localizedDateDiff } from '@lib/date'
import { VoteStatus } from '@lib/util'


import { FALLBACK_ACCOUNT_ICON } from '@const/account'
import { Image } from '@components/elements/image'
import { ImageContainer } from '@components/elements/images'

// import { VoteListItem } from '../../blocks/list-items'
import moment from 'moment'
import { VoteListItem } from '@components/blocks/list-items'
import i18n from '@i18n'


interface IDashboardProcessListItemProps {
  process: SummaryProcess
  status: VoteStatus
  accountName?: string
  entityLogo?: string
  link?: string
}

export const DashboardProcessListItem = ({
  process,
  accountName,
  status,
  entityLogo,
  link
}: IDashboardProcessListItemProps) => {
  // const { i18n } = useTranslation()

  const [date, setDate] = useState<string>('')
  const { blockStatus } = useBlockStatus()

  useEffect(() => {
    let startDate

    switch (status) {
      case VoteStatus.Active:{
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
      case VoteStatus.Upcoming:{
        startDate = VotingApi.estimateDateAtBlockSync(
          process?.summary?.startBlock,
          blockStatus
        )

        if (!moment(startDate).isAfter(moment.now()) && status === VoteStatus.Paused) {
          setDate(i18n.t('dashboard.process_paused'))
          break
        }

        const timetoStart = localizedDateDiff(startDate)

        setDate(timetoStart)
        status = VoteStatus.Upcoming
        break
      }
    }
  }, [blockStatus])

  return (
    <VoteItemWrapper>
      <VoteListItem
        icon={
          <ImageContainer width="30px" height="30px">
            <Image src={entityLogo || FALLBACK_ACCOUNT_ICON} />
          </ImageContainer>
        }
        link={link}
        description={process?.metadata?.description.default}
        title={process?.metadata?.title.default}
        entityName={accountName}
        dateText={date}
        status={status}
      />
    </VoteItemWrapper>
  )
}

const VoteItemWrapper = styled.div`
  margin-bottom: 10px;
`
