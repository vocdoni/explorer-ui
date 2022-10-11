import React, { ReactNode, useEffect, useState } from 'react'
import { SummaryProcess, useProcesses } from '@vocdoni/react-hooks'
import { InlineTitleChildrenContainer } from '@components/pages/app/page-templates/list-page'

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


  const isUsingFilter = () => 
    filter?.entityId?.length > 0 || 
    filter?.searchTerm?.length > 0 ||
    filter?.withResults ||
    filter?.status != null
  

  return (
    <>
      <InlineTitleChildrenContainer title={title}>
        <ProcessFilter
          onEnableFilter={enableFilter}
        ></ProcessFilter>
      </InlineTitleChildrenContainer>
      <FilteredPaginatedList
        loading={loadingProcessList || loadingProcessesDetails}
        elementsList={!processIds.length ? [] : processes}
        totalElementsCount={
          // When using filters you don't know the total count. So it don't handle last page pagination
          isUsingFilter()
            ? null
            : totalProcessCount}
        renderElementFunction={renderProcessItem}
        pageSize={pageSize} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}      />
    </>
  )
}
