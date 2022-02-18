import { useCallback, useEffect, useState } from 'react'
import { usePool, useProcesses } from '@vocdoni/react-hooks'
import { useAlertMessage } from './message-alert'
import i18n from '../i18n'
import { utils } from 'ethers'
import { VochainProcessStatus, VotingApi } from 'dvote-js'
import { fetchMethod, getProcessList } from '@lib/api'

export interface useProcessListProps {
  entityId?: string // Deprecated, use search terms instead
  namespace?: number
  status?: VochainProcessStatus
  withResults?: boolean
  from?: number
  searchTerm?: string
}

export const useProcessesList = ({
  entityId,
  namespace,
  status,
  withResults,
  from,
  searchTerm,
}: useProcessListProps) => {
  // if (entityId) entityId = utils.getAddress(entityId)

  const [processIds, setProcessIds] = useState([] as string[])
  const [loadingProcessList, setLoadingProcessList] = useState(true)
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()

  // Loaders
  const updateProcessIds = useCallback(() => {
    console.debug('DEBUG', 'Updating processes list', 
      entityId, namespace, status, withResults, from, searchTerm )
    setLoadingProcessList(true)
    poolPromise
      .then((pool) =>
        VotingApi.getProcessList(
          { entityId, namespace, status, withResults, from, searchTerm } as unknown,
          pool
        )
      )
      .then((ids) => {
        console.debug('DEBUG', 'Retrieved process list', ids)

        setLoadingProcessList(false)
        setProcessIds(ids)
      })
      .catch((err) => {
        setLoadingProcessList(false)
        console.error(err)
        setAlertMessage(i18n.t('errors.the_list_of_votes_cannot_be_loaded'))
      })
  },[entityId, from, namespace, poolPromise, searchTerm, setAlertMessage, status, withResults])


  useEffect(() => {
    updateProcessIds()
  }, [entityId, namespace, status, withResults, from, searchTerm, updateProcessIds])


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

  const getProcessCountReq = useCallback (() => {
    poolPromise
      .then((pool) => {
        // todo(kon): this method is not exposed yet to dvotejs
        return fetchMethod(pool, {
          method: 'getProcessCount',
          params: { entityId: entityId },
        })
      })
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
  }, [entityId, poolPromise, setAlertMessage])

  useEffect(() => {
    getProcessCountReq()
  }, [entityId, getProcessCountReq])

  return {
    processCount,
  }
}

export const useProcessesFromAccount = (entityId: string) => {
  if (entityId) entityId = utils.getAddress(entityId)

  const [processIds, setProcessIds] = useState([] as string[])
  const [loadingProcessList, setLoadingProcessList] = useState(true)
  const { setAlertMessage } = useAlertMessage()
  const { processes, error, loading: loadingProcessesDetails } = useProcesses(
    processIds || []
  )
  const { poolPromise } = usePool()

  // Loaders
  const updateProcessIds = useCallback(() => {
    if (!entityId) return
    setLoadingProcessList(true)

    poolPromise
      .then((pool) => getProcessList(entityId, pool))
      .then((ids) => {
        setLoadingProcessList(false)
        setProcessIds(ids)
      })
      .catch((err) => {
        setLoadingProcessList(false)
        console.error(err)
        setAlertMessage(i18n.t("errors.the_list_of_votes_cannot_be_loaded"))
      })
  }, [entityId, poolPromise, setAlertMessage])


  useEffect(() => {
    updateProcessIds()
  }, [entityId, updateProcessIds])

  return {
    processIds,
    processes,
    loadingProcessList,
    loadingProcessesDetails,
    error,
  }
}
