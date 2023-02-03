import { usePool } from '@vocdoni/react-hooks'
import { useCallback, useEffect, useState } from 'react'
import { useAlertMessage } from './message-alert'
import i18n from '../i18n'

// export const useEntityList = ({
//   searchTerm,
//   from,
//   listSize,
//   reverse = false
// }:{
//     searchTerm?: string,
//     from?: number,
//     listSize?: number,
//     reverse:boolean
// }) => {
//   const { setAlertMessage } = useAlertMessage()
//   const { poolPromise } = usePool()
//   const [entitiesList, setEntitiesList] = useState<string[]>()
//   const [loading, setLoading] = useState(false)
//
//   const getEntityIDs = () => {
//     const f = from < 0 ? 0 : from;
//
//     setLoading(true)
//     poolPromise
//       .then((pool) =>{
//         return pool.sendRequest({
//           method: 'getEntityList',
//           searchTerm: searchTerm, from: f, listSize: listSize
//         })
//       })
//       .then((response) => {
//         if (!response['ok'] || response['entityIds'] === undefined ) {
//           setEntitiesList([] as string[])
//         } else {
//           const ids = response['entityIds'] as string[]
//           setEntitiesList(reverse ? ids.reverse() : ids)
//         }
//       })
//       .catch((err) => {
//         console.error(err)
//         setAlertMessage(i18n.t('errors.the_list_of_organizations_cannot_be_loaded'))
//       }).finally(() => setLoading(false))
//
//   }
//
//   useEffect(() => {
//     if (from || from === 0) getEntityIDs()
//   }, [searchTerm, from])
//
//   return {
//     entitiesList,
//     loading
//   }
//
// }
