import React from 'react'
import { DashboardProcessList } from './process-list'
import { useTranslation } from 'react-i18next'
import { useProcessCount } from '@hooks/use-processes'
import { ListPageTitle } from '@components/pages/app/page-templates/list-page-template'

export const DashboardShowProcesses = () => {
  const { i18n } = useTranslation()
  const { processCount } = useProcessCount({})
  const page_size = 10

  return (
    <DashboardProcessList
      totalProcessCount={processCount}
      pageSize={page_size}
      title={
        <ListPageTitle
          title={i18n.t('elections.list.elections_list_title')}
          subtitle={i18n.t('elections.list.total_n_processes', {
            processCount: processCount,
          })}
        />
      }
    />
  )
}
