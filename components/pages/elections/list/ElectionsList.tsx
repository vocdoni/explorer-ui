import { ReactNode, useState } from 'react';

import {
  FilteredPaginatedList,
  useFilteredSDKPaginatedList,
} from '@components/pages/app/page-templates/list-page-filtered';
import { ElectionCard } from '@components/pages/elections/components/ElectionCard';
import { useElectionList } from '@hooks/use-voconi-sdk';
import { IElectionListFilter, IElectionSummary } from '@vocdoni/sdk';
import { ProcessFilter } from '../components/ElectionFilter';

export type ElectionStatusType = IElectionListFilter['status'];

// Used to send filter to the useProcessesList hook
export interface IFilterProcesses {
  status?: ElectionStatusType;
  withResults?: boolean;
  searchTerm?: string;
  entityId?: string;
}

interface IDashboardProcessListProps {
  loading?: boolean;
  pageSize?: number;
  totalProcessCount?: number;
  title: ReactNode;
}

export const DashboardProcessList = ({ pageSize, totalProcessCount, title }: IDashboardProcessListProps) => {
  const [filter, setFilter] = useState<IFilterProcesses>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Get processes
  const { data: processes, loading } = useElectionList({
    page: currentPage - 1,
    filter: {
      electionId: filter?.searchTerm,
      status: filter?.status,
      withResults: filter?.withResults,
    },
  });

  // Render item on the list from it summary
  const renderProcessItem = (election: IElectionSummary) => {
    return (
      <div key={election.electionId}>
        <ElectionCard electionId={election.electionId} electionSummary={election} />
      </div>
    );
  };

  // View logic
  const {
    methods: { enableFilter },
  } = useFilteredSDKPaginatedList<IFilterProcesses>({
    filter: filter,
    setFilter: setFilter,
    setCurrentPage: setCurrentPage,
  });

  const isUsingFilter =
    filter?.entityId?.length > 0 || filter?.searchTerm?.length > 0 || filter?.withResults || filter?.status != null;

  return (
    <>
      <ProcessFilter onEnableFilter={enableFilter} title={title}></ProcessFilter>
      <FilteredPaginatedList
        loading={loading}
        elementsList={
          processes === undefined || !processes?.elections?.length
            ? []
            : processes.elections.sort((a, b) => {
                if (a.startDate && b.startDate) {
                  return new Date(a.startDate) > new Date(b.startDate) ? -1 : 1;
                }
                return 0;
              })
        }
        totalElementsCount={
          // When using filters you don't know the total count. So it don't handle last page pagination
          isUsingFilter ? null : totalProcessCount
        }
        renderElementFunction={renderProcessItem}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
