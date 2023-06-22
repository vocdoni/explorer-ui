import React from 'react';

import { BadgeColumn, Grid } from '@components/elements/grid';
import { PageCard, StatusCard } from '@components/elements/cards';
import { CardImageHeader, CustomElectionHeader } from '@components/blocks/card/image-header';
import { DateDiffType, localizedDateDiff, localizedStartEndDateDiff } from '@lib/date';
import { useTranslation } from 'react-i18next';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { colors } from '@theme/colors';
import { CustomOrganizationAvatar, OrganizationCardMedium } from '@components/blocks/card/entity-card';
import { EnvelopeTypeBadge } from '../components/envelope-type-badge';
import { CensusOriginBadge } from '../components/process-censusorigin-badge';
import { ProcessModeBadge } from '../components/process-processmode-badge';
import { AnonVoteBadge, ProcessStatusBadge } from '@components/blocks/badges/process-status-badge';
import { EnvelopeExplorer } from '../components/process-envelope-explorer';
import { ResultsCard } from '../components/results-card';
import { EncryptionKeys } from '../components/process_keys';
import { CopyButton } from '@components/blocks/copy-button';
import { ElectionStatus } from '@vocdoni/sdk';
import useExtendedElection from '@hooks/use-extended-election';
import { Vochain } from '@vocdoni/proto';
import { Markdown, useOrganization } from '@vocdoni/chakra-components';
import styled from 'styled-components';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';

const ProcessesDetailPage = () => {
  const { election, electionRaw } = useExtendedElection();
  const dateDiffStr = resolveLocalizedDateDiff(election.startDate, election.endDate, election.status);
  const id = election.id;
  const organizationId = election.organizationId;

  const { i18n } = useTranslation();

  const defaultTab = election.status === ElectionStatus.ENDED || election.status === ElectionStatus.ONGOING ? 1 : 0;

  return (
    <PageCard>
      <CardImageHeader
        title={election.title.default}
        header={<CustomElectionHeader />}
        logo={<CustomOrganizationAvatar />}
        subtitle={
          <>
            <CopyButton toCopy={id} text={i18n.t('processes.details.id', { id: id })} color={colors.link} />
          </>
        }
      />

      {/* Created on and ends on */}
      <FlexRowWrapper>
        <Typography variant={TypographyVariant.H3} color={colors.blueText}>
          {i18n.t('processes.details.process_details')}
        </Typography>
        <ProcessStatusBadge status={election.status} />
      </FlexRowWrapper>
      <Typography variant={TypographyVariant.Small} color={colors.lightText}>
        {dateDiffStr}
      </Typography>
      <Typography variant={TypographyVariant.Small} color={colors.lightText}>
        <span>{i18n.t('processes.details.created_on')} </span>
        <span>{localizedDateDiff(election.startDate)}</span>
      </Typography>

      {/* Labels and badges */}
      <Grid>
        <BadgeColumn>
          <CensusOriginBadge censusOrigin={Vochain.CensusOrigin[electionRaw.census.censusOrigin]} />
          <ProcessModeBadge autostart={electionRaw.electionMode.autoStart} />
          <EnvelopeTypeBadge encryptedVotes={electionRaw.voteMode.encryptedVotes} />
          {electionRaw.voteMode.anonymous && <AnonVoteBadge />}
        </BadgeColumn>
      </Grid>

      {/* Three cards grid with various info */}
      <Grid>
        <OrganizationCardMedium md={6} organizationId={organizationId} />
        <StatusCard md={3} title={i18n.t('processes.details.vote_recount')}>
          <h2>{election.voteCount || 0}</h2>
        </StatusCard>
        <StatusCard md={3} title={i18n.t('processes.details.total_questions')}>
          <h2>{election.questions.length}</h2>
        </StatusCard>
      </Grid>

      {/* If encrypted votes show reveal keys status */}
      {electionRaw.voteMode.encryptedVotes && <EncryptionKeys electionId={id} />}

      {/* Technical details */}
      <Typography variant={TypographyVariant.H3} color={colors.blueText}>
        {i18n.t('processes.details.detailed_data')}
      </Typography>
      <Typography variant={TypographyVariant.Small} color={colors.blueText}>
        {i18n.t('processes.details.processes_additional_information')}
      </Typography>

      {/* Tabs */}
      <Tabs variant="vocdoni" defaultIndex={defaultTab}>
        <TabList>
          <Tab>{i18n.t('processes.details.show_description')}</Tab>
          <Tab>{i18n.t('processes.details.show_questions')}</Tab>
          <Tab>{i18n.t('processes.details.show_envelopes')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Markdown>{election.description.default}</Markdown>
          </TabPanel>
          <TabPanel>
            <Grid>
              <ResultsCard />
            </Grid>
          </TabPanel>
          <TabPanel>
            <EnvelopeExplorer electionId={id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageCard>
  );
};

// todo: move this somewhere
function resolveLocalizedDateDiff(initDate: Date, endDate: Date, voteStatus: ElectionStatus) {
  ElectionStatus;
  if (
    initDate &&
    (voteStatus == ElectionStatus.ONGOING || voteStatus == ElectionStatus.PAUSED || voteStatus == ElectionStatus.ENDED)
  ) {
    const now = new Date();
    if (initDate > now) {
      return localizedStartEndDateDiff(DateDiffType.Start, initDate);
    } else {
      return localizedStartEndDateDiff(DateDiffType.End, endDate);
    }
  }
}

const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default ProcessesDetailPage;
