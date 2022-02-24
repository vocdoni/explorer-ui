import { usePool } from '@vocdoni/react-hooks'
import { GatewayPool } from 'dvote-js'
import { useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'
import { Stats, BlockInfo } from '@lib/types'
import i18n from '@i18n'

// TODO: REMOVE
const TEMP_DEFAULT_STATS: Stats = {
    "block_height": 774869,
    "block_time": [
      12000,
      12000,
      11881,
      11894,
      11895
    ],
    "block_time_stamp": 1630064649,
    "chain_id": "vocdoni-release-1.0.1",
    "entity_count": 126,
    "envelope_count": 5229,
    "genesis_time_stamp": "2021-05-12T12:38:33.672114557Z",
    "process_count": 317,
    "syncing": false,
    "transaction_count": 1242,
    "validator_count": 5
  }
  const TEMP_DEFAULT_BLOCK_INFO = {
    hash: "cc7b3b554ebb1dc73112894125d7820797412bff830e7d979be9e159f5eaeef6",
    height: 774859,
    last_block_hash: "910df480ab6a79edcdbc51ef8b32c5357f8b48669aabfbac35cec3f761561588",
    num_txs: 0,
    proposer_address: "71aa2fefa96447bc5aef9fd928f3f8ed57e695cf",
    timestamp: "2021-08-27T11:42:10.033766696Z"
  }
  

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
        // gwPool = pool
        // return gwPool.sendRequest({ method: 'getStats' } as any)
        return TEMP_DEFAULT_STATS
      })
      .then((response) => {
        // if (!response?.stats) throw new Error('Empty stats')
        // setStats(response.stats)
        setStats(TEMP_DEFAULT_STATS)
        return TEMP_DEFAULT_BLOCK_INFO
        // return gwPool.sendRequest({ method: 'getBlockList' } as any)
      })
      .then((response) => {
        // if (!response?.blockList) throw new Error('Empty block list')
        // setRecentBlocks(response.blockList || [])
        setRecentBlocks([TEMP_DEFAULT_BLOCK_INFO])
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
