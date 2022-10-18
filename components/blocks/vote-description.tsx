import React from 'react'
import styled from 'styled-components'
import { VoteStatus } from '@lib/util'

import { useTranslation } from 'react-i18next'

import { colors } from 'theme/colors'

import { SectionText, TextSize } from '@components/elements/text'
import { Button, JustifyContent, LinkTarget } from '@components/elements/button'
import { Column, Grid } from '@components/elements/grid'
import { ProcessStatusBadge } from '@components/blocks/badges/process-status-badge'
import { When } from 'react-if'
// import { HelpText } from '@components/blocks/help-text'

interface IVotePageProps {
  description: string
  liveStream: string
  attachmentUrl?: string
  discussionUrl?: string
  voteStatus: VoteStatus
  timeComment: string
}
export const VoteDescription = ({
  description,
  liveStream,
  attachmentUrl,
  discussionUrl,
  voteStatus,
  timeComment,
}: IVotePageProps) => {

  return (
    <Grid>
      <Column>
        <ProcessStatusBadge status={voteStatus} />
      </Column>

      <Column>
        <DescriptionText color={colors.lightText}>{timeComment}</DescriptionText>
      </Column>

      <Column>
        <DescriptionText color={colors.lightText}>{description}</DescriptionText>
      </Column>

    </Grid>
  )
}

const DescriptionText = styled(SectionText)`
  white-space: pre-line;
`
