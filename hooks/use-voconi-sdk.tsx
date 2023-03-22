import { useEffect, useMemo, useState } from 'react';
import { useClientContext } from '@vocdoni/react-components';
import { ExtendedSDKClient } from '@lib/client';

type PromiseReturnType<T> = T extends Promise<infer U> ? U : never;

function useSDKFunction<T, U>(promiseFn: (params?: U) => Promise<T>, ...args: any[]) {
  const [data, setData] = useState<PromiseReturnType<ReturnType<typeof promiseFn>> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // Use useMemo to memoize the arguments and recompute only when they change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedArgs = useMemo(() => args, args);

  useEffect(() => {
    setLoading(true);
    promiseFn(...args)
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [promiseFn, memoizedArgs]);

  return { data, error, loading };
}

export const useTxByHash = ({ txHash }: { txHash: string }) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction(client.txInfo, txHash);
};

// export const useOrganizationList = ({ page }: { page: number }) => useSDKFunction(ChainAPI.organizationList, page);

export const useOrganizationCount = () => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction(client.organizationCount);
};

export const useValidators = () => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction(client.validatorsList);
};

export const useVoteInfo = ({ voteId }: { voteId: string }) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction(client.voteInfo, voteId);
};

export const useElectionVotesList = ({ electionId, page }: { electionId: string; page?: number }) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction(client.electionVotesList, electionId, page);
};

export const useElectionVotesCount = ({ electionId }: { electionId: string }) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction(client.electionVotesCount, electionId);
};
