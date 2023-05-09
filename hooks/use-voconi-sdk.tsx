import { useCallback, useEffect, useMemo, useState } from 'react';
import { useClientContext } from '@vocdoni/react-components';
import { ExtendedSDKClient } from '@lib/client';
import { useAlertMessage } from './message-alert';
import i18n from '@i18n';

type PromiseReturnType<T> = T extends Promise<infer U> ? U : never;

interface IHookOpts {
  interval?: number;
}

function useSDKFunction<T, U>({
  promiseFn,
  args = [],
  interval,
}: {
  promiseFn: (params?: U) => Promise<T>;
  args?: any[];
} & IHookOpts) {
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

export const useTxByHash = ({ txHash, ...rest }: { txHash: string } & IHookOpts) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.txInfo, args: [txHash], ...rest });
};

// export const useOrganizationList = ({ page }: { page: number }) => useSDKFunction(ChainAPI.organizationList, page);

export const useOrganizationCount = ({ ...rest }: IHookOpts = {}) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.organizationCount, ...rest });
};

export const useValidators = ({ ...rest }: IHookOpts = {}) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.validatorsList, ...rest });
};

export const useVoteInfo = ({ voteId, ...rest }: { voteId: string } & IHookOpts) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.voteInfo, args: [voteId], ...rest });
};

export const useElectionVotesList = ({
  electionId,
  page,
  ...rest
}: { electionId: string; page?: number } & IHookOpts) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.electionVotesList, args: [electionId, page], ...rest });
};

export const useElectionVotesCount = ({ electionId, ...rest }: { electionId: string } & IHookOpts) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.electionVotesCount, args: [electionId], ...rest });
};

export const useChainInfo = ({ ...rest }: IHookOpts = {}) => {
  const { client } = useClientContext<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.chainInfo, interval: rest.interval ? rest.interval : 15 * 1000 });
};
