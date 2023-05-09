import { useCallback, useEffect, useMemo, useState } from 'react';
import { useClientContext } from '@vocdoni/react-components';
import { ExtendedSDKClient } from '@lib/client';
import { useAlertMessage } from './message-alert';
import i18n from '@i18n';

type PromiseReturnType<T> = T extends Promise<infer U> ? U : never;

function useSDKFunction<T, U>({
  promiseFn,
  args = [],
  interval,
}: {
  promiseFn: (params?: U) => Promise<T>;
  args?: any[];
  interval?: number;
}) {
  const [data, setData] = useState<PromiseReturnType<ReturnType<typeof promiseFn>> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const { setAlertMessage } = useAlertMessage();

  // Use useMemo to memoize the arguments and recompute only when they change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memorizedArgs = useMemo(() => args, args);

  const doCall = useCallback(() => {
    setLoading(true);
    setError(null);
    promiseFn(...memorizedArgs)
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        setError(err);
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [memorizedArgs, promiseFn]);

  useEffect(() => {
    setData(null);
    if (interval) {
      const itv = setInterval(() => doCall(), interval);
      doCall();
      return () => clearInterval(itv);
    }
    doCall();
  }, [promiseFn, memorizedArgs, doCall, interval]);

  return { data, error, loading };
}

export const useTxByHash = ({ txHash }: { txHash: string }) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.txInfo, args: [txHash] });
};

// export const useOrganizationList = ({ page }: { page: number }) => useSDKFunction(ChainAPI.organizationList, page);

export const useOrganizationCount = () => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.organizationCount });
};

export const useValidators = () => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.validatorsList });
};

export const useVoteInfo = ({ voteId }: { voteId: string }) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.voteInfo, args: [voteId] });
};

export const useElectionVotesList = ({ electionId, page }: { electionId: string; page?: number }) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.electionVotesList, args: [electionId, page] });
};

export const useElectionVotesCount = ({ electionId }: { electionId: string }) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.electionVotesCount, args: [electionId] });
};

export const useChainInfo = () => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.chainInfo, interval: 15 * 1000 });
};
