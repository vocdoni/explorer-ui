import React, { useEffect } from 'react'
import {
  useEntity,
  useBlockStatus,
} from '@vocdoni/react-hooks'

import { BadgeColumn, Grid } from '@components/elements/grid'
import { PageCard, StatusCard } from '@components/elements/cards'
import { CardImageHeader } from '@components/blocks/card/image-header'
import { VoteStatus, getVoteStatus } from '@lib/util'
import {
  BlockStatus,
  VotingApi,
  ProcessDetails,
  EntityMetadata, ProcessResultsSingleChoice,
} from 'dvote-js'
import {
  DateDiffType,
  localizedDateDiff,
  localizedStartEndDateDiff,
} from '@lib/date'
import { useTranslation } from 'react-i18next'
import {
  Typography,
  TypographyVariant,
} from '@components/elements/typography'
import { colors } from '@theme/colors'
import {
  EntityCardMedium,
} from '@components/blocks/card/entity-card'
import { EnvelopeTypeBadge } from '../components/envelope-type-badge'
import { CensusOriginBadge } from '../components/process-censusorigin-badge'
import { ProcessModeBadge } from '../components/process-processmode-badge'
import { AnonVoteBadge, ProcessStatusBadge } from '@components/blocks/badges/process-status-badge'
import { SectionText } from '@components/elements/text'
import { Tabs, Tab } from '@components/blocks/tabs'
import { EnvelopeExplorer } from '../components/process-envelope-explorer'
import { ResultsCard } from '../components/results-card'
import { EncryptionKeys } from '../components/process_keys'
import { CopyButton } from '@components/blocks/copy-button'
import { IElectionInfoResponse } from '@vocdoni/sdk'
import { ElectionCore } from '@vocdoni/sdk/dist/core/election'
import { VochainProcessStatus as ProcessStatus } from '@vocdoni/data-models/dist/protobuf'

interface ProcessesDetailPageProps {
  processId: string,
  processInfo: ProcessDetails,
  results: ProcessResultsSingleChoice
}

const ProcessesDetailPage = ({ electionInfo }: { electionInfo: IElectionInfoResponse }) => {
  const { i18n } = useTranslation()

  const org = "f1125b3ad1e0f558c017898d7753e93f58cb503d"
  // todo
  // const { metadata } = useEntity(electionInfo?.organizationId)
  const { metadata } = useEntity(org)

  const entityMetadata = metadata as EntityMetadata

  const initDate = new Date(electionInfo.startDate);
  const endDate = new Date(electionInfo.endDate);

  const voteStatus: VoteStatus = getVoteStatus(
    electionInfo.status,
    initDate,
    endDate
  )

  const localizedDate = resolveLocalizedDateDiff(
    initDate,
    endDate,
    voteStatus,
  )

  return (
    <PageCard>
      <CardImageHeader
        // title={processInfo?.metadata?.title?.default}
        title={electionInfo.metadata.title.default}
        processImage={electionInfo.metadata.media.header}
        subtitle={
          <>
             <CopyButton toCopy={electionInfo.electionId} text={i18n.t('processes.details.id') + ': 0x' + electionInfo.electionId}/>
          </>}
        entityImage={entityMetadata?.media?.avatar}
      />

        {/* Created on and ends on */}
        <Typography variant={TypographyVariant.H3} color={colors.blueText}>
          {i18n.t('processes.details.process_details')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {localizedDate}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          <span>{i18n.t('processes.details.created_on')} </span>
          <span>
            {localizedDateDiff(new Date(electionInfo.startDate))}
          </span>
        </Typography>

        {/* Labels and badges */}
        <Grid>
          <BadgeColumn>
            <ProcessStatusBadge status={voteStatus} />
            <CensusOriginBadge
              censusOrigin={electionInfo.census.censusOrigin}
            />
            <ProcessModeBadge
              autostart={electionInfo.electionMode.autoStart}
            />
            <EnvelopeTypeBadge
              encryptedVotes={electionInfo.voteMode.encryptedVotes}
            />
            {electionInfo.voteMode.anonymous && <AnonVoteBadge />}
          </BadgeColumn>
        </Grid>

        {/* Three cards grid with various info */}
        <Grid>
          <EntityCardMedium
            md={6}
            icon={entityMetadata?.media?.avatar}
            // todo
            // entityId={electionInfo?.organizationId}
            entityId={org}
          >
            {entityMetadata?.name?.default
              ? entityMetadata?.name?.default
              // todo
              // : electionInfo?.organizationId}
              : org}
          </EntityCardMedium>
          <StatusCard md={3} title={i18n.t('processes.details.vote_recount')}>
            <h2>{electionInfo?.voteCount || 0}</h2>
          </StatusCard>
          <StatusCard md={3} title={i18n.t('processes.details.total_questions')}>
            <h2>{electionInfo?.metadata?.questions?.length}</h2>
          </StatusCard>
        </Grid>

        {/* If encrypted votes show reveal keys status */}
        {electionInfo?.voteMode.encryptedVotes &&
          <EncryptionKeys processId={electionInfo.electionId} />
        }

        {/* Technical details */}
        <Typography variant={TypographyVariant.H3} color={colors.blueText}>
          {i18n.t('processes.details.detailed_data')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.blueText}>
          {i18n.t('processes.details.processes_additional_information')}
        </Typography>

        {/* Tabs */}
        <Tabs>
          <Tab label={i18n.t('processes.details.show_description')}>
            <SectionText color={colors.lightText}>
              {electionInfo?.metadata?.description?.default}
            </SectionText>
          </Tab>
          <Tab label={i18n.t('processes.details.show_questions')}>
            <Grid>
              {/*todo: not working*/}
              <ResultsCard />
            </Grid>
          </Tab>
          {/*todo*/}
          {/*<Tab label={i18n.t('processes.details.show_envelopes')}>*/}
            {/*<EnvelopeExplorer processId={electionInfo.electionId} results={results} />*/}
          {/*</Tab>*/}
        </Tabs>
    </PageCard>
  )
}

// todo: move this somewhere
function resolveLocalizedDateDiff(
  initDate: Date,
  endDate: Date,
  voteStatus: VoteStatus,
) {
  if (
    initDate &&
    (voteStatus == VoteStatus.Active ||
      voteStatus == VoteStatus.Paused ||
      voteStatus == VoteStatus.Ended)
  ) {
    const now = new Date();
    if (initDate > now) {
      return localizedStartEndDateDiff(DateDiffType.Start, initDate)
    } else {
      return localizedStartEndDateDiff(DateDiffType.End, endDate)
    }
  }
}

export default ProcessesDetailPage
