import { ExtendedSDKClient } from '@lib/client';
import { useClient } from '@vocdoni/react-providers';
import { IChainGetInfoResponse, IElectionListFilter } from '@vocdoni/sdk';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAlertMessage } from './message-alert';
import { useTranslation } from 'next-i18next';

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
  const [loaded, setLoaded] = useState(false); // True after first load attempt
  const { setAlertMessage } = useAlertMessage();
  const { t } = useTranslation();
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
        setAlertMessage(t('error.could_not_fetch_the_details'));
      })
      .finally(() => {
        setLoading(false);
        setLoaded(true);
      });
  }, [memorizedArgs, promiseFn]);

  useEffect(() => {
    setData(null);
    if (interval && interval > 0) {
      const itv = setInterval(() => doCall(), interval);
      doCall();
      return () => clearInterval(itv);
    }
    doCall();
  }, [promiseFn, memorizedArgs, doCall, interval]);

  return { data, error, loading, loaded };
}

/**
 * Generic hook to get single properties from Vochain stats by its name
 * @param property the name on the property present on `IChainGetInfoResponse`
 */
const useChainInfoProperty = <K extends keyof IChainGetInfoResponse>(property: K) => {
  // const [propertyState, setPropertyState] = useState<string | number | boolean | number[]>();
  const [propertyState, setPropertyState] = useState<IChainGetInfoResponse[K]>();
  const { data: stats, loading } = useChainInfo();

  const getPropertyFromStats = useCallback(() => {
    setPropertyState(stats[property]);
  }, [stats?.[property]]);

  useEffect(() => {
    if (!loading && stats) getPropertyFromStats();
  }, [stats, loading, getPropertyFromStats]);

  return {
    propertyState,
    loading,
  };
};

export const useTxByHash = ({ txHash, ...rest }: { txHash: string } & IHookOpts) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.txInfo, args: [txHash], ...rest });
};

export const useTxByBlock = ({ blockHeight, txIndex }: { blockHeight: number; txIndex: number }) => {
  const { client } = useClient<ExtendedSDKClient>();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return useSDKFunction({ promiseFn: client.txInfoByBlock, args: [blockHeight, txIndex] });
};

export const useOrganizationList = ({
  page,
  organizationId,
  ...rest
}: { page: number; organizationId?: string } & IHookOpts) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.organizationList, args: [page, organizationId], ...rest });
};

export const useOrganizationCount = ({ ...rest }: IHookOpts = {}) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.organizationCount, ...rest });
};

export const useElectionCount = ({ ...rest }: IHookOpts = {}) => {
  const { data, ...more } = useChainInfo({ ...rest });
  return { count: data?.electionCount, ...more };
};

export const useOrganizationElectionsList = ({
  organizationId,
  page,
  ...rest
}: { organizationId: string; page?: number } & IHookOpts) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.organizationElectionsList, args: [organizationId, page], ...rest });
};

export const useValidators = ({ ...rest }: IHookOpts = {}) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.validatorsList, ...rest });
};

export const useVoteInfo = ({ voteId, ...rest }: { voteId: string } & IHookOpts) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.voteInfo, args: [voteId], ...rest });
};

export const useElectionVotesList = ({
  electionId,
  page,
  ...rest
}: { electionId: string; page?: number } & IHookOpts) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.electionVotesList, args: [electionId, page], ...rest });
};

export const useElectionVotesCount = ({ electionId, ...rest }: { electionId: string } & IHookOpts) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.electionVotesCount, args: [electionId], ...rest });
};

export const useElectionKeys = ({ electionId }: { electionId: string }) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.electionKeys, args: [electionId] });
};

export const useChainInfo = ({ ...rest }: IHookOpts = {}) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.chainInfo, interval: rest.interval ? rest.interval : 15 * 1000 });
};

/**
 *
 * @returns transaction count from stats
 */
export const useTransactionCount = () => {
  const { propertyState: transactionCount, loading } = useChainInfoProperty('transactionCount');
  return { transactionCount, loading };
};

export const useTxList = ({ page }: { page?: number }) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.txList, args: [page] });
};

export const useElectionList = ({
  page,
  filter,
  ...rest
}: { page: number; filter: IElectionListFilter } & IHookOpts) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({
    promiseFn: client.electionList,
    args: [page, filter.electionId, filter.organizationId, filter.status, filter.withResults],
    ...rest,
  });
};

export const useBlockByHash = ({ hash, ...rest }: { hash: string } & IHookOpts) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.blockByHash, args: [hash], ...rest });
};

export const useBlockTransactions = ({ height, page, ...rest }: { height: number; page?: number } & IHookOpts) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.blockTransactions, args: [height, page], ...rest });
};

export const useBlockByHeight = ({ height }: { height: number }) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.blockByHeight, args: [height] });
};

export const useBlockList = ({ from, listSize }: { from: number; listSize?: number }) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.blockList, args: [from, listSize] });
};

/**
 *
 * @returns Vochain block height from stats
 */
export const useBlockHeight = () => {
  const { propertyState: blockHeight, loading } = useChainInfoProperty('height');
  return { blockHeight, loading };
};

export const useBlockToDate = ({ height }: { height: number }) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.blockToDate, args: [height] });
};

export const useDateToBlock = ({ date }: { date: Date }) => {
  const { client } = useClient<ExtendedSDKClient>();
  return useSDKFunction({ promiseFn: client.dateToBlock, args: [date] });
};
