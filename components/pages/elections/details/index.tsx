import React, { useEffect } from 'react'
import {
  useEntity,
  useBlockStatus,
} from '@vocdoni/react-hooks'

import { Question } from '@lib/types'
import { Column, Grid } from '@components/elements/grid'
import { PageCard, StatusCard } from '@components/elements/cards'
import { VoteQuestionCard } from '@components/blocks/vote-question-card'
import { CardImageHeader } from '@components/blocks/card/image-header'
import { VoteStatus, getVoteStatus } from '@lib/util'
import {
  BlockStatus,
  VotingApi,
  ProcessDetails,
  EntityMetadata,
} from 'dvote-js'
import {
  DateDiffType,
  localizedDateDiff,
  localizedStartEndDateDiff,
} from '@lib/date'
import i18n from '@i18n'
import {
  Typography,
  TypographyVariant,
} from '@components/elements/typography'
import { colors } from '@theme/colors'
import { ElectionStatusBadge } from '../components/election-status-badge'
import {
  EntityCardMedium,
} from '@components/pages/app/components/entity'
import { EnvelopeTypeBadge } from '../components/envelope-type-badge'
import { CensusOriginBadge } from '../components/election-censusorigin-badge'
import { ProcessModeBadge } from '../components/election-processmode-badge'
import { ProcessStatusLabel } from '@components/blocks/process-status-label'
import { SectionText } from '@components/elements/text'
import { Tabs, Tab } from '@components/blocks/tabs'
import { EnvelopeExplorer } from '../components/election-envelope-explorer'
import { useElectionResults } from '@hooks/use-elections'

interface ElectionDetailPageProps {
  processId: string,
  processInfo: ProcessDetails,
}

const ElectionDetailPage = ({ processId, processInfo }: ElectionDetailPageProps) => {
  // const { i18n } = useTranslation()
  const { metadata } = useEntity(processInfo?.state?.entityId)
  const entityMetadata = metadata as EntityMetadata

  const { blockStatus } = useBlockStatus()
  const blockHeight = blockStatus?.blockNumber
  const voteStatus: VoteStatus = getVoteStatus(processInfo?.state, blockHeight)

  const {loadingResults:loading, results, resultsWeight} = useElectionResults({processId, processInfo})

  // DEBUG metadata
  useEffect(() => {
    console.debug(
      'DEBUG:',
      'metadata',
      entityMetadata,
      processInfo?.state?.entityId
    )
  }, [entityMetadata, metadata, processInfo?.state?.entityId])


  const dateDiffStr = resolveDate(
    processInfo,
    voteStatus,
    blockHeight,
    blockStatus
  )

  return (
    <PageCard>
      <CardImageHeader
        title={processInfo?.metadata?.title?.default}
        processImage={processInfo?.metadata?.media?.header}
        subtitle={i18n.t('elections.id') + ': #' + processId}
        entityImage={entityMetadata?.media?.avatar}
      />

        {/* Created on and ends on */}
        <Typography variant={TypographyVariant.H3} color={colors.blueText}>
          {i18n.t('elections.process_details')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {dateDiffStr}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          <span>{i18n.t('elections.created_on')}: </span>
          <span>
            {localizedDateDiff(new Date(processInfo?.state?.creationTime))}
          </span>
        </Typography>

        {/* Labels and badges */}
        <Grid>
          <Column>
            <ProcessStatusLabel status={voteStatus} />
            <ElectionStatusBadge status={processInfo?.state?.status} />
            <CensusOriginBadge
              censusOrigin={processInfo?.state?.censusOrigin}
            />
            <ProcessModeBadge
              autostart={processInfo?.state?.processMode.autoStart}
            />
            <EnvelopeTypeBadge
              encryptedVotes={processInfo?.state?.envelopeType.encryptedVotes}
            />
          </Column>
        </Grid>

        {/* Three cards grid with various info */}
        <Grid>
          <EntityCardMedium
            md={4}
            icon={entityMetadata?.media?.avatar}
            entityId={processInfo?.state?.entityId}
          >
            {entityMetadata?.name?.default
              ? entityMetadata?.name?.default
              : processInfo?.state?.entityId}
          </EntityCardMedium>
          <StatusCard md={4} title={i18n.t('elections.total_votes')}>
            <h2>{results?.totalVotes || 0}</h2>
          </StatusCard>
          <StatusCard md={4} title={i18n.t('elections.total_questions')}>
            <h2>{processInfo?.metadata?.questions?.length}</h2>
          </StatusCard>
        </Grid>

        {/* Technical details */}
        <Typography variant={TypographyVariant.H3} color={colors.blueText}>
          {i18n.t('elections.detailed_data')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.blueText}>
          {i18n.t('elections.elections_additional_information')}
        </Typography>

        {/* Tabs */}
        <Tabs>
          <Tab label={i18n.t('elections.show_description')}>
            <SectionText color={colors.lightText}>
              {processInfo?.metadata?.description?.default}
            </SectionText>
          </Tab>
          <Tab label={i18n.t('elections.show_questions')}>
            <>
              {processInfo?.metadata?.questions?.map?.(
                (question: Question, index: number) => (
                  <VoteQuestionCard
                    questionIdx={index}
                    key={index}
                    question={question}
                    resultsWeight={resultsWeight}
                    result={results?.questions[index]}
                  />
                )
              )}
            </>
          </Tab>
          <Tab label={i18n.t('elections.show_envelopes')}>
            <EnvelopeExplorer processId={processId} results={results} />
          </Tab>
        </Tabs>
    </PageCard>
  )
}

function resolveDate(
  processInfo: ProcessDetails,
  voteStatus: VoteStatus,
  blockHeight: number,
  blockStatus: BlockStatus
) {
  if (
    processInfo?.state?.startBlock &&
    (voteStatus == VoteStatus.Active ||
      voteStatus == VoteStatus.Paused ||
      voteStatus == VoteStatus.Ended)
  ) {
    if (processInfo?.state?.startBlock > blockHeight) {
      const date = VotingApi.estimateDateAtBlockSync(
        processInfo?.state?.startBlock,
        blockStatus
      )
      return localizedStartEndDateDiff(DateDiffType.Start, date)
    } else {
      // starting in the past
      const date = VotingApi.estimateDateAtBlockSync(
        processInfo?.state?.endBlock,
        blockStatus
      )
      return localizedStartEndDateDiff(DateDiffType.End, date)
    }
  }
}

export default ElectionDetailPage
