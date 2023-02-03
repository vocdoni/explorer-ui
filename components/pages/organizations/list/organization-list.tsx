import React, { ReactNode, useEffect, useState } from 'react'

import { EntitiesFilter, IFilterEntity } from '../components/entities-filter'
import { DashboardEntityListItem } from './entity-list-item'
import { InlineTitleChildrenContainer } from '@components/pages/app/page-templates/list-page'
import { FilteredPaginatedList, useFilteredPaginatedList } from '@components/pages/app/page-templates/list-page-filtered'
import { ORG_LIST_SIZE, useOrganizationList } from '@hooks/use-voconi-sdk'

interface IDashboardProcessListProps {
  loading?: boolean
  totalCount?: number
  title: ReactNode
}

export const DashboardEntityList = ({
  totalCount,
  title,
}: IDashboardProcessListProps) => {
  // Render item on the list from it summary
  const renderOrganizationCard = (identity: string) => {
    return (
      <div key={identity}>
        <DashboardOrganizationListItem entityId={identity} />
      </div>
    )
  }
  const [filter, setFilter] = useState<IFilterOrganization>({})
  const [dataPagination, setDataPagination] = useState(0)

  const {
    currentPage,
    methods: { enableFilter, setCurrentPage },
  } = useFilteredPaginatedList<IFilterOrganization>({
    pageSize: ORG_LIST_SIZE,
    filter,
    setFilter,
    setDataPagination,
    lastElement: totalCount + 1
  })

  const {loading, data, } = useOrganizationList({page: currentPage})
  const organizations = data.organizations

  return (
    <>
      <InlineTitleChildrenContainer title={title}>
        <OrganizationFilter
          onEnableFilter={enableFilter}
        ></OrganizationFilter>
      </InlineTitleChildrenContainer>

      <FilteredPaginatedList
        loading={loading}
        elementsList={organizations === undefined || !organizations.length ? [] : organizations}
        totalElementsCount={
          // When using filters you don't know the total count. So it don't handle last page pagination
          Object.keys(filter).length === 0 ? totalCount : null
        }
        renderElementFunction={renderOrganizationCard}
        pageSize={ORG_LIST_SIZE}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}
