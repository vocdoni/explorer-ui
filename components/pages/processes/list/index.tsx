import React from 'react';
import { DashboardProcessList } from './process-list';
import { useTranslation } from 'react-i18next';
import { ListPage } from '@components/pages/app/page-templates/list-page';
import { useElectionCount } from '@hooks/use-voconi-sdk';

export const DashboardShowProcesses = () => {
  const { i18n } = useTranslation();
  const { count } = useElectionCount();
  const page_size = 10;

  return (
    <DashboardProcessList
      totalProcessCount={count}
      pageSize={page_size}
      title={
        <ListPage
          title={i18n.t('processes.list.processes')}
          subtitle={i18n.t('processes.list.count') + ': ' + count?.toString()}
        />
      }
    />
  );
};
