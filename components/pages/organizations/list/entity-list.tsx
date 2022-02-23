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
import { PaginatedListTemplate, usePaginatedList } from '@components/pages/app/page-templates/paginated-list-template'
import { EntitiesFilter, IFilterEntity } from '../components/entities-filter'
import { useEntityList } from '@hooks/use-entities'

interface IDashboardProcessListProps {
  loading?: boolean
  pageSize?: number
  totalCount?: number
}

export const DashboardEntityList = ({
  pageSize = 8,
  totalCount = 0,
}: IDashboardProcessListProps) => {

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
    backendDataPagination: dataPagination,
    setBackendDataPagination: setDataPagination,
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

