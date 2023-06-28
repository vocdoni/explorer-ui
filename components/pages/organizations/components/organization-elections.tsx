import { Column, Grid } from '@components/elements/grid';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { ElectionCard } from '@components/blocks/card/process-card';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBlockList, useOrganizationElectionsList } from '@hooks/use-voconi-sdk';
import { IChainBlockInfoResponse, IElectionSummary } from '@vocdoni/sdk';
import { IFilterBlocks } from '@components/pages/blocks/components/block-filter';
import { JumpToPaginatedList, useJumpToPaginatedList } from '@components/pages/app/page-templates/list-page-jump-to';

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
        {/*<Typography variant={TypographyVariant.Body1}>*/}
        {/*  {i18n.t('organizations.details.organization_processes')}{' '}*/}
        {/*</Typography>*/}
        {/*{elections.map((election, index) => {})}*/}
        {/*{!electionsList ||*/}
        {/*  (elections.length <= 0 && (*/}
        {/*    <Typography variant={TypographyVariant.Small}>*/}
        {/*      {i18n.t('organizations.details.no_processes_yet')}{' '}*/}
        {/*    </Typography>*/}
        {/*  ))}*/}
      </Column>
    </Grid>
  );
};
