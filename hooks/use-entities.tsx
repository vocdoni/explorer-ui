import { usePool } from '@vocdoni/react-hooks'
import { useEffect, useMemo, useState } from 'react'
import { useAlertMessage } from './message-alert'
import i18n from '../i18n'
import { fetchMethod } from '@lib/api'

export interface useEntityCountProps {}

/** Get entity count */
export const useEntityCount = ({}: useEntityCountProps) => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()

  const [entitiesCount, setEntitiesCount] = useState(0)

  const getEntitiesCountReq = () => {
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
  }

  useEffect(() => getEntitiesCountReq(), [])

  return {
    entitiesCount,
  }
}
