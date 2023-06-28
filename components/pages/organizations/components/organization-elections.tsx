import { Column, Grid } from '@components/elements/grid';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { ElectionCard } from '@components/blocks/card/process-card';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOrganizationElectionsList } from '@hooks/use-voconi-sdk';

export const OrganizationElections = ({ organizationId }: { organizationId: string }) => {
  const { i18n } = useTranslation();
  const { data: electionsList } = useOrganizationElectionsList({ organizationId: organizationId, page: 0 });
  const elections = electionsList?.elections ?? [];

  return (
    <Grid>
      <Column sm={12}>
        <Typography variant={TypographyVariant.Body1}>
          {i18n.t('organizations.details.organization_processes')}{' '}
        </Typography>
        {elections.map((election, index) => {
          return (
            <ElectionCard key={index} electionId={election.electionId} electionSummary={election} hideEntity={true} />
          );
        })}
        {!electionsList ||
          (elections.length <= 0 && (
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('organizations.details.no_processes_yet')}{' '}
            </Typography>
          ))}
      </Column>
    </Grid>
  );
};
