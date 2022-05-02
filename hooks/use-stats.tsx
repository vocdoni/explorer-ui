import { usePool } from '@vocdoni/react-hooks'
import { useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'
import { Stats } from '@lib/types'
import { useTranslation } from 'react-i18next'

const REFRSH_TIME = 15 * 1000

export const useStats = ({
  refreshTime = REFRSH_TIME,
}: {
  refreshTime?: number
}) => {
  const { i18n } = useTranslation()
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
