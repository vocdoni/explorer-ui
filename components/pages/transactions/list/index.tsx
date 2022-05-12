import { useTranslation } from 'react-i18next'
import { ListPageTitle } from '@components/pages/app/page-templates/list-page-template'
import { DashboardTransactionsList } from './transaction-list'
import { useTransactionCount } from '@hooks/use-transactions'

export const DashboardShowTransactions = () => {
  const { i18n } = useTranslation()
  const { transactionCount } = useTransactionCount()
  const page_size = 10

  return (
    <DashboardTransactionsList
      transactionHeight={transactionCount}
      pageSize={page_size}
      title={
        <ListPageTitle
          title={i18n.t('transactions.transactions_list_title')}
          subtitle={i18n.t('transactions.total_n_transactions', {
            transactionCount: transactionCount,
          })}
        />
      }
    ></DashboardTransactionsList>
  )
}
