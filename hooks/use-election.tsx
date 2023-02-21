import { createContext, ReactNode, useContext } from 'react'
import { useEffect, useState } from 'react'

import { isInValidProcessId } from '@lib/util'
import { ElectionAPI, IElectionInfoResponse } from '@vocdoni/sdk'
import { useSDKFunction } from '@hooks/use-voconi-sdk'

export interface ElectionInfoContext {
  electionInfo: IElectionInfoResponse,
  error: Error,
  loading: boolean,
  electionId: string,
  methods: {
    refetch: () => void
    setElectionId: (processId: string) => void
  }
}

const UseElectionInfoContext = createContext<ElectionInfoContext>(
  { electionId: ''} as any)

export const useElectionInfo = (electionId: string) => {
  const ctx = useContext(UseElectionInfoContext)

  if (ctx === null) {
    throw new Error('useElectionInfo() can only be used on the descendants of <UseElectionInfoProvider />,')
  }

  const invalidProcessId = isInValidProcessId(electionId)

  useEffect(() => {
    if (!electionId || invalidProcessId) return
    else if (ctx.electionId == electionId) return

    ctx.methods.setElectionId(electionId)
  }, [electionId])

  return ctx
}
export const UseElectionInfoProvider = ({ children }: { children: ReactNode }) => {
  const [electionId, setElectionId] = useState("")

  const { data: electionInfo, loading, error, refetch } = useSDKFunction(ElectionAPI.info, electionId);

  // useEffect(() => {
  //   if (invalidProcessId) return
  //   refetch()
  // }, [electionId])

  const value: ElectionInfoContext = {
    electionInfo,
    error,
    loading,
    electionId,
    methods: {
      refetch,
      setElectionId
    }
  }
  return (
    <UseElectionInfoContext.Provider value={value}>
      {children}
    </UseElectionInfoContext.Provider>
  )
}
