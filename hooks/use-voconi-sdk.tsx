import {
  ChainAPI, ElectionAPI,
  IChainGetTransactionReferenceResponse, VoteAPI,
} from '@vocdoni/sdk'
import { useEffect, useMemo, useState } from 'react'

type PromiseReturnType<T> = T extends Promise<infer U> ? U : never;

function useSDKFunction<T, U>(promiseFn: (string, params?: U) => Promise<T>, ...args: any[]) {
  const [data, setData] = useState<PromiseReturnType<ReturnType<typeof promiseFn>> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // Use useMemo to memoize the arguments and recompute only when they change
  const memoizedArgs = useMemo(() => args, args);

  useEffect(() => {
    setLoading(true);
    promiseFn("https://api-dev.vocdoni.net/v2" , ...args)
      .then(response => {
        setData(response);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [promiseFn, memoizedArgs]);

  return { data, error, loading };
}

interface ITxByHash {
  txHash: string
}

export const useTxByHash = ({ txHash } : { txHash: string} ) =>
  useSDKFunction(ChainAPI.txInfo, txHash);

export const useOrganizationList = ({ page } : { page: number } ) =>
  useSDKFunction(ChainAPI.organizationList, page);

export const useOrganizationCount = () =>
  useSDKFunction(ChainAPI.organizationCount);

export const useValidators = () =>
  useSDKFunction(ChainAPI.validatorsList)

export const useVoteInfo = ({ voteId } : { voteId: string}) =>
  useSDKFunction(VoteAPI.info, voteId);

export const useElectionVotesList = ({ electionId, page } : { electionId: string, page?: number}) =>
  useSDKFunction(ElectionAPI.votesList, electionId, page);

export const useElectionVotesCount = ({ electionId } : { electionId: string }) =>
  useSDKFunction(ElectionAPI.votesCount, electionId);
