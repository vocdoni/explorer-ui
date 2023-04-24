import { Loader } from '@components/blocks/loader';
import { Else, If, Then } from 'react-if';
import { useUrlHash } from 'use-url-hash';
import { TransactionDetails } from '@components/pages/transactions/details';
import { useTranslation } from 'react-i18next';
import { useTxByBlock, useTxByHash } from '@hooks/use-voconi-sdk';

const TransactionByHeightAndIndex = ({
  blockHeight,
  txIndex,
  loading: l = false,
  error = false,
}: {
  blockHeight: number;
  txIndex: number;
  loading?: boolean;
  error?: boolean;
}) => {
  const { data: tx, loading: txLoading } = useTxByBlock({ blockHeight: blockHeight, txIndex: txIndex });
  const { i18n } = useTranslation();
  const loading = l || txLoading;

  return (
    <>
      <If condition={loading || (tx === undefined && !error)}>
        <Then>
          <Loader visible />
        </Then>
      </If>
      <Else>
        <If condition={tx != null && !error}>
          <Then>
            <TransactionDetails txIndex={txIndex} blockHeight={blockHeight} transactionData={tx} />
          </Then>
          <Else>
            <h1>{i18n.t('transactions.details.transaction_not_found')}</h1>
          </Else>
        </If>
      </Else>
    </>
  );
};

const TransactionByHash = ({ txHash }: { txHash: string }) => {
  const { data: tx, loading, error } = useTxByHash({ txHash: txHash });
  return (
    <TransactionByHeightAndIndex
      blockHeight={tx?.blockHeight ?? null}
      txIndex={tx?.transactionIndex ?? null}
      loading={loading}
      error={error !== null}
    />
  );
};

const TransactionDetailPage = () => {
  const urlhash = useUrlHash().slice(1).split('/');
  const blockHeightOrTxHash: string = urlhash[0];
  const txIndex: string = urlhash[1];

  return (
    <>
      <If condition={txIndex != null}>
        <Then>
          <TransactionByHeightAndIndex blockHeight={parseInt(blockHeightOrTxHash)} txIndex={parseInt(txIndex)} />
        </Then>
        <Else>
          <TransactionByHash txHash={blockHeightOrTxHash} />
        </Else>
      </If>
    </>
  );
};

export default TransactionDetailPage;
