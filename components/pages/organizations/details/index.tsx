import { EntityMetadata } from 'dvote-js';
import { SummaryProcess } from '@vocdoni/react-hooks';

import { Typography, TypographyVariant } from '@components/elements/typography';
import { Grid, Column } from '@components/elements/grid';
import { PageCard } from '@components/elements/cards';
import { CardImageHeader } from '@components/blocks/card/image-header';
import { useTranslation } from 'react-i18next';
import { BreakWord } from '@components/elements/styled-divs';
import { CopyButton } from '@components/blocks/copy-button';
import { ElectionCard } from '@components/blocks/card/process-card';
import React from 'react';

interface IEntityViewProps {
  address: string;
  metadata: EntityMetadata;
  processes: SummaryProcess[];
}
export const EntityView = ({ address, metadata, processes }: IEntityViewProps) => {
  const correctedAddress = address.startsWith('0x') ? address : '0x' + address;
  const plazaUrl = `${process.env.PLAZA_URL}/entity/#/${correctedAddress}`;
  const { i18n } = useTranslation();

  return (
    <PageCard>
      <CardImageHeader
        title={metadata?.name.default}
        processImage={metadata?.media.header}
        // subtitle={entity?.name.default}
        entityImage={metadata?.media.avatar}
      />

      {metadata?.description.default && (
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.Body1}>
              {i18n.t('organizations.details.organization_description')}
            </Typography>
            <Typography variant={TypographyVariant.Small}>{metadata?.description.default}</Typography>
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
              <CopyButton toCopy={correctedAddress} text={correctedAddress} />
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
          {processes.map((election) => {
            return (
              <div key={election.id}>
                <ElectionCard
                  electionId={election.id}
                  // electionSummary={election}
                  hideEntity={true}
                />
              </div>
            );
          })}
          {processes.length <= 0 && (
            <Typography variant={TypographyVariant.Small}>
              {i18n.t('organizations.details.no_processes_yet')}{' '}
            </Typography>
          )}
        </Column>
      </Grid>
    </PageCard>
  );
};
