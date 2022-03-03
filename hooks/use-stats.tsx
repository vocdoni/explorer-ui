import { usePool } from '@vocdoni/react-hooks'
import { GatewayPool } from 'dvote-js'
import { useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'
import { Stats, BlockInfo } from '@lib/types'
import i18n from '@i18n'

const REFRSH_TIME = 15 * 1000

export const useStats = ({
  refreshTime = REFRSH_TIME,
}: {
  refreshTime?: number
}) => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<Stats>()

  const loadStats = () => {
    if (loading || !poolPromise) return

    setLoading(true)

    poolPromise
      .then((pool) => {
        return pool.sendRequest({ method: 'getStats' })
      })
      .then((response) => {
        console.debug('DEBUG', 'getStats', response.stats)
        setStats(response.stats)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      })
  }

  useEffect(() => {
    const itv = setInterval(() => loadStats(), refreshTime)
    loadStats()
    return () => clearInterval(itv)
  }, [poolPromise, refreshTime])

  return {
    stats,
    loading,
  }
}

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
