import { Else, If, Then } from 'react-if';
import { useUrlHash } from 'use-url-hash';
import { TransactionDetails } from '@components/pages/transactions/details';
import { useTranslation } from 'react-i18next';
import { useTxByBlock, useTxByHash } from '@hooks/use-voconi-sdk';
import LoaderPage from '@components/pages/app/layout/loader-page';

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
  const {
    data: tx,
    loading: txLoading,
    loaded,
    error: errorByBlock,
  } = useTxByBlock({ blockHeight: blockHeight, txIndex: txIndex });
  const { i18n } = useTranslation();

  const loading = l || txLoading || !loaded;
  const hasError = error || !!errorByBlock;

  return (
    <>
      <LoaderPage
        loading={loading}
        error={hasError}
        hasContent={!!tx}
        errorMessage={i18n.t('transactions.details.transaction_not_found')}
      >
        <TransactionDetails txIndex={txIndex} blockHeight={blockHeight} transactionData={tx} />
      </LoaderPage>
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
