import { CardImageHeader } from '@components/blocks/CardImageHeader';
import { RawContentBtn } from '@components/blocks/RawContent';
import { CopyButton } from '@components/blocks/copy-button';
import { PageCard } from '@components/elements/cards';
import { Column, Grid } from '@components/elements/grid';
import { BreakWord } from '@components/elements/styled-divs';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { OrganizationElections } from '@components/pages/organizations/components/OrganizationElections';
import {
  CustomOrganizationAvatar,
  CustomOrganizationHeader,
} from '@components/pages/organizations/components/OrganizationImages';
import { colors } from '@theme/colors';
import { OrganizationDescription } from '@vocdoni/chakra-components';
import { useOrganization } from '@vocdoni/react-providers';
import { ensure0x } from '@vocdoni/sdk';
import { useTranslation } from 'next-i18next';
import { When } from 'react-if';
import styled from 'styled-components';

export const OrganizationView = ({ id }: { id: string }) => {
  const plazaUrl = `${process.env.PLAZA_URL}/organization/${ensure0x(id)}`;

  const { t } = useTranslation();
  const { organization } = useOrganization();

  const orgName = organization?.account?.name?.default || id;
  const description = organization?.account?.description?.default;

  return (
    <PageCard>
      <CardImageHeader title={orgName} logo={<CustomOrganizationAvatar />} header={<CustomOrganizationHeader />} />

      {description && (
        <Grid>
          <Column sm={12}>
            <Typography variant={TypographyVariant.Body1}>
              {t('organizations.details.organization_description')}
            </Typography>
            <OrganizationDescription />
          </Column>
        </Grid>
      )}

      <Grid>
        <Column sm={12}>
          <Typography variant={TypographyVariant.Body1}>{t('organizations.details.organization_address')} </Typography>
          <IdWrapper>
            <CopyButton toCopy={id} text={id} />
            <a href={plazaUrl} target="blank">
              ({t('organization.home.view_profile')})
            </a>
          </IdWrapper>
        </Column>
      </Grid>
      <When condition={id && organization?.electionIndex > 0}>
        <OrganizationElections organizationId={id} electionCount={organization?.electionIndex} />
      </When>
      <RawContentBtn content={organization} title={t('organization.details.organization_raw_content')} />
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
