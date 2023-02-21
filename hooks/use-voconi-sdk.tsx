import {
  ChainAPI, ElectionAPI,
  IChainGetTransactionReferenceResponse,
} from '@vocdoni/sdk'
import { useCallback, useEffect, useState } from 'react'

type PromiseReturnType<T> = T extends Promise<infer U> ? U : never;

export function useSDKFunction<T, U>(promiseFn: (string, params?: U) => Promise<T>, params?: U) {
  const [data, setData] = useState<PromiseReturnType<ReturnType<typeof promiseFn>> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    promiseFn("https://api-dev.vocdoni.net/v2" , params)
      .then(response => {
        setData(response);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [promiseFn, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch };
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

