import { createContext, ReactNode, useContext } from 'react'
import { useEffect, useState } from 'react'

import { getVoteStatus, isInValidProcessId, VoteStatus } from '@lib/util'
import { ElectionAPI, IElectionInfoResponse } from '@vocdoni/sdk'
import { useSDKFunction } from '@hooks/use-voconi-sdk'

export interface ElectionInfoContext {
  electionInfo: IElectionInfoResponse,
  error: Error,
  loading: boolean,
  electionId: string,
  initDate: Date
  endDate: Date
  voteStatus: VoteStatus
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

  const initDate = new Date(electionInfo.startDate);
  const endDate = new Date(electionInfo.endDate);
  const voteStatus: VoteStatus = getVoteStatus(
    electionInfo.status,
    initDate,
    endDate
  )

  const value: ElectionInfoContext = {
    electionInfo,
    error,
    loading,
    electionId,
    initDate,
    endDate,
    voteStatus,
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
