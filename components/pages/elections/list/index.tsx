import React from 'react';
import { DashboardProcessList } from './ElectionsList';
import { useTranslation } from 'next-i18next';
import { ListPage } from '@components/pages/app/page-templates/list-page';
import { useElectionCount } from '@hooks/use-voconi-sdk';

export const DashboardShowProcesses = () => {
  const { t } = useTranslation();
  const { count } = useElectionCount();
  const page_size = 10;

  return (
    <DashboardProcessList
      totalProcessCount={count}
      pageSize={page_size}
      title={
        <ListPage
          title={t('processes.list.processes')}
          subtitle={t('processes.list.count') + ': ' + count?.toString()}
        />
      }
    />
  );
};
