import { useCallback, useEffect, useState } from 'react';
import { usePool, useProcesses } from '@vocdoni/react-hooks';
import { useAlertMessage } from './message-alert';
import i18n from '../i18n';
import { utils } from 'ethers';
import { getProcessList } from '@lib/api';

interface IgetProcessCountProps {
  entityId?: string;
}

/**
 * Returns the number of processes registered on the Vochain.
 *
 * Use param `entityId` to specify specific entity Id to retrieve process count.
 *
 * */
export const useProcessCount = ({ entityId = '' }: IgetProcessCountProps) => {
  const { poolPromise } = usePool();
  const { setAlertMessage } = useAlertMessage();
  const [processCount, setProcessCount] = useState(0);

  const getProcessCountReq = useCallback(() => {
    poolPromise
      .then((pool) => {
        return pool.sendRequest({
          method: 'getProcessCount',
          entityId: entityId,
        });
      })
      .then((response) => {
        if (!response['ok']) throw new Error('Error retrieving getProcessCount');
        setProcessCount(response['size']);
      })
      .catch((err) => {
        console.error(err);
        setAlertMessage(i18n.t('error.could_not_fetch_processes_count'));
      });
  }, [entityId, poolPromise, setAlertMessage]);

  useEffect(() => {
    getProcessCountReq();
  }, [entityId, getProcessCountReq]);

  return {
    processCount,
  };
};

export const useProcessesFromAccount = (entityId: string) => {
  if (entityId) entityId = utils.getAddress(entityId);

  const [processIds, setProcessIds] = useState([] as string[]);
  const [loadingProcessList, setLoadingProcessList] = useState(true);
  const { setAlertMessage } = useAlertMessage();
  const { processes, error, loading: loadingProcessesDetails } = useProcesses(processIds || []);
  const { poolPromise } = usePool();

  // Loaders
  const updateProcessIds = useCallback(() => {
    if (!entityId) return;
    setLoadingProcessList(true);

    poolPromise
      .then((pool) => getProcessList(entityId, pool))
      .then((ids) => {
        setLoadingProcessList(false);
        setProcessIds(ids);
      })
      .catch((err) => {
        setLoadingProcessList(false);
        console.error(err);
        setAlertMessage(i18n.t('errors.the_list_of_votes_cannot_be_loaded'));
      });
  }, [entityId, poolPromise]);

  useEffect(() => {
    updateProcessIds();
  }, [entityId, updateProcessIds]);

  return {
    processIds,
    processes,
    loadingProcessList,
    loadingProcessesDetails,
    error,
  };
};
