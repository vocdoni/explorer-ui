import i18n from '@i18n'
import { BlockInfo } from '@lib/types'
import { usePool } from '@vocdoni/react-hooks'
import { useCallback, useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'

const REFRSH_TIME = 15 * 1000

export const useBlocks = ({
  refreshTime = REFRSH_TIME,
  from,
  listSize,
}: {
  refreshTime?: number
  from: number
  listSize: number
}) => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  const [loading, setLoading] = useState(false)
  const [recentBlocks, setRecentBlocks] = useState<Array<BlockInfo>>([])

  const loadBlocks = () => {
    if (loading || !poolPromise) return

    setLoading(true)

    poolPromise
      .then((pool) => {
        return pool.sendRequest({
          method: 'getBlockList',
          from: from,
          listSize: listSize,
        })
      })
      .then((response) => {
        console.debug('DEBUG', 'getBlockList', response)
        setRecentBlocks(response.blockList || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      })
  }

  useEffect(() => {
    const itv = setInterval(() => loadBlocks(), refreshTime)
    loadBlocks()
    return () => clearInterval(itv)
  }, [poolPromise, refreshTime, from, listSize])

  return {
    recentBlocks,
    loading,
  }
}
