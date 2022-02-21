import React from 'react'
import { DashboardProcessList } from './process-list'
import i18n from '@i18n'
import { useProcessCount } from '@hooks/use-processes'
import { ListPageTemplate } from '@components/pages/app/page-templates/list-page-template'

const PROCESS_PER_PAGE = 10

export const DashboardShowProcesses = ({entityId}: {entityId?: string}) => {
  const {processCount} = useProcessCount({});
 

  return (
    <ListPageTemplate
      title={i18n.t('elections_list.elections_list_title')}
      subtitle={i18n.t('elections_list.total_n_processes') + processCount}
    >
      <DashboardProcessList
        totalProcessCount={processCount}
        pageSize={PROCESS_PER_PAGE}
        entityId={entityId}
      />
    </ListPageTemplate>
  )
}
