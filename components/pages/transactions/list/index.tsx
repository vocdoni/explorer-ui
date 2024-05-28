import { useTranslation } from 'next-i18next';
import { ListPage } from '@components/pages/app/page-templates/list-page';
import { DashboardTransactionsList } from './TransactionList';
import { useTransactionCount } from '@hooks/use-voconi-sdk';

export const DashboardShowTransactions = () => {
  const { t } = useTranslation();
  const { transactionCount } = useTransactionCount();
  const count = transactionCount === undefined ? '0' : transactionCount.toString();

  return (
    <DashboardTransactionsList
      transactionHeight={transactionCount}
      title={<ListPage title={t('transactions.transactions')} subtitle={t('transactions.count') + ': ' + count} />}
    ></DashboardTransactionsList>
  );
};
