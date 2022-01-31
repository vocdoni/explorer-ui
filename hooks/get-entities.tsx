import { useEffect, useMemo, useState } from 'react'
import { usePool, useProcesses } from '@vocdoni/react-hooks'
import { getEntityIdsProcessList, getProcessList } from '../lib/api'
import { useAlertMessage } from './message-alert'
import { VotingApi, EntityApi, GatewayPool, Random } from 'dvote-js'
import i18n from '../i18n'



interface IgetAllEntitiesProps {
    // Size of the pagination offset retrieved when `getEntityList`
    entityFromOffset?: number,
    searchTerm? : string,
  }
  export const getAllEntities = ({ searchTerm = '', entityFromOffset = 64 }: IgetAllEntitiesProps) => {
    const { setAlertMessage } = useAlertMessage()
    const [entitiesCount, setEntitiesCount] = useState(0)
    const [entitiesIds, setEntitiesIds] = useState<string[]>([])
    const { poolPromise } = usePool()
  
    // let responses: string[] = []
    // const getEntityList = (from: number, nextIteration:number ,totalIterations: number) => {
    //   return pool.sendRequest({
    //     method: 'getEntityList',
    //     from: from,
    //     searchTerm: '',
    //     listSize: ENTITY_LIST_SIZE,
    //   } as any)
    //   .then((response) => {
    //     if (!response?.ok) throw new Error('Response error ')
    //     responses.concat(response['entityIds'])
    //     if(nextIteration + 1 < totalIterations)
    //       return getEntityList(
    //         from + ENTITY_FROM_OFFSET,
    //         nextIteration +1,
    //         totalIterations)
    //   })
    // }
    const getEntityList = (from: number, poolGw:GatewayPool) => {
      return poolGw.sendRequest({
        method: 'getEntityList',
        from: from,
        searchTerm: searchTerm,
        // listSize: ENTITY_LIST_SIZE,
      } as any)
    }
  
    const getEntitiesCountReq = () => {
      poolPromise.then((pool) => {
        pool
          .sendRequest({
            method: 'getEntityCount',
          } as any)
          .then((response) => {
            console.debug('DEBUG', 'getEntityCount', response['size'])
            let size = response['size'] as number
            setEntitiesCount(size)
            // getEntityList(0, 0, Math.ceil(size / ENTITY_FROM_OFFSET))
            let requests = []
            for (let x = 0; x < Math.ceil(size / entityFromOffset); x++) {
              requests.push(getEntityList(x * entityFromOffset, pool))
            }
            return Promise.all(requests).then((entityProcs) => {
              // flatten the array[][] into array[]
              let res = entityProcs.reduce((prev, cur) => prev.concat(cur), [])
              console.debug('DEBUG', 'totalEntities', response)
              setEntitiesIds(res)
              return res
            })
          })
          .catch((err) => {
            console.error(err)
            setAlertMessage(i18n.t('error.could_not_fetch_entities_count'))
          })
      })
    }
  
    useEffect(() => {
      getEntitiesCountReq()
    }, [])
  
    return {
      entitiesCount,
      entitiesIds,
    }
  }