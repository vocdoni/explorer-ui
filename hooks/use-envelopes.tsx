import { EnvelopeList } from '@lib/types'
import { usePool } from '@vocdoni/react-hooks'
import {
  ProcessDetails,
  ProcessResultsSingleChoice,
  RawResults,
  Voting,
  VotingApi,
} from 'dvote-js'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'

export const useEnvelopesList = ({
  processId,
  from,
  listSize,
}: {
  processId: string
  from: number
  listSize: number
}) => {
  const [envelopeRange, setEnvelopeRange] = useState<EnvelopeList>([])
  const { poolPromise } = usePool()
  const [loadingEnvelopes, setLoadingEnvelopes] = useState(false)

  const loadEnvelopeRange = () => {
    setLoadingEnvelopes(true)
    poolPromise
      .then((pool) =>
        VotingApi.getEnvelopeList(
          processId,
          from,
          listSize,
          pool
        )
      )
      .then((envelopes) => {
        setLoadingEnvelopes(false)
        setEnvelopeRange(envelopes)
        console.debug('DEBUG:', 'envelopes', envelopes)
      })
      .catch((err) => {
        setLoadingEnvelopes(false)
        console.error(err)
      })
  }

  // Election Envelopes
  useEffect(() => {
    if (processId) loadEnvelopeRange()
  }, [from, processId, listSize])

  return {
    loadingEnvelopes,
    envelopeRange,
  }
}

export const useElectionResults = ({
  processId,
  processInfo,
}: {
  processId: string
  processInfo: ProcessDetails
}) => {
  const [resultsWeight, setResultsWeight] = useState(BigNumber.from(0))
  const [rawResults, setRawResults] = useState<RawResults>()
  const [results, setResults] = useState<ProcessResultsSingleChoice>({
    totalVotes: 0,
    questions: [],
  })
  const { poolPromise } = usePool()
  const [loadingResults, setLoadingResults] = useState(false)

  const getResults = () => {
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

        if (
          processInfo &&
          rawResults &&
          processInfo?.metadata &&
          processInfo?.metadata?.questions
        ) {
          console.debug('DEBUG:', 'processMetadata', processInfo?.metadata)
          setResults(
            Voting.digestSingleChoiceResults(rawResults, processInfo?.metadata)
          )
        }

        setLoadingResults(false)
      })
      .catch((err) => {
        console.error(err)

        setLoadingResults(false)
      })
  }

  // Election Results
  useEffect(() => {
    if (processId) getResults()
  }, [poolPromise, processId, processInfo])

  return {
    resultsWeight,
    rawResults,
    results,
    loadingResults,
  }
}
