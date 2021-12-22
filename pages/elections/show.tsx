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
import { Card, PageCard } from '@components/elements/cards'
import { VoteQuestionCard } from '@components/blocks/vote-question-card'
// import { MetadataFields } from '@components/pages/votes/new/metadata'

import { CardImageHeader } from '@components/blocks/card/image-header'
import { VoteDescription } from '@components/blocks/vote-description'

import { VoteStatus, getVoteStatus } from '@lib/util'
import { Case, Else, If, Switch, Then, Unless, When } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import { BlockStatus, VochainProcessStatus, IProcessResults, VotingApi, ProcessDetails, Voting, ProcessResultsSingleChoice } from 'dvote-js'
import { DateDiffType, localizedStartEndDateDiff } from '@lib/date'
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

type EnvelopeList = Awaited<ReturnType<typeof VotingApi.getEnvelopeList>>

const ENVELOPES_PER_PAGE = 12

const VotingPageView = () => {
  // const { i18n } = useTranslation()
  const { poolPromise } = usePool()
  const processId = useUrlHash()
  const { process: processInfo, error, loading } = useProcess(processId)
  const { metadata } = useEntity(processInfo?.state?.entityId)
  const { blockStatus } = useBlockStatus()
  const blockHeight = blockStatus?.blockNumber
  const [rawResults, setRawResults] = useState<string[][]>([])
  const [results, setResults] = useState<ProcessResultsSingleChoice>({ totalVotes: 0, questions: [] })
  const [resultsWeight, setResultsWeight] = useState(BigNumber.from(0))
  const [envelopePage, setEnvelopePage] = useState(0)
  const [envelopeRange, setEnvelopeRange] = useState<EnvelopeList>([])
  const [loadingResults, setLoadingResults] = useState(false)
  const [loadingEnvelopes, setLoadingEnvelopes] = useState(false)
  // const { setAlertMessage } = useAlertMessage()

  const voteStatus: VoteStatus = getVoteStatus(
    processInfo?.state,
    blockHeight
  )

  // Results
  useEffect(() => {
    setLoadingResults(true)

    poolPromise.then(pool => Promise.all([
      VotingApi.getResults(processId, pool),
      VotingApi.getResultsWeight(processId, pool),
    ]))
      .then(([rawResults, resultsWeight]) => {
        setRawResults(rawResults.results)
        setResults(Voting.digestSingleChoiceResults(rawResults, processInfo.metadata))
        setResultsWeight(resultsWeight)

        setLoadingResults(false)
      })
      .catch(err => {
        setLoadingResults(false)
      })
  }, [processId])

  useEffect(() => {
    setLoadingEnvelopes(true)

    poolPromise
      .then(pool => VotingApi.getEnvelopeList(processId, envelopePage * ENVELOPES_PER_PAGE, ENVELOPES_PER_PAGE, pool))
      .then(envelopes => {
        setLoadingEnvelopes(false)
        setEnvelopeRange(envelopes)

        console.log(envelopes)
      })
      .catch(err => {
        setLoadingEnvelopes(false)

        console.error(err)
      })
  }, [envelopePage])

  const nextEnvelopeRange = () => {
    if ((envelopePage + 1) * ENVELOPES_PER_PAGE >= results.totalVotes) return
    setEnvelopePage(envelopePage + 1)
  }
  const prevEnvelopeRange = () => {
    if (envelopePage <= 0) return
    setEnvelopePage(envelopePage - 1)
  }

  const dateDiffStr = resolveDate(processInfo, voteStatus, blockHeight, blockStatus)

  return (
    <PageCard>
      <CardImageHeader
        title={processInfo?.metadata?.title?.default}
        processImage={processInfo?.metadata?.media?.header}
        subtitle={metadata?.name?.default}
        entityImage={metadata?.media?.avatar}
      />

      <When condition={loading}>
        <p>{i18n.t("elections.please_wait")}</p>
      </When>

      <Unless condition={loading || !processInfo}>
        <VoteDescription
          description={processInfo?.metadata?.description.default}
          liveStream={processInfo?.metadata?.media.streamUri}
          // discussionUrl={
          //   processInfo?.metadata?.meta[MetadataFields.DiscussionLink]
          // }
          // attachmentUrl={
          //   processInfo?.metadata?.meta[MetadataFields.AttachmentLink]
          // }
          timeComment={dateDiffStr}
          voteStatus={voteStatus}
        />

        <p>{i18n.t("elections.host_organization")}: {processInfo?.state?.entityId}</p>
        <Switch>
          <Case condition={processInfo?.state?.status == VochainProcessStatus.READY}>
            <p>{i18n.t("elections.status")} : {i18n.t("elections.ready")}</p>
          </Case>
          <Case condition={processInfo?.state?.status == VochainProcessStatus.PAUSED}>
            <p>{i18n.t("elections.status")} : {i18n.t("elections.paused")}</p>
          </Case>
          <Case condition={processInfo?.state?.status == VochainProcessStatus.ENDED}>
            <p>{i18n.t("elections.status")} : {i18n.t("elections.ended")}</p>
          </Case>
          <Case condition={processInfo?.state?.status == VochainProcessStatus.CANCELED}>
            <p>{i18n.t("elections.status")} : {i18n.t("elections.canceled")}</p>
          </Case>
          <Case condition={processInfo?.state?.status == VochainProcessStatus.RESULTS}>
            <p>{i18n.t("elections.status")} : {i18n.t("elections.results")}</p>
          </Case>
        </Switch>
        <p>{i18n.t('elections.total_votes')}: {results?.totalVotes || 0}</p>

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


        <Typography variant={TypographyVariant.H3} color={colors.blueText} >
          {i18n.t('elections.technical_details')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.blueText} >
          {i18n.t('elections.low_level_information')}
        </Typography>

        <Grid>
          <Card>
            <h4>{i18n.t('elections.results')}</h4>
            <If condition={processInfo?.state?.haveResults && !loadingResults}>
              <Then>
                <p>{i18n.t('elections.results_field_explanation')}</p>
                <Grid>
                  {
                    rawResults.map((item, idx) => <Column md={6} lg={4} key={idx}>
                      <strong>{i18n.t("elections.field_n", { number: idx + 1 })}</strong>
                      {item.map((result, i) => <Fragment key={i}>
                        <p><code><small>{i + 1}: {result}</small></code></p>
                      </Fragment>)}
                    </Column>)
                  }
                </Grid>
              </Then>
              <Else>
                <p>{i18n.t('elections.the_results_are_not_yet_available')}</p>
              </Else>
            </If>
          </Card>

          <Card>
            <h4>{i18n.t('elections.envelopes')} ({results.totalVotes || 0})</h4>
            <div>
              <Button small disabled={loadingEnvelopes} onClick={prevEnvelopeRange}>{i18n.t('elections.back')}</Button> &nbsp;
              <Button small disabled={loadingEnvelopes} onClick={nextEnvelopeRange}>{i18n.t('elections.next')}</Button> &nbsp;
              <small>{i18n.t('elections.page')} {envelopePage + 1}/{Math.ceil(results.totalVotes / ENVELOPES_PER_PAGE)}</small>
            </div>

            <Grid>
              {envelopeRange.map((envelope, idx) => <Card md={6} lg={4} xl={3} key={envelope.nullifier}>
                <strong>{i18n.t("elections.envelope_n", { number: envelopePage * ENVELOPES_PER_PAGE + idx + 1 })}</strong>
                <p>{i18n.t("elections.block")}: {envelope.height || 0}</p>
                <p>{i18n.t("elections.transaction")}: {envelope.tx_hash || 0}</p>
              </Card>)}
            </Grid>
          </Card>
          <Card>
            <h4>{i18n.t('elections.details')}</h4>
            <pre>
              {JSON.stringify(processInfo?.state, null, 2)}
            </pre>
          </Card>
        </Grid>
      </Unless>

    </PageCard>
  )
}

function resolveDate(processInfo: ProcessDetails, voteStatus: VoteStatus, blockHeight: number, blockStatus: BlockStatus) {
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

export default VotingPageView
