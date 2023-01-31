import { Loader } from '@components/blocks/loader'
import { useTx } from '@hooks/use-transactions'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import { TransactionDetails } from '@components/pages/transactions/details'
import { useTranslation } from 'react-i18next'
import { useTxByHash } from '@hooks/use-voconi-sdk'

const TransactionByHeightAndIndex = ({blockHeight, txIndex, loading = false} : {
  blockHeight: number
  txIndex: number
  loading?: boolean
}) => {
  const { tx, loading: txLoading } = useTx({ blockHeight: blockHeight, txIndex: txIndex })
  const { i18n } = useTranslation()

  return (
    <>
      <If condition={(loading || txLoading) || tx === undefined}>
        <Then>
          <Loader visible />
        </Then>
      </If>
      <Else>
        <If condition={tx != null}>
          <Then>
            <TransactionDetails
              txIndex={txIndex}
              blockHeight={blockHeight}
              transactionData={tx}
            />
          </Then>
          <Else>
            <h1>{i18n.t('transactions.details.transaction_not_found')}</h1>
          </Else>
        </If>
      </Else>
    </>
  )
}

const TransactionByHash = ({ txHash } : { txHash: string }) => {
  const { data: tx, loading } = useTxByHash({ txHash: txHash });
  return (
    <TransactionByHeightAndIndex blockHeight={tx?.blockHeight ?? null} txIndex={tx?.transactionIndex ?? null} loading={loading} />
  )
}


const TransactionDetailPage = () => {
  const urlhash = useUrlHash().slice(1).split('/')
  const blockHeightOrTxHash: string = urlhash[0]
  const txIndex: string = urlhash[1]

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
  )
}

export default TransactionDetailPage
