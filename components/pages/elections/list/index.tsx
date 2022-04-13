import React from 'react'
import { DashboardProcessList } from './process-list'
import i18n from '@i18n'
import { useProcessCount } from '@hooks/use-processes'
import { ListPageTemplate } from '@components/pages/app/page-templates/list-page-template'


export const DashboardShowProcesses = ( ) => {
  const {processCount} = useProcessCount({});
  const page_size = 10

  return (
    <ListPageTemplate
      title={i18n.t('elections_list.elections_list_title')}
      subtitle={i18n.t('elections_list.total_n_processes') + processCount}
    >
      <DashboardProcessList
        totalProcessCount={processCount}
        pageSize={page_size}
      />
    </ListPageTemplate>
  )
}
