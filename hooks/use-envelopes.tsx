import { Envelope, EnvelopeAll, EnvelopeList } from '@lib/types'
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
      })
      .catch((err) => {
        setLoadingEnvelopes(false)
        console.error(err)
      })
  }

  useEffect(() => {
    if (processId) loadEnvelopeRange()
  }, [from, processId, listSize])

  return {
    loadingEnvelopes,
    envelopeRange,
  }
}


export const useEnvelope = ({
  nullifier,
}: {
  nullifier: string
}) => {
  const [envelope, setEnvelope] = useState<EnvelopeAll>()
  const { poolPromise } = usePool()
  const [loadingEnvelope, setLoadingEnvelope] = useState(false)

  const loadEnvelope = () => {
    setLoadingEnvelope(true)
    poolPromise
      .then((pool) =>
        // todo(ritmo): VotingApi.getEnvelope return a EnvelopeFull object which not implement encryption_key_indexes
        Promise.all([
          // todo(ritmo): VotingApi.getResults for encrypted not finished votes don't return envelopHeight properly
          // VotingApi.getResults(processId, pool),
          pool.sendRequest({
            method: 'getEnvelope',
            nullifier: nullifier
          }),
          pool.sendRequest({
            method: 'getEnvelopeStatus',
            nullifier: nullifier
          }),
        ])
      )
      .then(([getEnvelope, getEnvelopeStatus]) => {
        setLoadingEnvelope(false)
        const e: EnvelopeAll = getEnvelope['envelope'] as EnvelopeAll
        e.timestamp = getEnvelopeStatus['blockTimestamp']
        e.registered = getEnvelopeStatus['registered']
        e.height = getEnvelopeStatus['height']
        setEnvelope(e)
      })
      .catch((err) => {
        setLoadingEnvelope(false)
        setEnvelope(null)
        console.error(err)
      })
  }

  useEffect(() => {
    if (nullifier) loadEnvelope()
  }, [nullifier])

  return {
    loadingEnvelope, envelope
  }
}
