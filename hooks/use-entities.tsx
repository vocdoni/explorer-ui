import { usePool } from '@vocdoni/react-hooks'
import { useCallback, useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'
import i18n from '../i18n'

export const useEntityList = ({
  searchTerm, 
  from, 
  listSize, 
  reverse = false
}:{
    searchTerm?: string, 
    from?: number, 
    listSize?: number,
    reverse:boolean
}) => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  const [entitiesList, setEntitiesList] = useState([] as string[])
  const [loadingEntitiesList, setLoadingEntitiesList] = useState(false)

  const getEntityIDs = useCallback(() => {
    const f = from < 0 ? 0 : from;

    setLoadingEntitiesList(true)
    poolPromise
      .then((pool) =>{
        return pool.sendRequest({
          method: 'getEntityList',
          searchTerm: searchTerm, from: f, listSize: listSize
        })
      })
      .then((response) => {
        console.debug('DEBUG', 'getEntityList', response)
        setLoadingEntitiesList(false)
        if (!response['ok']) {
          throw new Error('Error retrieving getProcessCount')
        }
        const ids = response['entityIds'] as string[]
        setEntitiesList(reverse ? ids.reverse() : ids)
      })
      .catch((err) => {
        setLoadingEntitiesList(false)
        console.error(err)
        setAlertMessage(i18n.t('errors.the_list_of_organizations_cannot_be_loaded'))
      })

  }, [from, listSize, poolPromise, reverse, searchTerm, setAlertMessage])

  useEffect(() => {
    if (from || from === 0) getEntityIDs()
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
        setAlertMessage(i18n.t('error.could_not_fetch_organizations_count'))
      })
  }, [poolPromise, setAlertMessage])
  
  useEffect(() => getEntitiesCountReq(), [getEntitiesCountReq])

  return {
    entitiesCount,
  }
}
