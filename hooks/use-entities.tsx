import { usePool } from '@vocdoni/react-hooks'
import { useCallback, useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'
import i18n from '../i18n'
import { fetchMethod } from '@lib/api'

/** Get entity count */
export const useEntityCount = () => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()

  const [entitiesCount, setEntitiesCount] = useState(0)

  const getEntitiesCountReq = useCallback(() => {
    poolPromise
      .then((pool) => {
        // todo(kon): this method is not exposed yet to dvotejs
        return fetchMethod(pool, {
          method: 'getEntityCount',
          params: {},
        })
      })
      .then((response) => {
        console.debug('DEBUG', 'getEntityCount', response)
        if (!response['response']['ok'])
          throw new Error('Error retrieving getProcessCount')
          setEntitiesCount(response['response']['size'])
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
