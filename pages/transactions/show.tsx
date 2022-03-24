import { Loader } from '@components/blocks/loader'
import { useTx } from '@hooks/use-transactions'
import { useEffect } from 'react'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import { Reader } from 'protobufjs'
import { Tx } from '@vocdoni/data-models/dist/protobuf/build/ts/vochain/vochain'
import { TransactionDetails } from '@components/pages/transactions/details'
import i18n from '@i18n'

const TransactionDetailPage = () => {
  const urlhash             = useUrlHash().slice(1).split('/')
  const blockHeight: number = parseInt(urlhash[0])
  const txIndex: number     = parseInt(urlhash[1])

  const { tx, loading } = useTx({ blockHeight: blockHeight, txIndex: txIndex })

  // useEffect(() => {
  //   if (tx) {
  //     const bytes = new Uint8Array(Buffer.from(tx.tx, 'base64'))
  //     const decodedTx = Tx.decode(Reader.create(bytes))
  //   }
  // }, [tx])

  // todo(ritmo): create an error page
  return (
    <>
      <If condition={loading}>
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
            <h1>{i18n.t('transactions.no_transaction_found')}</h1>
          </Else>
        </If>
      </Else>
    </>
  )
}

export default TransactionDetailPage
