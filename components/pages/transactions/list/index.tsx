import { useTranslation } from 'react-i18next';
import { ListPage } from '@components/pages/app/page-templates/list-page';
import { DashboardTransactionsList } from './transaction-list';
import { useTransactionCount } from '@hooks/use-voconi-sdk';

export const DashboardShowTransactions = () => {
  const { i18n } = useTranslation();
  const { transactionCount } = useTransactionCount();
  const count = transactionCount === undefined ? '0' : transactionCount.toString();
  const page_size = 10;

  return (
    <DashboardTransactionsList
      transactionHeight={transactionCount}
      pageSize={page_size}
      title={
        <ListPage title={i18n.t('transactions.transactions')} subtitle={i18n.t('transactions.count') + ': ' + count} />
      }
    ></DashboardTransactionsList>
  );
};
