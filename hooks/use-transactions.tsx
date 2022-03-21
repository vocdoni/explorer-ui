import i18n from '@i18n'
import { fetchMethod, getTxByHeight } from '@lib/api'
import { TxById, TxForBlock } from '@lib/types'
import { usePool } from '@vocdoni/react-hooks'
import { useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'
import { useStats } from './use-stats'

export const useTxForBlock = ({
  blockHeight,
  listSize,
  fromId,
}: {
  blockHeight: number
  listSize?: number
  fromId?: number
}) => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState<TxForBlock[]>([])

  const loadTransactions = () => {
    if (loading || !poolPromise) return

    setLoading(true)

    poolPromise
      .then((pool) => {
        //todo: this method is not exposed yet
        return fetchMethod(pool, {
          method: 'getTxListForBlock',
          params: {
            height: blockHeight,
            listSize: listSize,
            fromId: fromId,
          },
        })
      })
      .then((response) => {
        console.debug('DEBUG', 'getBlock', response)
        const transactions = (response.response.txList as TxForBlock[]) || null
        setTransactions(transactions)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      })
  }

  useEffect(() => {
    if (blockHeight) loadTransactions()
  }, [blockHeight, listSize, fromId])

  return {
    transactions,
    loading,
  }
}

/**
 * 
 * @returns transaction count from stats
 */
export const useTransactionCount = () => {
  const [transactionCount, setTransactionCount] = useState(0)
  const {stats, loading} = useStats({})

  const getHeightFromStats = () => {
    setTransactionCount(stats.transaction_count)
  }

  useEffect(() => {
    if(!loading && stats) getHeightFromStats()
  }, [stats, loading])

  return {
    transactionCount,
    loading
  }
}

export const useTransactionById = ({from, listSize} : {from: number, listSize: number}) => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState<TxById[]>([])

  const loadTransactions = () => {
    if (loading || !poolPromise) return

    setLoading(true)

    poolPromise
      .then((pool) => {
        // todo: this method is not exposed yet
        return getTxByHeight(from, listSize, pool)
      })
      .then((response) => {
        console.debug('DEBUG', 'getTxByHeight', response)
        const txList = response.filter(
          (res) => res['response']['ok']
        ).map(
          (res) => res['response']['tx'])
        const transactions = (txList as TxById[]) || null
        setTransactions(transactions)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      })
  }

  useEffect(() => {
    if (from && from > 0) loadTransactions()
  }, [from, listSize])

  return {
    transactions, loading
  }

}