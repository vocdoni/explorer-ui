import { EnvelopeList } from '@lib/types'
import { usePool } from '@vocdoni/react-hooks'
import {
  VotingApi,
} from 'dvote-js'
import { useEffect, useState } from 'react'

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
