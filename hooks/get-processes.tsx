import { useEffect, useState } from 'react'
import { usePool, useProcesses } from '@vocdoni/react-hooks'
import {
  getEntityIdsProcessList,
  getProcessList,
} from '../lib/api'
import { useAlertMessage } from './message-alert'
import { VotingApi, EntityApi } from 'dvote-js'
import i18n from '../i18n'
import { GatewayPool } from "dvote-js"

const ENTITY_LIST_SIZE = 12

interface IGetAllProcessProps {
  from?: number
  entitySearchTerm?: string
}

export const getAllProcess = ({
  from = 0,
  entitySearchTerm = '',
}: IGetAllProcessProps) => {

  const [entityIds, setEntityIds] = useState([] as string[])
  const [processIds, setProcessIds] = useState([] as string[])
  const [loadingProcessList, setLoadingProcessList] = useState(true)
  const { setAlertMessage } = useAlertMessage()
  const {
    processes,
    error,
    loading: loadingProcessesDetails,
  } = useProcesses(processIds || [])
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
          listSize: ENTITY_LIST_SIZE,
        } as any)
      })
      .then((response) => {
        console.debug('DEBUG', 'getEntityList', response['entityIds'])
        if (!response?.ok) throw new Error('Response error ')
        setEntityIds(response['entityIds'])
        return getEntityIdsProcessList(response['entityIds'], gwPool)
      })
      .then((response) => {
        console.debug('DEBUG', 'getEntityIdsProcessList', response)
        setProcessIds(response)        
        setLoadingProcessList(false)
      })
      .catch((err) => {
        setLoadingProcessList(false)
        console.error(err)
        // setLoading(false)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      })
  }

  useEffect(() => {
    getProcessList()
  }, [from])

  // useEffect(() => {
  //   console.debug('DEBUG', 'processesGet', processes)
  // }, [processes])

  console.debug('DEBUG', 'getAllProcess', from)

  return {
    entityIds,
    processIds,
    processes,
    loadingProcessList,
    loadingProcessesDetails,
    error,
  }
}
