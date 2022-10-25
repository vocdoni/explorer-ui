import { usePool } from "@vocdoni/react-hooks"
import { ProcessKeys, VotingApi } from "dvote-js"
import { useEffect, useState } from "react"


export const useProcessKeys = ({
    processId,
  }: {
    processId: string
  }) => {
    const [processKeys, setProcessKeys] = useState<ProcessKeys>()
    const { poolPromise } = usePool()
    const [loadingProcessKeys, setloadingProcessKeys] = useState(false)


    const loadprocessKeys = () => {
      setloadingProcessKeys(true)
      poolPromise
        .then((pool) =>
            VotingApi.getProcessKeys(processId, pool)
        )
        .then((pk) => {
          setloadingProcessKeys(false)
          setProcessKeys(pk)
        })
        .catch((err) => {
          setloadingProcessKeys(false)
          console.error(err)
        })
    }

    useEffect(() => {
      if (processId) loadprocessKeys()
    }, [processId])

    return {
      loadingProcessKeys, processKeys
    }
  }


