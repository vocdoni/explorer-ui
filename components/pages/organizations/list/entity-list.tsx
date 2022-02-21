import React, { useCallback, useEffect, useState } from 'react'
import {
  SummaryProcess,
  useBlockHeight,
  useEntityProcessIdList,
  useProcesses,
} from '@vocdoni/react-hooks'

import { getVoteStatus } from '@lib/util'

import { ELECTIONS_DETAILS } from '@const/routes'
import RouterService from '@lib/router'
import { PaginatedListTemplate } from '@components/pages/app/page-templates/paginated-list-template'
import { EntitiesFilter, IFilterEntity } from '../components/entities-filter'
import { useEntityList } from '@hooks/use-entities'

interface IDashboardProcessListProps {
  loading?: boolean
  pageSize?: number
  totalCount?: number
}

/** This sets pagination next offset for process pagination */
const PAGINATION_FROM = 64

export const DashboardEntityList = ({
  pageSize = 8,
  totalCount = 0,
}: IDashboardProcessListProps) => {
  ///////////////////////////////
  // JSX
  ///////////////////////////////

  // Render item on the list from it summary
  const renderProcessItem = (identity: string) => {
    return (
      <div key={identity}>
        {' '}
        {identity}
        {/* <DashboardProcessListItem
          process={process}
          // status={processList.status}
          status={getVoteStatus(process.summary, blockHeight)}
          entityId={process?.summary?.entityId || ''}
          // accountName={account?.name}
          // entityLogo={entityMetadata?.media?.avatar}
          // link={ELECTIONS_PATH + '/#/' + process.id}
          link={electionDetailPath}
        /> */}
      </div>
    )
  }
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<IFilterEntity>({})
  const [dataPagination, setDataPagination] = useState(0)

  const { entitiesList, loadingEntitiesList } = useEntityList({
    from: dataPagination,
    searchTerm: filter?.searchTerm,
  })

  // Set loading
  useEffect(() => {
    setLoading(loadingEntitiesList)
  }, [loadingEntitiesList])

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
  } = usePaginatedList({
    filter: filter,
    setFilter: setFilter,
    dataList: entitiesList,
    dataPagination,
    setDataPagination,
  })

  return (
    <>
      <EntitiesFilter
        onEnableFilter={enableFilter}
        onDisableFilter={disableFilter}
      ></EntitiesFilter>
      <PaginatedListTemplate
        loading={loading}
        setLoading={setLoading}
        pageSize={pageSize}
        totalElementsCount={
          // todo: add pagination when searching using filters. Ex: if the
          // searchTerm result return more than 64 process, now simply doesn't load
          // next 64 batch.
          Object.keys(filter).length === 0 ? totalCount : entitiesList.length
        }
        cachedElements={cachedData}
        renderedElements={renderedData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loadMoreElements={loadMoreData}
        setRendererElements={setRenderedData}
        renderElementItem={renderProcessItem}
      />
    </>
  )
}

// todo: move this arguments to generic types
// export const usePaginatedList = ({

interface IUsePaginatedListProps<Filter, DataList> {
  filter: Filter
  setFilter: (Filter) => void
  dataList: DataList
  dataPagination: number
  setDataPagination: (number) => void
}

export function usePaginatedList <F, DataList>({
  filter,
  setFilter,
  dataList,
  dataPagination,
  setDataPagination,
}: IUsePaginatedListProps<F, DataList>) {

  const [cachedData, setCachedData] = useState<DataList[]>([])

  ///////////////////////////////
  // PAGINATOR
  ///////////////////////////////

  // Set the page at initial state
  const resetPage = useCallback(() => {
    setCurrentPage(1)
    setCachedData([])
  }, [])

  // Paginator current page
  const [currentPage, setCurrentPage] = useState(1)

  // When processIds are retrieved, update the list of already loaded process ids
  // Used for pagination, if we need to load next 64 processes
  useEffect(() => {
    // if (loading != true) setLoading(true)
    setCachedData(cachedData.concat(dataList))
  }, [dataList])

  const [renderedData, setRenderedData] = useState<DataList[]>([])

  const loadMoreData = () => {
    setDataPagination(dataPagination + PAGINATION_FROM)
  }

  ///////////////////////////////
  // Filter
  ///////////////////////////////

  const filterIsChanged = (filter, tempFilter) =>
    JSON.stringify(filter) !== JSON.stringify(tempFilter)

  const enableFilter = (tempFilter) => {
    if (filterIsChanged(filter, tempFilter)) {
      resetPage()
      setFilter(Object.assign({}, tempFilter))
    }
  }

  const disableFilter = (tempFilter, resetForm: { (): void }) => {
    resetForm()
    if (
      Object.keys(filter).length !== 0 // Check if filter is already reset
    ) {
      resetPage()
      setFilter({})
    }
  }

  return {
    cachedData,
    renderedData,
    currentPage,
    dataPagination,
    methods: {
      enableFilter,
      disableFilter,
      setRenderedData,
      setCurrentPage,
      loadMoreData,
    },
  }
}
