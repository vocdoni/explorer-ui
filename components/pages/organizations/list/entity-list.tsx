import React, { ReactNode, useEffect, useState } from 'react'

import {
  PaginatedListTemplate,
  usePaginatedList,
} from '@components/pages/app/page-templates/paginated-list-template'
import { EntitiesFilter, IFilterEntity } from '../components/entities-filter'
import { useEntityList } from '@hooks/use-entities'
import { DashboardEntityListItem } from './entity-list-item'
import { InlineTitleChildrenContainer } from '@components/pages/app/page-templates/list-page-template'

interface IDashboardProcessListProps {
  loading?: boolean
  pageSize?: number
  totalCount?: number
  title: ReactNode
}

export const DashboardEntityList = ({
  pageSize = 8,
  totalCount,
  title,
}: IDashboardProcessListProps) => {
  // Render item on the list from it summary
  const renderProcessItem = (identity: string) => {
    return (
      <div key={identity}>
        <DashboardEntityListItem entityId={identity} />
      </div>
    )
  }
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<IFilterEntity>({})
  const [dataPagination, setDataPagination] = useState(0)

  const { entitiesList, loadingEntitiesList } = useEntityList({
    from: dataPagination,
    searchTerm: filter?.searchTerm,
    listSize: pageSize,
    reverse: true
  })

  // Set loading
  useEffect(() => {
    setLoading(loadingEntitiesList)
  }, [loadingEntitiesList])

  // View logic
  const {
    currentPage,
    methods: { enableFilter, disableFilter, setCurrentPage },
  } = usePaginatedList<IFilterEntity>({
    pageSize,
    filter,
    setFilter,
    setDataPagination,
    lastElement: totalCount + 1
  })

  return (
    <>
      <InlineTitleChildrenContainer title={title}>
        <EntitiesFilter
          onEnableFilter={enableFilter}
          onDisableFilter={disableFilter}
        ></EntitiesFilter>
      </InlineTitleChildrenContainer>

      <PaginatedListTemplate
        loading={loading}
        elementsList={!entitiesList.length ? [] : entitiesList}
        totalElementsCount={
          // When using filters you don't know the total count. So it don't handle last page pagination
          Object.keys(filter).length === 0 ? totalCount : null
        }
        renderElementFunction={renderProcessItem}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}
