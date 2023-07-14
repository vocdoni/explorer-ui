import React, { ReactNode, useState } from 'react';

import { IFilterEntity, OrganizationsFilter } from '../components/OrganizationsFilter';
import { InlineTitleChildrenContainer } from '@components/pages/app/page-templates/list-page';
import {
  FilteredPaginatedList,
  useFilteredSDKPaginatedList,
} from '@components/pages/app/page-templates/list-page-filtered';
import { useOrganizationList } from '@hooks/use-voconi-sdk';
import { IChainOrganizationResponse } from '@vocdoni/sdk';
import { OrganizationProvider } from '@vocdoni/chakra-components';
import { OrganizationCard } from '@components/pages/organizations/components/OrganizationCard';

interface IDashboardProcessListProps {
  loading?: boolean;
  pageSize?: number;
  totalCount?: number;
  title: ReactNode;
}

export const DashboardEntityList = ({ pageSize = 8, totalCount, title }: IDashboardProcessListProps) => {
  // Render item on the list from it summary
  const renderProcessItem = (identity: IChainOrganizationResponse, i: number) => {
    return (
      <div key={i}>
        <OrganizationProvider id={identity.organizationID}>
          <OrganizationCard electionCount={identity.electionCount} organizationId={identity.organizationID} />
        </OrganizationProvider>
      </div>
    );
  };
  const [filter, setFilter] = useState<IFilterEntity>({});
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading } = useOrganizationList({
    page: currentPage - 1,
    organizationId: filter?.searchTerm,
  });

  const entitiesList = data?.organizations ?? [];

  // View logic
  const {
    methods: { enableFilter },
  } = useFilteredSDKPaginatedList<IFilterEntity>({
    filter,
    setFilter,
    setCurrentPage,
  });

  return (
    <>
      <InlineTitleChildrenContainer title={title}>
        <OrganizationsFilter onEnableFilter={enableFilter}></OrganizationsFilter>
      </InlineTitleChildrenContainer>

      <FilteredPaginatedList
        loading={loading}
        elementsList={entitiesList === undefined || !entitiesList.length ? [] : entitiesList}
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
  );
};
