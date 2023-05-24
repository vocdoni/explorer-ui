import { EntityMetadata } from 'dvote-js';
import { SummaryProcess } from '@vocdoni/react-hooks';

import { Typography, TypographyVariant } from '@components/elements/typography';
import { Grid, Column } from '@components/elements/grid';
import { PageCard } from '@components/elements/cards';
import { CardImageHeader } from '@components/blocks/card/image-header';
import { useTranslation } from 'react-i18next';
import { ElectionCard } from '@components/blocks/card/process-card';
import { BreakWord } from '@components/elements/styled-divs';
import { CopyButton } from '@components/blocks/copy-button';
import { ElectionCard } from '@components/blocks/card/process-card';
import React from 'react';
import { useOrganization } from '@vocdoni/chakra-components';
import { useOrganizationElectionsList } from '@hooks/use-voconi-sdk';

export const OrganizationView = ({ id }: { id: string }) => {
  const plazaUrl = `${process.env.PLAZA_URL}/entity/#/${id}`;
  const { data: electionsList } = useOrganizationElectionsList({ organizationId: id, page: 0 });

  const { i18n } = useTranslation();
  const { organization } = useOrganization();

  const orgName = organization?.account?.name.default.length === 0 ? id : organization?.account?.name.default;
  const avatar = organization?.account?.avatar;
  const header = organization?.account?.header;
  const description = organization?.account?.description.default;
  const elections = electionsList?.elections ?? [];

  return (
    <PageCard>
      <CardImageHeader title={orgName} processImage={header} entityImage={avatar} />

      {description && (
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.Body1}>
              {i18n.t('organizations.details.organization_description')}
            </Typography>
            <Typography variant={TypographyVariant.Small}>{description}</Typography>
          </Column>
        </Grid>
      )}

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>
            {i18n.t('organizations.details.organization_address')}{' '}
          </Typography>
          <Typography variant={TypographyVariant.Small}>
            <BreakWord>
              <CopyButton toCopy={id} text={id} />
              <a href={plazaUrl} target="blank">
                ({i18n.t('organization.home.view_profile')})
              </a>
            </BreakWord>
          </Typography>
        </Column>
      </Grid>

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
    </PageCard>
  );
};
