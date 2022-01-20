import React, { Fragment, useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'
import {
  useEntity,
  useBlockHeight,
  useBlockStatus,
  useProcess,
  usePool,
} from '@vocdoni/react-hooks'

import { Question } from '@lib/types'

import { Column, Grid } from '@components/elements/grid'
import { Card, PageCard, StatusCard } from '@components/elements/cards'
import { VoteQuestionCard } from '@components/blocks/vote-question-card'
// import { MetadataFields } from '@components/pages/votes/new/metadata'

import { CardImageHeader } from '@components/blocks/card/image-header'
import { VoteDescription } from '@components/blocks/vote-description'

import { VoteStatus, getVoteStatus } from '@lib/util'
import { Case, Else, If, Switch, Then, Unless, When } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import {
  BlockStatus,
  VochainProcessStatus,
  IProcessResults,
  VotingApi,
  ProcessDetails,
  Voting,
  ProcessResultsSingleChoice,
  EntityMetadata,
} from 'dvote-js'
import {
  DateDiffType,
  localizedDateDiff,
  localizedStartEndDateDiff,
} from '@lib/date'
import { BigNumber } from 'ethers'
import i18n from '@i18n'
import {
  TextAlign,
  Typography,
  TypographyVariant,
} from '@components/elements/typography'
import { colors } from '@theme/colors'
import { useAlertMessage } from '@hooks/message-alert'
import { Button } from '@components/elements/button'

import { ProcessEnvelopeType, ProcessMode, ProcessCensusOrigin } from 'dvote-js'
import { ElectionStatusBadge } from '../components/election-status-badge'
import {
  EntityCardLittle,
  EntityCardMedium,
  EntityLink,
} from '@components/pages/app/components/entity'
import { EnvelopeTypeBadge } from '../components/envelope-type-badge'
import { CensusOriginBadge } from '../components/election-censusorigin-badge'
import { ProcessModeBadge } from '../components/election-processmode-badge'
import { ProcessStatusLabel } from '@components/blocks/process-status-label'
import styled from 'styled-components'
import { SectionText } from '@components/elements/text'
import { Tabs, Tab } from '@components/blocks/tabs'
import { EnvelopeExplorer } from '../components/election-envelope-explorer'


const ElectionDetailPage = () => {
  // const { i18n } = useTranslation()
  const { poolPromise } = usePool()
  const processId = useUrlHash().slice(1)
  // const [processInfo, setProcessInfo] = useState<ProcessDetails>(TEMP_DEFAULT_ENVELOPE)
  // const [loading, setLoading] = useState<boolean>(false)
  const { process: processInfo, error, loading } = useProcess(processId)
  // const [metadata, setMetadata] = useState<EntityMetadata>(TEMP_DEFAULT_ENTITY)
  const { metadata } = useEntity(processInfo?.state?.entityId)
  // const { metadata } = useEntity("0xbba67694b054383dabbc52ee0df5252fa1c0cfd0") // Entity for 1a098a6551329077bdb6661fb384f8c9c40d8de9055108c5959c9fd79e0e4a17
  // const { metadata } = useEntity("0x9b2dd5db2b5ba506453a832fffa886e10ec9ac71") // This Entity works
  const entityMetadata = metadata as EntityMetadata

  const { blockStatus } = useBlockStatus()
  const blockHeight = blockStatus?.blockNumber
  const [rawResults, setRawResults] = useState<VotingApi.RawResults>()
  const [results, setResults] = useState<ProcessResultsSingleChoice>({
    totalVotes: 0,
    questions: [],
  })
  const [resultsWeight, setResultsWeight] = useState(BigNumber.from(0))
  // const [envelopePage, setEnvelopePage] = useState(0)
  // const [envelopeRange, setEnvelopeRange] = useState<EnvelopeList>([])
  const [loadingResults, setLoadingResults] = useState(false)
  const [loadingEnvelopes, setLoadingEnvelopes] = useState(false)
  // const { setAlertMessage } = useAlertMessage()
  const [showDescription, setShowDescription] = useState(true)
  const [showQuestions, setShowQuestions] = useState(false)
  const [showEnvelopes, setShowEnvelopes] = useState(false)

  const voteStatus: VoteStatus = getVoteStatus(processInfo?.state, blockHeight)

  // Election Results
  useEffect(() => {
    setLoadingResults(true)

    poolPromise
      .then((pool) =>
        Promise.all([
          VotingApi.getResults(processId, pool),
          VotingApi.getResultsWeight(processId, pool),
        ])
      )
      .then(([rawResults, resultsWeight]) => {
        console.debug('DEBUG:', 'rawResults', rawResults)
        setRawResults(rawResults)
        setResultsWeight(resultsWeight)

        setLoadingResults(false)
      })
      .catch((err) => {
        console.error(err)

        setLoadingResults(false)
      })
  }, [processId])

  // Set voting results
  useEffect(() => {
    console.debug('DEBUG:', 'processInfo', processInfo)

    if (processInfo && rawResults && processInfo?.metadata) {
      console.debug('DEBUG:', 'processMetadata', processInfo?.metadata)
      setResults(
        Voting.digestSingleChoiceResults(rawResults, processInfo.metadata)
      )
    }
  }, [processInfo, rawResults])

  // DEBUG metadata
  useEffect(() => {
    console.debug(
      'DEBUG:',
      'metadata',
      entityMetadata,
      processInfo?.state?.entityId
    )
  }, [metadata])

  

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
        subtitle={entityMetadata?.name?.default}
        entityImage={entityMetadata?.media?.avatar}
      />

      <When condition={loading}>
        <p>{i18n.t('elections.please_wait')}</p>
      </When>

      <Unless condition={loading || !processInfo}>

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
            <Button>ccc</Button>
          </Tab>
        </Tabs>

        <Grid>
        <EnvelopeExplorer processId={processId} results={results} />
          {/* disable Results because are shown on questions card */}
          {/* <Card>
            <h4>{i18n.t('elections.results')}</h4>
            <If
              condition={
                processInfo?.state?.haveResults &&
                !loadingResults &&
                rawResults &&
                rawResults.results.length > 0
              }
            >
              <Then>
                <p>{i18n.t('elections.results_field_explanation')}</p>
                {rawResults?.results.map((item, idx) => (
                  <Column md={6} lg={4} key={idx}>
                    <strong>
                      {i18n.t('elections.field_n', { number: idx + 1 })}
                    </strong>
                    {item.map((result, i) => (
                      <Fragment key={i}>
                        <p>
                          <code>
                            <small>
                              {i + 1}: {result}
                            </small>
                          </code>
                        </p>
                      </Fragment>
                    ))}
                  </Column>
                ))}
              </Then>
              <Else>
                <p>{i18n.t('elections.the_results_are_not_yet_available')}</p>
              </Else>
            </If>
          </Card> */}

          {/* <Card>
            <h4>
              {i18n.t('elections.envelopes')} ({results.totalVotes || 0})
            </h4>
            <div>
              <Button
                small
                disabled={loadingEnvelopes}
                onClick={prevEnvelopeRange}
              >
                {i18n.t('elections.back')}
              </Button>{' '}
              &nbsp;
              <Button
                small
                disabled={loadingEnvelopes}
                onClick={nextEnvelopeRange}
              >
                {i18n.t('elections.next')}
              </Button>{' '}
              &nbsp;
              <small>
                {i18n.t('elections.page')} {envelopePage + 1}/
                {Math.ceil(results.totalVotes / ENVELOPES_PER_PAGE)}
              </small>
            </div>

            <Grid>
              {envelopeRange.map((envelope, idx) => (
                <Card md={6} lg={4} xl={3} key={envelope.nullifier}>
                  <strong>
                    {i18n.t('elections.envelope_n', {
                      number: envelopePage * ENVELOPES_PER_PAGE + idx + 1,
                    })}
                  </strong>
                  <p>
                    {i18n.t('elections.block')}: {envelope.height || 0}
                  </p>
                  <p>
                    {i18n.t('elections.transaction')}: {envelope.tx_hash || 0}
                  </p>
                </Card>
              ))}
            </Grid>
          </Card> */}
           {/* <Card>
            <h4>{i18n.t('elections.details')}</h4>
            <pre>{JSON.stringify(processInfo?.state, null, 2)}</pre>
          </Card>  */}
        </Grid>
      </Unless>
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
