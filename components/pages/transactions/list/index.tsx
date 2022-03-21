import i18n from '@i18n'
import { ListPageTemplate } from '@components/pages/app/page-templates/list-page-template'
import { DashboardTransactionsList } from './transaction-list'
import { useTransactionCount } from '@hooks/use-transactions'

const PER_PAGE = 10

export const DashboardShowTransactions = () => {
  const { transactionCount } = useTransactionCount()

  return (
    <ListPageTemplate
      title={i18n.t('transactions.transactions_list_title')}
      subtitle={i18n.t('transactions.total_n_transactions') + transactionCount}
    >
      <DashboardTransactionsList transactionHeight={transactionCount} ></DashboardTransactionsList>
    </ListPageTemplate>
  )
}
