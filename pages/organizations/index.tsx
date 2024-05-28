import React from 'react';

import { ViewContext, ViewStrategy } from '@lib/strategy';

import { Loader } from '@components/blocks/loader';
import { DashboardShowEntities } from '@components/pages/organizations/list';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
const EntityPage = () => {
  const strategies: ViewStrategy[] = [];

  const renderShowEntityPage = new ViewStrategy(() => true, <DashboardShowEntities></DashboardShowEntities>);
  strategies.push(renderShowEntityPage);

  const renderLoadingPage = new ViewStrategy(() => true, <Loader visible />);
  strategies.push(renderLoadingPage);

  const viewContext = new ViewContext(strategies);

  return viewContext.getView();
};

export default EntityPage;
