import i18n from '@i18n'
import { usePool } from '@vocdoni/react-hooks'
import { useCallback, useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'

interface BlockData {
  hash: string
  height: number
  last_block_hash: string
  num_txs: number
  proposer_address: string
  timestamp: string
}

export const useBlockList = ({ from }: { from?: number }) => {
  const { setAlertMessage } = useAlertMessage()
  const { poolPromise } = usePool()
  const [blockList, setEntitiesList] = useState<BlockData[]>([])
  const [loadingBlockList, setLoadingBlockList] = useState(false)

//   const getBlockList = useCallback(() => {
//     setLoadingBlockList(true)
//     poolPromise
//       .then((pool) => {
//         // todo(kon): this method is not exposed yet to dvotejs
//         return fetchMethod(pool, {
//           method: 'getEntityList',
//           params: {
//             searchTerm: searchTerm,
//             from: from,
//           },
//         })
//       })
//       .then((response) => {
//         console.debug('DEBUG', 'getEntityList', response['response'])
//         setLoadingBlockList(false)
//         if (!response['response']['ok'])
//           throw new Error('Error retrieving getProcessCount')
//         setEntitiesList(response['response']['entityIds'])
//       })
//       .catch((err) => {
//         setLoadingBlockList(false)
//         console.error(err)
//         setAlertMessage(i18n.t('errors.the_list_of_entities_cannot_be_loaded'))
//       })
//   }, [from, poolPromise, searchTerm, setAlertMessage])

  useEffect(() => {
    // getBlockList()
    console.debug("Getting block list")
  }, [from])

  return {
    blockList,
    loadingBlockList,
  }
}
