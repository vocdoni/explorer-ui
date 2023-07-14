import { Column, Grid } from '@components/elements/grid';
import { ElectionCard } from '@components/pages/elections/components/ElectionCard';
import React, { useState } from 'react';
import { useOrganizationElectionsList } from '@hooks/use-voconi-sdk';
import { IElectionSummary } from '@vocdoni/sdk';
import { JumpToPaginatedList } from '@components/pages/app/page-templates/list-page-jump-to';

export const OrganizationElections = ({
  organizationId,
  electionCount,
}: {
  organizationId: string;
  electionCount: number;
}) => {
  const renderElectionCard = (election: IElectionSummary, i: number) => {
    return <ElectionCard key={i} electionId={election.electionId} electionSummary={election} hideEntity={true} />;
  };

  const [paginatorPage, setPaginatorPage] = useState<number>(1);
  const dataPage = paginatorPage - 1;

  const { data: electionsList, loading } = useOrganizationElectionsList({
    organizationId: organizationId,
    page: dataPage,
  });
  const elections = electionsList?.elections ?? [];

  return (
    <Grid>
      <Column sm={12}>
        <JumpToPaginatedList
          loading={loading}
          elementsList={elections}
          totalElementsCount={electionCount}
          renderElementFunction={renderElectionCard}
          currentPage={paginatorPage}
          setCurrentPage={setPaginatorPage}
        />
      </Column>
    </Grid>
  );
};
