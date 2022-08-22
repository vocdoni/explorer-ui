import { Loader } from '@components/blocks/loader'
import { useTx } from '@hooks/use-transactions'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import { TransactionDetails } from '@components/pages/transactions/details'
import { useTranslation } from 'react-i18next'

const TransactionDetailPage = () => {
  const { i18n } = useTranslation()
  const urlhash = useUrlHash().slice(1).split('/')
  const blockHeight: number = parseInt(urlhash[0])
  const txIndex: number = parseInt(urlhash[1])

  const { tx, loading } = useTx({ blockHeight: blockHeight, txIndex: txIndex })

  return (
    <>
      <If condition={loading || tx === undefined}>
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

export default TransactionDetailPage
