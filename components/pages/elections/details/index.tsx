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
import { BlockStatus, VochainProcessStatus, IProcessResults, VotingApi, ProcessDetails, Voting, ProcessResultsSingleChoice,
  EntityMetadata} from 'dvote-js'
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

import { ProcessEnvelopeType, ProcessMode, ProcessCensusOrigin} from 'dvote-js'
import { ElectionStatusBadge } from '../components/election-status-badge'
import { EntityCardLittle, EntityCardMedium, EntityLink } from '@components/pages/app/components/entity'
import { EnvelopeTypeBadge } from '../components/envelope-type-badge'
import { CensusOriginBadge } from '../components/election-censusorigin-badge'
import { ProcessModeBadge } from '../components/election-processmode-badge'
import { ProcessStatusLabel } from '@components/blocks/process-status-label'

type EnvelopeList = Awaited<ReturnType<typeof VotingApi.getEnvelopeList>>

const ENVELOPES_PER_PAGE = 12

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

  // Election Results
  useEffect(() => {
    setLoadingResults(true)

    poolPromise.then(pool => Promise.all([
      VotingApi.getResults(processId, pool),
      // VotingApi.getResultsWeight(processId, pool),
    ]))
      // .then(([rawResults, resultsWeight]) => {
      .then(([rawResults]) => {
        setRawResults(rawResults)
        // setResultsWeight(resultsWeight)

        setLoadingResults(false)
      })
      .catch(err => {
        console.error(err)

        setLoadingResults(false)
      })
  }, [processId])

  // Set voting results
  useEffect(() => {
    console.debug("DEBUG:", "processInfo", processInfo)

    if(processInfo && rawResults && processInfo?.metadata) {
      setResults(Voting.digestSingleChoiceResults(rawResults, processInfo.metadata))
    }
  }, [processInfo, rawResults])

  // DEBUG metadata 
  useEffect(() => {
    console.debug("DEBUG:", "metadata", entityMetadata, processInfo?.state?.entityId)
  }, [metadata])

  // Election Envelopes
  useEffect(() => {
    setLoadingEnvelopes(true)

    poolPromise
      .then(pool => VotingApi.getEnvelopeList(processId, envelopePage * ENVELOPES_PER_PAGE, ENVELOPES_PER_PAGE, pool))
      .then(envelopes => {
        setLoadingEnvelopes(false)
        setEnvelopeRange(envelopes)

        console.debug("DEBUG:", "envelopes" ,envelopes)
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
        subtitle={entityMetadata?.name?.default}
        entityImage={entityMetadata?.media?.avatar}
      />

      <When condition={loading}>
        <p>{i18n.t("elections.please_wait")}</p>
      </When>

      <Unless condition={loading || !processInfo}>
        <Typography variant={TypographyVariant.H3} color={colors.blueText} >
          {i18n.t('elections.process_details')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText} >
          {dateDiffStr}
        </Typography>


        {/* <VoteDescription
          description={processInfo?.metadata?.description?.default}
          liveStream={processInfo?.metadata?.media?.streamUri}
          // discussionUrl={
          //   processInfo?.metadata?.meta[MetadataFields.DiscussionLink]
          // }
          // attachmentUrl={
          //   processInfo?.metadata?.meta[MetadataFields.AttachmentLink]
          // }
          timeComment={dateDiffStr}
          voteStatus={voteStatus}
        /> */}
        <Grid>
          <ProcessStatusLabel status={voteStatus} />
          <ElectionStatusBadge status={processInfo?.state?.status} />
          <p>
            {/* {i18n.t('elections.census_origin')}: */" "} -
            <CensusOriginBadge censusOrigin={processInfo?.state?.censusOrigin}/> 
          </p>
          <p>
            {/* {i18n.t('elections.process_mode')}:  */ " "} -
            <ProcessModeBadge autostart={processInfo?.state?.processMode.autoStart}/>
          </p>
        </Grid>

        
        <Grid>
          <EntityCardMedium md={4} icon={entityMetadata?.media?.avatar} entityId={processInfo?.state?.entityId}>
            {entityMetadata?.name?.default ? entityMetadata?.name?.default : processInfo?.state?.entityId }
          </EntityCardMedium>
          <StatusCard md={4} title={i18n.t("elections.total_votes")} >
              <h2>{results?.totalVotes || 0}</h2>
          </StatusCard>

          <StatusCard md={4} title={i18n.t("elections.envelope_type")} >
              <h2><EnvelopeTypeBadge encryptedVotes={processInfo?.state?.envelopeType.encryptedVotes}/></h2>
          </StatusCard>
        </Grid>
        
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
            <If condition={
              processInfo?.state?.haveResults 
              && !loadingResults 
              && rawResults 
              && rawResults.results.length > 0
              }>
              <Then>
                <p>{i18n.t('elections.results_field_explanation')}</p>
                <Grid>
                  {
                    rawResults?.results.map((item, idx) => <Column md={6} lg={4} key={idx}>
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

// TODO: remove hardcoded data
const TEMP_DEFAULT_ENTITY: EntityMetadata = {
  "version": "1.0",
  "languages": [
    "default"
  ],
  "name": {
    "default": "EntityName"
  },
  "description": {
    "default": "Description of the entity"
  },
  "newsFeed": {
    "default": "ipfs://QmWybQwdBwF81Dt71bNTDDr8PBpW9kNbWtQ64arswaBz1C"
  },
  "media": {
    "avatar": "ipfs://QmVfcyU3eJ4QjJSBuRVwpzv5yV1EDfVueyUURyAzBfN3CY",
    "header": "ipfs://QmVfcyU3eJ4QjJSBuRVwpzv5yV1EDfVueyUURyAzBfN3CY"
  },
  "meta": {},
  "actions": []
}

const TEMP_DEFAULT_ENVELOPE: ProcessDetails = {
  "id": "0x1a098a6551329077bdb6661fb384f8c9c40d8de9055108c5959c9fd79e0e4a17",
  "metadata":  {
    "description": {
      "default": "Retrieved description for the election"
    },
    "media": {
      "header": "https://my/header.jpeg",
      "streamUri": "https://youtu.be/1234"
    },
    "questions": [
      {
        "choices": [
          {
            "title": {
              "default": "Yes"
            },
            "value": 0
          },
          {
            "title": {
              "default": "No"
            },
            "value": 1
          },
          {
            "title": {
              "default": "Maybe"
            },
            "value": 2
          }
        ],
        "description": {
          "default": "(optional)"
        },
        "title": {
          "default": "Question 1 goes here"
        }
      },
      {
        "choices": [
          {
            "title": {
              "default": "Yes"
            },
            "value": 0
          },
          {
            "title": {
              "default": "No"
            },
            "value": 1
          },
          {
            "title": {
              "default": "Maybe"
            },
            "value": 2
          },
          {
            "title": {
              "default": "Blank"
            },
            "value": 3
          }
        ],
        "description": {
          "default": "(optional)"
        },
        "title": {
          "default": "Question 2 title goes here"
        }
      }
    ],
    "results": {
      "aggregation": "discrete-counting",
      "display": "multiple-choice"
    },
    "title": {
      "default": "Title of the election"
    },
    "version": "1.1"
  },
  "state": {
    "censusOrigin": 3,
    "censusRoot": "0x03cd13285ea116b9093a47364b29ddb09eccf50aa2f0112b6084a0b10943964d4e",
    "censusURI": "",
    "creationTime": "2021-12-20T15:37:36Z",
    "endBlock": 20826,
    "entityId": "0xbba67694b054383dabbc52ee0df5252fa1c0cfd0",
    "entityIndex": 1,
    "envelopeType": {"encryptedVotes": false},
    "finalResults": true,
    "haveResults": true,
    // "maxCensusSize": 8589934592,
    "metadata": "ipfs://QmSn3un2BaK2RoNmQA7rid6FHZH7921mwrSKp5QW97ZoDA",
    "namespace": 0,
    "processId": "0x1a098a6551329077bdb6661fb384f8c9c40d8de9055108c5959c9fd79e0e4a17",
    "processMode": {
      "autoStart": true
    },
    "questionIndex": 0,
    // "rollingCensusRoot": "",
    // "rollingCensusSize": 0,
    "sourceBlockHeight": 0,
    // "sourceNetworkId": "UNKNOWN",
    "startBlock": 20501,
    "status": 5,
    "voteOptions": {
      "costExponent": 1,
      "maxCount": 2,
      "maxTotalCost": 8,
      "maxValue": 4,
      "maxVoteOverwrites" : 0
    }
  }
}


export default ElectionDetailPage
