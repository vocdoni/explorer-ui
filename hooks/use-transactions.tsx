import i18n from "@i18n"
import { fetchMethod } from "@lib/api"
import { TxForBlock } from "@lib/types"
import { usePool } from "@vocdoni/react-hooks"
import { useEffect, useState } from "react"
import { useAlertMessage } from "./message-alert"


export const useTxForBlock = ({ blockHeight, listSize, fromId  }:{ blockHeight: number, listSize?: number, fromId?: number}) => {
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
              fromId: fromId
            }
          })
        })
        .then((response) => {
          console.debug('DEBUG', 'getBlock', response )
          const transactions = response.response.txList as TxForBlock[] || null 
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
      if(blockHeight) loadTransactions()
    }, [blockHeight, listSize, fromId])
  
    return {
      transactions, loading
    }
  }
  