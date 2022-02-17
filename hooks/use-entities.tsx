import { usePool } from '@vocdoni/react-hooks'
import { useEffect, useMemo, useState } from 'react'
import { useAlertMessage } from './message-alert'
import i18n from '../i18n'

export interface useEntityCountProps {}

/** Get entity count */
export const useEntityCount = ({}: useEntityCountProps) => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()

  const [entitiesCount, setEntitiesCount] = useState(0)

  const getEntitiesCountReq = () => {
    poolPromise.then((pool) => {
      pool
        .sendRequest({
          method: 'getEntityCount',
        } as any)
        .then((response) => {
          console.debug('DEBUG', 'getEntityCount', response['size'])
          let size = response['size'] as number
          setEntitiesCount(size)
        })
        .catch((err) => {
          console.error(err)
          setAlertMessage(i18n.t('error.could_not_fetch_entities_count'))
        })
    })
  }

  useEffect(()=> getEntitiesCountReq(),[])

  return {
    entitiesCount
  }
}
