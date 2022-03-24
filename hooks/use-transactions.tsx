import i18n from '@i18n'
import { fetchMethod, getTxListById } from '@lib/api'
import { GetTx, TxById, TxForBlock } from '@lib/types'
import { usePool } from '@vocdoni/react-hooks'
import { Tx } from 'dvote-js'
import { useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'
import { useStats } from './use-stats'
import { Reader } from 'protobufjs'


/** Used to get list of transactions for specific block */
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

export const useTxBody = ({encodedBody} : { encodedBody: string }) => {
  const [decodedBody, setDecodedBody] = useState<Tx>()
  const processTxBody = (obj) => {
    for (const k in obj) {
      if (typeof obj[k] == 'object' && obj[k] !== null) {
        if (obj[k] instanceof Uint8Array) {
          obj[k] = "0x" + Buffer.from(obj[k]).toString("hex")
        }
        else {
          processTxBody(obj[k])
        }
      }
    }
  }

  useEffect(() => {
    if (encodedBody) {
      const bytes = new Uint8Array(Buffer.from(encodedBody, 'base64'))
      const decodedTx = Tx.decode(Reader.create(bytes))
      processTxBody(decodedTx)
      setDecodedBody(decodedTx)       
    }
  }, [encodedBody])

  return {
    decodedBody
  }
}



/** Get single transaction by blockHeight and  txIndex*/
export const useTx = ({
  blockHeight,
  txIndex,
}: {
  blockHeight: number
  txIndex: number
}) => {

  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  const [loading, setLoading] = useState(false)
  const [tx, setTx] = useState<GetTx>()

  const loadTransactions = () => {
    if (loading || !poolPromise) return

    setLoading(true)

    poolPromise
      .then((pool) => {
        //todo: this method is not exposed yet
        return fetchMethod(pool, {
          method: 'getTx',
          params: {
            height: blockHeight,
            txIndex: txIndex,
          },
        })
      })
      .then((response) => {
        console.debug('DEBUG', 'getTx', response)
        const transaction = (response.response.tx as GetTx) || null
        console.debug('DEBUG', 'getTx', response)

        setTx(transaction)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      })
  }

  useEffect(() => {
    if (blockHeight && txIndex != null && !isNaN(blockHeight) && !isNaN(txIndex) ) loadTransactions()
  }, [blockHeight, txIndex])

  return {
    tx,
    loading,
  }
}


/**
 *
 * @returns transaction count from stats
 */
export const useTransactionCount = () => {
  const [transactionCount, setTransactionCount] = useState<number>()
  const { stats, loading } = useStats({})

  const getHeightFromStats = () => {
    setTransactionCount(stats.transaction_count)
  }

  useEffect(() => {
    if (!loading && stats) getHeightFromStats()
  }, [stats, loading])

  return {
    transactionCount,
    loading,
  }
}

/** Get transaction ordered by height */
export const useTxListById = ({
  from,
  listSize,
  reverse = false, // Reverse the array to get first the last block height retrieved
}: {
  from: number
  listSize: number
  reverse?: boolean
}) => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  const [loading, setLoading] = useState(false)
  const [transactions, setTransactions] = useState<TxById[]>()

  const loadTransactions = () => {
    if (loading || !poolPromise) return

    setLoading(true)

    poolPromise
      .then((pool) => {
        // todo: this method is not exposed yet
        return getTxListById(from, listSize, pool)
      })
      .then((response) => {
        console.debug('DEBUG', 'getTxListById', response)
        const txList = response
          .filter((res) => res['response']['ok'])
          .map((res) => res['response']['tx'])
        const transactions = (txList as TxById[]) || null
        setTransactions(reverse ? transactions.reverse() : transactions)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'))
      })
  }

  useEffect(() => {
    if (from || from === 0) loadTransactions()
  }, [from, listSize])

  return {
    transactions,
    loading,
  }
}

