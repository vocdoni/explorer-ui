import i18n from '@i18n'
import { ListPageTemplate } from '@components/pages/app/page-templates/list-page-template'
import { DashboardTransactionsList } from './transaction-list'
import { useTransactionCount } from '@hooks/use-transactions'


export const DashboardShowTransactions = () => {
  const { transactionCount } = useTransactionCount()
  const page_size = 10

  return (
    <ListPageTemplate
      title={i18n.t('transactions.transactions_list_title')}
      subtitle={i18n.t('transactions.total_n_transactions') + transactionCount}
    >
      <DashboardTransactionsList transactionHeight={transactionCount} pageSize={page_size}></DashboardTransactionsList>
    </ListPageTemplate>
  )
}
