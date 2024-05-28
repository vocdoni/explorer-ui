import React from 'react';
import { DashboardShowBlocks } from '@components/pages/blocks/list';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

const BlocksPage = () => {
  return <DashboardShowBlocks></DashboardShowBlocks>;
};

export default BlocksPage;
