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
  const [recentBlocks, setRecentBlocks] = useState<Array<BlockInfo>>([])
  const [stats, setStats] = useState<Stats>()

  const loadStats = () => {
    if (loading || !poolPromise) return

    setLoading(true)

    let gwPool: GatewayPool

    poolPromise
      .then((pool) => {
        gwPool = pool
        return gwPool.sendRequest({ method: 'getStats' } as any)
      })
      .then((response) => {
        if (!response?.stats) throw new Error('Empty stats')
        setStats(response.stats)
        return gwPool.sendRequest({ method: 'getBlockList' } as any)
      })
      .then((response) => {
        if (!response?.blockList) throw new Error('Empty block list')
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
    const itv = setInterval(() => loadStats(), refreshTime)
    loadStats()
    return () => clearInterval(itv)
  }, [poolPromise, refreshTime])

  return {
    recentBlocks,
    stats,
    loading,
  }
}
