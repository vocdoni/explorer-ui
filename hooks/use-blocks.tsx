import { useTranslation } from 'react-i18next'
import { fetchMethod } from '@lib/api'
import { BlockInfo } from '@lib/types'
import { usePool } from '@vocdoni/react-hooks'
import { VotingApi } from 'dvote-js'
import { useCallback, useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'

const REFRSH_TIME = 15 * 1000

export const useBlocks = ({
  refreshTime = REFRSH_TIME,
  from,
  listSize,
  reverse = false, // Reverse the array to get first the last block height retrieved
}: {
  refreshTime?: number
  from: number
  listSize: number
  reverse?: boolean
}) => {
  const { i18n } = useTranslation()
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
          from:     from,
          listSize: listSize,
        })
      })
      .then((response) => {
        console.debug('DEBUG', 'getBlockList', response, from)
        const blockList = response.blockList || []
        setRecentBlocks(reverse ? blockList.reverse() : blockList)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      })
  }

  useEffect(() => {
    let itv
    if (from || from === 0) {
      if (refreshTime > 0) itv = setInterval(() => loadBlocks(), refreshTime)
      loadBlocks()
    }
    return () => {
      if (refreshTime > 0 && (from || from === 0)) return clearInterval(itv)
    }
  }, [poolPromise, refreshTime, from, listSize])

  return {
    recentBlocks,
    loading,
  }
}

export const useBlock = ({ blockHeight }:{ blockHeight: number }) => {
  const { i18n } = useTranslation()
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  const [loading, setLoading] = useState(false)
  const [block, setBlock] = useState<BlockInfo>()

  const loadBlocks = () => {
    if (loading || !poolPromise) return

    setLoading(true)

    poolPromise
      .then((pool) => {
            //todo: this method is not exposed yet
        return fetchMethod(pool, {
          method: 'getBlock',
          params: {
            height: blockHeight
          }
        })
      })
      .then((response) => {
        console.debug('DEBUG', 'getBlock', response )
        if(response.response.ok){
          const block = response.response.block as BlockInfo || null 
          block.height = blockHeight
          setBlock(block)
        } else {
          setBlock(null)
        }
      })
      .catch((err) => {
        console.error(err)
        setBlock(null)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      }).finally(() => setLoading(false))
  }

  useEffect(() => {
    if(blockHeight) loadBlocks()
  }, [blockHeight])

  return {
    block, loading
  }

}
