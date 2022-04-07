import React, { useCallback, useEffect, useState } from 'react'
import { SummaryProcess, useProcesses } from '@vocdoni/react-hooks'

import { useProcessesList } from '@hooks/use-processes'
import { VochainProcessStatus } from 'dvote-js'
import { ProcessFilter } from '../components/election-filter'
import {
  PaginatedListTemplate,
  renderSkeleton,
  usePaginatedList,
} from '@components/pages/app/page-templates/paginated-list-template'
import { DashboardProcessListItem } from './process-list-item'
import { Column, Grid } from '@components/elements/grid'
import i18n from '@i18n'
import { Paginator } from '@components/blocks/paginator'

// Used to send filter to the useProcessesList hook
export interface IFilterProcesses {
  status?: VochainProcessStatus
  withResults?: boolean
  searchTerm?: string
}

interface IDashboardProcessListProps {
  loading?: boolean
  pageSize?: number
  totalProcessCount?: number
}

export const DashboardProcessList = ({
  pageSize,
  totalProcessCount = 0,
}: IDashboardProcessListProps) => {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<IFilterProcesses>({})
  const [dataPagination, setDataPagination] = useState(0)

  // Get processes
  const { processIds, loadingProcessList } = useProcessesList({
    from: dataPagination,
    searchTerm: filter?.searchTerm,
    status: filter?.status,
    withResults: filter?.withResults,
    listSize: pageSize,
  })

  // Get processes details to show on the list
  const {
    processes,
    error,
    loading: loadingProcessesDetails,
  } = useProcesses(processIds || [])

  // Render item on the list from it summary
  const renderProcessItem = (process: SummaryProcess) => {
    return (
      <div key={process.id}>
        <DashboardProcessListItem
          process={process}
          entityId={process?.summary?.entityId || ''}
        />
      </div>
    )
  }

  // Set loading
  useEffect(() => {
    setLoading(loadingProcessList || loadingProcessesDetails)
  }, [loadingProcessList, loadingProcessesDetails])

  // View logic

  const {
    currentPage,
    methods: { enableFilter, disableFilter, setCurrentPage },
  } = usePaginatedList<IFilterProcesses>({pageSize, filter, setFilter, setDataPagination})

  return (
    <>
      <ProcessFilter
        onEnableFilter={enableFilter}
        onDisableFilter={disableFilter}
      ></ProcessFilter>
      <PaginatedListTemplate
        loading={loading}
        elementsList={!processIds.length ? [] : processes}
        totalElementsCount={
          // When using filters you don't know the total count. So it don't handle last page pagination
          Object.keys(filter).length === 0
            ? totalProcessCount
            : null}
        renderElementFunction={renderProcessItem}
        pageSize={pageSize} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}      />
    </>
  )
}
