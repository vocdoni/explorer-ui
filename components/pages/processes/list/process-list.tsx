import React, { ReactNode, useEffect, useState } from 'react'
import { SummaryProcess, useProcesses } from '@vocdoni/react-hooks'

import { useProcessesList } from '@hooks/use-processes'
import { VochainProcessStatus } from 'dvote-js'
import { ProcessFilter } from '../components/process-filter'
import { DashboardProcessListItem } from './process-list-item'
import { useFilteredPaginatedList, FilteredPaginatedList } from '@components/pages/app/page-templates/list-page-filtered'

// Used to send filter to the useProcessesList hook
export interface IFilterProcesses {
  status?: VochainProcessStatus
  withResults?: boolean
  searchTerm?: string
  entityId?: string
}

interface IDashboardProcessListProps {
  loading?: boolean
  pageSize?: number
  totalProcessCount?: number
  title: ReactNode
}

export const DashboardProcessList = ({
  pageSize,
  totalProcessCount,
  title
}: IDashboardProcessListProps) => {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<IFilterProcesses>({})
  const [dataPagination, setDataPagination] = useState<number>()

  // Get processes
  const { processIds, loadingProcessList } = useProcessesList({
    from: dataPagination,
    searchTerm: filter?.searchTerm,
    status: filter?.status,
    withResults: filter?.withResults,
    listSize: pageSize,
    entityId: filter?.entityId,
    reverse: true
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
        <DashboardProcessListItem
          key={process.id}
          process={process}
          entityId={process?.summary?.entityId || ''}
        />
    )
  }

  // View logic
  const {
    currentPage,
    methods: { enableFilter, setCurrentPage },
  } = useFilteredPaginatedList<IFilterProcesses>({
      pageSize: pageSize, 
      filter: filter, 
      setFilter: setFilter, 
      setDataPagination: setDataPagination, 
      lastElement: totalProcessCount + 1
    })

  // Set loading
  useEffect(() => {
    setLoading( loadingProcessList || loadingProcessesDetails)
  }, [loadingProcessList, loadingProcessesDetails])

  return (
    <>
      {title}
      <ProcessFilter
        onEnableFilter={enableFilter}
      ></ProcessFilter>
      <FilteredPaginatedList
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
