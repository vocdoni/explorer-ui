import { useEffect, useMemo, useState } from 'react'
import { usePool, useProcesses } from '@vocdoni/react-hooks'
import { getEntityIdsProcessList, getProcessList } from '../lib/api'
import { useAlertMessage } from './message-alert'
import { VotingApi, EntityApi, GatewayPool, Random } from 'dvote-js'
import i18n from '../i18n'

// const ENTITY_LIST_SIZE = 12
const ENTITY_FROM_OFFSET = 64 // Size of the pagination offset retrieved when `getEntityList`

interface IGetAllProcessProps {
  from?: number
  entitySearchTerm?: string
}

/**
 * Get all process list
 *
 * Get all process id's existing on the vochain and all the entities.
 * To get all process you need to retrieve all entities and then,
 * for each, get all process.
 *
 * It return `entityIds` and `processIds`. After that you should
 * retrieve processes info using the `useProcesses` hook.
 */
export const getAllProcess = ({
  from = 0,
  entitySearchTerm = '',
}: IGetAllProcessProps) => {
  const [entityIds, setEntityIds] = useState([] as string[])
  const [processIds, setProcessIds] = useState([] as string[])
  const [loadingProcessList, setLoadingProcessList] = useState(true)
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  
  const getProcessList = () => {
    let gwPool: GatewayPool
    setLoadingProcessList(true)

    poolPromise
      .then((pool) => {
        gwPool = pool
        return pool.sendRequest({
          method: 'getEntityList',
          from: from,
          searchTerm: entitySearchTerm,
          // listSize: ENTITY_LIST_SIZE,
        } as any)
      })
      .then((response) => {
        console.debug('DEBUG', 'getEntityList', response['entityIds'])
        if (!response?.ok) throw new Error('Response error ')
        else if (response['entityIds'] === undefined) {
          return // No more process entities to load
        }
        setEntityIds(entityIds.concat(response['entityIds']))
        return getEntityIdsProcessList(response['entityIds'], gwPool)
      })
      .then((response) => {
        console.debug('DEBUG', 'getEntityIdsProcessList', response)
        setProcessIds(processIds.concat(response))
        setLoadingProcessList(false)
      })
      .catch((err) => {
        setLoadingProcessList(false)
        console.error(err)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      })
  }

  useEffect(() => {
    getProcessList()
  }, [from])

  // useEffect(() => {
  //   console.debug('DEBUG', 'processesGet', processes)
  // }, [processes])

  // console.debug('DEBUG', 'getAllProcess', from)  

  return {
    entityIds,
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
export const getProcessCount = ({ entityId = '' }: IgetProcessCountProps) => {
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
