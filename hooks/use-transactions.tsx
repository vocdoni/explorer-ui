import { useTranslation } from 'react-i18next';
import { fetchMethod, getTxListById } from '@lib/api';
import { TxById, TxForBlock } from '@lib/types';
import { usePool } from '@vocdoni/react-hooks';
import { Tx } from 'dvote-js';
import { useEffect, useState } from 'react';
import { useAlertMessage } from './message-alert';

/** Used to get list of transactions for specific block */
export const useTxForBlock = ({
  blockHeight,
  listSize,
  fromId,
}: {
  blockHeight: number;
  listSize?: number;
  fromId?: number;
}) => {
  const { i18n } = useTranslation();
  const { setAlertMessage } = useAlertMessage();
  const { poolPromise } = usePool();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<TxForBlock[]>([]);

  const loadTransactions = () => {
    if (loading || !poolPromise) return;

    setLoading(true);

    poolPromise
      .then((pool) => {
        //todo: this method is not exposed yet
        return fetchMethod(pool, {
          method: 'getTxListForBlock',
          params: {
            height: blockHeight,
            listSize: listSize,
            fromId: fromId,
          },
        });
      })
      .then((response) => {
        const transactions = (response.response.txList as TxForBlock[]) || null;
        setTransactions(transactions);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'));
      });
  };

  useEffect(() => {
    if (blockHeight) loadTransactions();
  }, [blockHeight, listSize, fromId]);

  return {
    transactions,
    loading,
  };
};

/** Get transaction ordered by height */
export const useTxListById = ({
  from,
  listSize,
  reverse = false, // Reverse the array to get first the last block height retrieved
}: {
  from: number;
  listSize: number;
  reverse?: boolean;
}) => {
  const { i18n } = useTranslation();
  const { setAlertMessage } = useAlertMessage();
  const { poolPromise } = usePool();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<TxById[]>();

  const loadTransactions = () => {
    if (loading || !poolPromise) return;

    setLoading(true);

    poolPromise
      .then((pool) => {
        // todo: this method is not exposed yet
        return getTxListById(from, listSize, pool);
      })
      .then((response) => {
        const txList = response
          .filter((res) => res['response']['ok'])
          .map((res) => {
            const transaction = res['response']['tx'];
            transaction['payload'] = JSON.parse(res['response']['payload']) as Tx;
            return transaction;
          });
        const transactions = (txList as TxById[]) || null;

        setTransactions(reverse ? transactions.reverse() : transactions);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setAlertMessage(i18n.t('error.could_not_fetch_the_details'));
      });
  };

  useEffect(() => {
    if (from || from === 0) loadTransactions();
  }, [from, listSize]);

  return {
    transactions,
    loading,
  };
};
