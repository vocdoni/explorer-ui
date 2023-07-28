import { Typography, TypographyVariant } from '@components/elements/typography';
import { Column, Grid } from '@components/elements/grid';
import { PageCard } from '@components/elements/cards';
import { CardImageHeader } from '@components/blocks/CardImageHeader';
import { useTranslation } from 'react-i18next';
import { BreakWord } from '@components/elements/styled-divs';
import { CopyButton } from '@components/blocks/copy-button';
import React from 'react';
import { OrganizationDescription, useOrganization } from '@vocdoni/chakra-components';
import styled from 'styled-components';
import { colors } from '@theme/colors';
import { When } from 'react-if';
import { OrganizationElections } from '@components/pages/organizations/components/OrganizationElections';
import {
  CustomOrganizationAvatar,
  CustomOrganizationHeader,
} from '@components/pages/organizations/components/OrganizationImages';
import { RawContentBtn } from '@components/blocks/RawContent';

export const OrganizationView = ({ id }: { id: string }) => {
  const plazaUrl = `${process.env.PLAZA_URL}/entity/#/${id}`;

  const { i18n } = useTranslation();
  const { organization } = useOrganization();

  const orgName = organization?.account?.name.default.length === 0 ? id : organization?.account?.name.default;
  const description = organization?.account?.description.default;

  return (
    <PageCard>
      <CardImageHeader title={orgName} logo={<CustomOrganizationAvatar />} header={<CustomOrganizationHeader />} />

      {description && (
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.Body1}>
              {i18n.t('organizations.details.organization_description')}
            </Typography>
            <OrganizationDescription />
          </Column>
        </Grid>
      )}

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>
            {i18n.t('organizations.details.organization_address')}{' '}
          </Typography>
          <IdWrapper>
            <CopyButton toCopy={id} text={id} />
            <a href={plazaUrl} target="blank">
              ({i18n.t('organization.home.view_profile')})
            </a>
          </IdWrapper>
        </Column>
      </Grid>
      <When condition={id && organization?.electionIndex > 0}>
        <OrganizationElections organizationId={id} electionCount={organization?.electionIndex} />
      </When>
      <RawContentBtn content={organization} title={i18n.t('organization.details.organization_raw_content')} />
    </PageCard>
  );
};

const IdWrapper = styled(BreakWord)`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2em;
  text-align: left;
  color: ${({ color, theme }) => (colors[color] ? colors[color] : color ? color : theme.blueText)};
`;
