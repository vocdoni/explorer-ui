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
  pageSize = 10,
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

  ///////////////////////////////
  // todo: move
  ///////////////////////////////

  const skeletonItems = 3

  // PAGINATOR
  ///////////////////////////////

  // Paginator current page
  const [currentPage, setCurrentPage] = useState(1)

  const getFirstPageIndex = (page) => page * pageSize

  // When current page changed get next blocks
  useEffect(() => {
    setDataPagination(getFirstPageIndex(currentPage-1))
  }, [currentPage])

  // FILTER
  ///////////////////////////////

  // Return true if two JSON.stringify objects are equal
  const compareJSONObjects = (obj1, obj2) =>
    JSON.stringify(obj1) === JSON.stringify(obj2)

  // Set the page at initial state
  const resetPage = useCallback(() => {
    setCurrentPage(1)
    setDataPagination(0)
  }, [])

  const enableFilter = (tempFilter) => {
    if (!compareJSONObjects(filter, tempFilter)) {
      resetPage()
      setFilter({ ...tempFilter })
    }
  }

  const disableFilter = (tempFilter, resetForm: { (): void }) => {
    resetForm()
    if (
      Object.keys(filter).length !== 0 // Check if filter is already reset
    ) {
      resetPage()
      setFilter({} as IFilterProcesses)
    }
  }

  return (
    <>
      <ProcessFilter
        onEnableFilter={enableFilter}
        onDisableFilter={disableFilter}
      ></ProcessFilter>
      <Grid>
        {loading ? (
          renderSkeleton(skeletonItems)
        ) : processes != null && processes.length && processIds.length ? (
          <>
            <Column md={8} sm={12}>
              <Paginator
                totalCount={
                  // todo: add pagination when searching using filters. Ex: if the
                  // searchTerm result return more than 64 process, now simply doesn't load
                  // next 64 batch.
                  Object.keys(filter).length === 0
                    ? totalProcessCount
                    : processIds.length
                }
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                // beforePaginateCb={_beforePaginateCb}
                disableGoLastBtn
              ></Paginator>
            </Column>
            <Column md={8} sm={12}>
              {processes.map(renderProcessItem)}
            </Column>
          </>
        ) : (
          <h1>{i18n.t('elections.no_elections_found')}</h1>
        )}
      </Grid>
    </>
  )
}
