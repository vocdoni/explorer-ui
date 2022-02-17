import React, { useEffect, useMemo, useState } from 'react'
import {
  SummaryProcess,
  useBlockHeight,
  useProcesses,
} from '@vocdoni/react-hooks'
import i18n from '@i18n'

import { Column, Grid } from '@components/elements/grid'
import { getVoteStatus } from '@lib/util'
import { Skeleton } from '@components/blocks/skeleton'
import { Card } from '@components/elements/cards'

import { DashboardProcessListItem } from './process-list-item'
import { ELECTIONS_DETAILS } from '@const/routes'
import RouterService from '@lib/router'
import { Paginator } from '@components/blocks/paginator'
import { useProcessesList } from '@hooks/use-processes'
import { VochainProcessStatus } from 'dvote-js'
import { ProcessFilter } from '../components/election-filter'
import { PaginatedListTemplate } from '@components/pages/app/page-templates/paginated-list-template'

// Used to send filter to the useProcessesList hook
export interface IFilterProcesses {
  status?: VochainProcessStatus
  withResults?: boolean
  searchTerm?: string
}

interface IDashboardProcessListProps {
  loading?: boolean
  skeletonItems?: number
  pageSize?: number
  totalProcessCount?: number
}

/** This sets pagination next offset for process pagination */
const PROCESS_PAGINATION_FROM = 64

export const DashboardProcessList = ({
  skeletonItems = 3,
  pageSize = 8,
  totalProcessCount = 0,
}: IDashboardProcessListProps) => {
  const [loading, setLoading] = useState(true)
  const { blockHeight } = useBlockHeight()

  const [filter, setFilter] = useState<IFilterProcesses>({})

  const [processPagination, setProcessPagination] = useState(0)
  const { processIds, loadingProcessList } = useProcessesList({
    from: processPagination,
    searchTerm: filter?.searchTerm,
    status: filter?.status,
    withResults: filter?.withResults,
  })
  const [cachedProcessesIds, setCachedProcessesIds] = useState<string[]>([])

  ///////////////////////////////
  // PAGINATOR
  ///////////////////////////////

  // Set the page at initial state
  const resetPage = () => {
    setCurrentPage(1)
    setCachedProcessesIds([])
  }

  // Paginator current page
  const [currentPage, setCurrentPage] = useState(1)

  // When processIds are retrieved, update the list of already loaded process ids
  // Used for pagination, if we need to load next 64 processes
  useEffect(() => {
    // if (loading != true) setLoading(true)
    setCachedProcessesIds(cachedProcessesIds.concat(processIds))
  }, [processIds])


  const [renderedProcess, setRenderedProcess] = useState<string[]>([])

  // Get processes details to show on the list
  const {
    processes,
    error,
    loading: loadingProcessesDetails,
  } = useProcesses(renderedProcess || [])

  // Set loading
  useEffect(() => {
    setLoading(loadingProcessList || loadingProcessesDetails)
  }, [loadingProcessList, loadingProcessesDetails])

  const loadMoreProcesses = () => {
    setProcessPagination(processPagination + PROCESS_PAGINATION_FROM)
  }

  ///////////////////////////////
  // Filter
  ///////////////////////////////

  const filterIsChanged = (filter, tempFilter) =>
    JSON.stringify(filter) !== JSON.stringify(tempFilter)

  const enableFilter = (tempFilter: IFilterProcesses) => {
    if (filterIsChanged(filter, tempFilter)) {
      resetPage()
      setFilter(Object.assign({}, tempFilter))
    }
  }

  const disableFilter = (
    tempFilter: IFilterProcesses,
    resetForm: { (): void }
  ) => {
    resetForm()
    if (
      Object.keys(filter).length !== 0 // Check if filter is already reset
    ) {
      resetPage()
      setFilter({})
    }
  }

  ///////////////////////////////
  // JSX
  ///////////////////////////////

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

        cachedElements={cachedProcessesIds}
        renderedElements={processes}

        currentPage={currentPage}
        setCurrentPage={setCurrentPage}

        loadMoreElements={loadMoreProcesses}
        setRendererElements={setRenderedProcess}
        renderElementItem={renderProcessItem}

        

      >
        <></>
      </PaginatedListTemplate>
      {/* <Grid>
        {loading ? (
          renderSkeleton()
        ) : processes != null && processes.length && renderedProcess?.length ? (
          <>
            <Column md={8} sm={12}>
              <Paginator
                totalCount={
                  Object.keys(filter).length === 0
                    ? totalProcessCount
                    : processIds.length
                }
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
                beforePaginateCb={loadMoreProcesses}
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
      </Grid> */}
    </>
  )
}
