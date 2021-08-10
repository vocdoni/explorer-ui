import React, { useEffect, useState } from 'react'
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
// import { Else, If, Then, When } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import { DigestedProcessResults, VotingApi } from 'dvote-js'
import { DateDiffType, localizedStrDateDiff } from '@lib/date'
import { BigNumber } from 'ethers'

const VotingPageView = () => {
  // const { i18n } = useTranslation()
  const { poolPromise } = usePool()
  const processId = useUrlHash()
  const { process: processInfo, error, loading } = useProcess(processId)
  const { metadata } = useEntity(processInfo?.state?.entityId)
  const { blockStatus } = useBlockStatus()
  const blockHeight = blockStatus?.blockNumber
  const [results, setResults] = useState<DigestedProcessResults>({ totalVotes: 0, questions: [] })
  const [resultsWeight, setResultsWeight] = useState(BigNumber.from(0))

  const voteStatus: VoteStatus = getVoteStatus(
    processInfo?.state,
    blockHeight
  )

  // Results
  useEffect(() => {
    poolPromise.then(pool => Promise.all([
      VotingApi.getResultsDigest(processId, pool),
      VotingApi.getResultsWeight(processId, pool),
    ])).then(([results, resultsWeight]) => {
      setResults(results)
      setResultsWeight(resultsWeight)
    })
  }, [processId])

  let dateDiffStr = ''
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
      dateDiffStr = localizedStrDateDiff(DateDiffType.Start, date)
    } else {
      // starting in the past
      const date = VotingApi.estimateDateAtBlockSync(
        processInfo?.state?.endBlock,
        blockStatus
      )
      dateDiffStr = localizedStrDateDiff(DateDiffType.End, date)
    }
  }

  return (
    <PageCard>
      <CardImageHeader
        title={processInfo?.metadata?.title.default}
        processImage={processInfo?.metadata?.media.header}
        subtitle={metadata?.name.default}
        entityImage={metadata?.media.avatar}
      />

      <Grid>
        <Column sm={12}>
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
        </Column>
      </Grid>

      {processInfo?.metadata?.questions.map(
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
      {/* 
        <If condition={totalVotes > 0}>
          <Then>
            <Grid>
              <Card sm={12}>
                <TextContainer align={TextAlign.Center}>
                  {i18n.t('vote.total_votes')}: {totalVotes}
                </TextContainer>
              </Card>
            </Grid>
          </Then>
        </If> */}
    </PageCard>
  )
}

export default VotingPageView
