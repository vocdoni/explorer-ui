import React, { useCallback, useEffect, useState } from 'react'
import {
  SummaryProcess,
  useBlockHeight,
  useProcesses,
} from '@vocdoni/react-hooks'

import { getVoteStatus } from '@lib/util'

import { DashboardProcessListItem } from './process-list-item'
import { ELECTIONS_DETAILS } from '@const/routes'
import RouterService from '@lib/router'
import { useProcessesList } from '@hooks/use-processes'
import { VochainProcessStatus } from 'dvote-js'
import { ProcessFilter } from '../components/election-filter'
import { PaginatedListTemplate, usePaginatedList } from '@components/pages/app/page-templates/paginated-list-template'

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

/** This sets pagination next offset for process pagination */
const PROCESS_PAGINATION_FROM = 64

export const DashboardProcessList = ({
  pageSize = 8,
  totalProcessCount = 0,
}: IDashboardProcessListProps) => {
  const { blockHeight } = useBlockHeight()
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<IFilterProcesses>({})
  const [dataPagination, setDataPagination] = useState(0)
  const { processIds, loadingProcessList } = useProcessesList({
    from: dataPagination,
    searchTerm: filter?.searchTerm,
    status: filter?.status,
    withResults: filter?.withResults,
  })
  // const [renderedProcess, setRenderedProcess] = useState<string[]>([])

  const {
    cachedData,
    renderedData,
    currentPage,
    methods: {
      enableFilter,
      disableFilter,
      setRenderedData,
      setCurrentPage,
      loadMoreData,
    },
  } = usePaginatedList<IFilterProcesses, string[]>({
    filter: filter,
    setFilter: setFilter,
    dataList: processIds,
    backendDataPagination: dataPagination,
    setBackendDataPagination: setDataPagination,
  })


  // Get processes details to show on the list
  const {
    processes,
    error,
    loading: loadingProcessesDetails,
  } = useProcesses(renderedData || [])

  // Set loading
  useEffect(() => {
    setLoading(loadingProcessList || loadingProcessesDetails)
  }, [loadingProcessList, loadingProcessesDetails])



  // Render item on the list from it summary
  const renderProcessItem = (process: SummaryProcess) => {

    const electionDetailPath = RouterService.instance.get(ELECTIONS_DETAILS, {
      electionsId: process.id,
    })
    return (
      <div key={process.id}>
        <DashboardProcessListItem
          process={process}
          // status={processList.status}
          status={getVoteStatus(process.summary, blockHeight)}
          entityId={process?.summary?.entityId || ''}
          // accountName={account?.name}
          // entityLogo={entityMetadata?.media?.avatar}
          // link={ELECTIONS_PATH + '/#/' + process.id}
          link={electionDetailPath}
        />
      </div>
    )
  }

  return (
    <>
      <ProcessFilter
        filter={undefined}
        onEnableFilter={enableFilter}
        onDisableFilter={disableFilter}
      ></ProcessFilter>
      <PaginatedListTemplate
        loading={loading}
        setLoading={setLoading}
        pageSize={pageSize}
        totalElementsCount={
          // todo: add pagination when searching using filters. Ex: if the
          // searchTerm result return more than 64 process, now simply doesn't load
          // next 64 batch.
          Object.keys(filter).length === 0
            ? totalProcessCount
            : processIds.length
        }
        cachedElements={cachedData}
        renderedElements={processes}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loadMoreElements={loadMoreData}
        setRendererElements={setRenderedData}
        renderElementItem={renderProcessItem}
      />
    </>
  )
}
