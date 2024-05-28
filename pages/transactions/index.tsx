import React from 'react';
import { DashboardShowTransactions } from '@components/pages/transactions/list/index';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
const TransactionsPage = () => {
  return <DashboardShowTransactions></DashboardShowTransactions>;
};

export default TransactionsPage;
