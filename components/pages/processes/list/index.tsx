import React from 'react'
import { DashboardProcessList } from './process-list'
import { useTranslation } from 'react-i18next'
import { useProcessCount } from '@hooks/use-processes'
import { ListPage } from '@components/pages/app/page-templates/list-page'

export const DashboardShowProcesses = () => {
  const { i18n } = useTranslation()
  const { processCount } = useProcessCount({})
  const page_size = 10

  return (
    <DashboardProcessList
      totalProcessCount={processCount}
      pageSize={page_size}
      title={
        <ListPage
          title={i18n.t('processes.list.processes_list_title')}
          subtitle={i18n.t('processes.list.total_n_processes', {
            processCount: processCount,
          })}
        />
      }
    />
  )
}
