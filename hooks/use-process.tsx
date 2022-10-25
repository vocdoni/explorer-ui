import { usePool } from "@vocdoni/react-hooks"
import { ProcessDetails, ProcessResultsSingleChoice, RawResults, Voting, VotingApi } from "dvote-js"
import { BigNumber } from "ethers"
import { useEffect, useState } from "react"

export const useProcessResults = ({
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
            // todo(ritmo): VotingApi.getResults for encrypted not finished votes don't return envelopHeight properly
            // VotingApi.getResults(processId, pool),
            pool.sendRequest({
              method: 'getResults',
              processId: processId
            }),
            VotingApi.getResultsWeight(processId, pool),
          ])
        )
        .then(([results, resultsWeight]) => {
          const rawResults: RawResults = {
            envelopHeight: results['height'] as number,
            results: results['results'] as string[][],
            status: results['state']
          }
          setRawResults(rawResults)
          setResultsWeight(resultsWeight)

          if (
            processInfo &&
            rawResults &&
            processInfo?.metadata &&
            processInfo?.metadata?.questions
          ) {
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

    // Process Results
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
