import { usePool } from '@vocdoni/react-hooks'
import { useCallback, useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'
import i18n from '../i18n'

export const useEntityList = ({searchTerm, from}: {searchTerm?: string, from?: number}) => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  const [entitiesList, setEntitiesList] = useState([])
  const [loadingEntitiesList, setLoadingEntitiesList] = useState(false)

  const getEntityIDs = useCallback(() => {
    setLoadingEntitiesList(true)
    poolPromise
      .then((pool) =>{
        return pool.sendRequest({
          method: 'getEntityList',
          searchTerm: searchTerm, from: from,
        })
      })
      .then((response) => {
        console.debug('DEBUG', 'getEntityList', response)
        setLoadingEntitiesList(false)
        if (!response['ok'])
          throw new Error('Error retrieving getProcessCount')
          setEntitiesList(response['entityIds'])
      })
      .catch((err) => {
        setLoadingEntitiesList(false)
        console.error(err)
        setAlertMessage(i18n.t('errors.the_list_of_entities_cannot_be_loaded'))
      })

  }, [from, poolPromise, searchTerm, setAlertMessage])

  useEffect(() => {
    getEntityIDs()
  }, [searchTerm, from, getEntityIDs])

  return {
    entitiesList,
    loadingEntitiesList
  }

}

/** Get entity count */
export const useEntityCount = () => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()

  const [entitiesCount, setEntitiesCount] = useState(0)

  const getEntitiesCountReq = useCallback(() => {
    poolPromise
      .then((pool) => {
        return pool.sendRequest({
          method: 'getEntityCount',
        })
      })
      .then((response) => {
        console.debug('DEBUG', 'getEntityCount', response)
        if (!response['ok'])
          throw new Error('Error retrieving getProcessCount')
          setEntitiesCount(response['size'])
      })
      .catch((err) => {
        console.error(err)
        setAlertMessage(i18n.t('error.could_not_fetch_entities_count'))
      })
  }, [poolPromise, setAlertMessage])
  
  useEffect(() => getEntitiesCountReq(), [getEntitiesCountReq])

  return {
    entitiesCount,
  }
}
