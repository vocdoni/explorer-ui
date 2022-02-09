import { useEffect, useState } from 'react'
import { usePool, useProcesses } from '@vocdoni/react-hooks'
// import { useWallet } from './use-wallet'
import { useAlertMessage } from './message-alert'
import i18n from '../i18n'
import { utils } from 'ethers'
import { Random, VochainProcessStatus, VotingApi } from 'dvote-js'

export interface useProcessListProps {
  entityId?: string
  namespace?: number
  status?: VochainProcessStatus
  withResults?: boolean
  from?: number
}

export const useProcessesList = (
  { entityId, namespace, status, withResults, from }: useProcessListProps
) => {
  if (entityId) entityId = utils.getAddress(entityId)

  const [processIds, setProcessIds] = useState([] as string[])
  const [loadingProcessList, setLoadingProcessList] = useState(true)
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()

  useEffect(() => {
    updateProcessIds()
  }, [entityId, namespace, status, withResults, from])

  // Loaders
  const updateProcessIds = () => {
    setLoadingProcessList(true)
    poolPromise
      .then((pool) =>
        // getProcessList(pool, { entityId, namespace, status, withResults, from })
        VotingApi.getProcessList(
          { entityId, namespace, status, withResults, from },
          pool
        )
      )
      .then((ids) => {
        setLoadingProcessList(false)
        setProcessIds(ids)
      })
      .catch((err) => {
        setLoadingProcessList(false)
        console.error(err)
        setAlertMessage(i18n.t('errors.the_list_of_votes_cannot_be_loaded'))
      })
  }

  return {
    processIds,
    loadingProcessList,
  }
}

interface IgetProcessCountProps {
  entityId?: string
}

/**
 * Returns the number of processes registered on the Vochain.
 *
 * Use param `entityId` to specify specific entity Id to retrieve process count.
 *
 * */
export const useProcessCount = ({ entityId = '' }: IgetProcessCountProps) => {
  const { poolPromise } = usePool()
  const { setAlertMessage } = useAlertMessage()
  const [processCount, setProcessCount] = useState(0)

  const getProcessCountReq = () => {
    poolPromise
      .then((pool) => {
        let url = pool.activeGateway.dvoteUri
        // todo(kon): this is a bypass because `getProcessCount` method is not exposed. Expose it on VotingAPI
        return fetch(url, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: Random.getHex().substr(2, 10),
            request: {
              method: 'getProcessCount',
              timestamp: Math.floor(Date.now() / 1000),
              entityId: entityId,
            },
          }),
        } as any)
      })
      .then((response) => response.json())
      .then((response) => {
        console.debug('DEBUG', 'getProcessCount', response['response'])
        if (!response['response']['ok'])
          throw new Error('Error retrieving getProcessCount')
        setProcessCount(response['response']['size'])
      })
      .catch((err) => {
        console.error(err)
        setAlertMessage(i18n.t('error.could_not_fetch_elections_count'))
      })
  }

  useEffect(() => {
    getProcessCountReq()
  }, [entityId])

  return {
    processCount,
  }
}
