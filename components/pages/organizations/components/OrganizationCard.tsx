import React from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex';
import { StatusCard } from '@components/elements/cards';
import { getOrganizationPath } from '@components/pages/app/components/get-links';
import { ReducedTextAndCopy } from '@components/blocks/copy-button';
import { BodyWrapper, CardItemSubTitle, GenericCardWrapper } from '@components/elements/card-generic';
import { OrganizationName, useOrganization } from '@vocdoni/chakra-components';
import { ensure0x } from '@vocdoni/sdk';
import { theme } from '@theme/global';
import { CustomOrganizationAvatar } from '@components/pages/organizations/components/OrganizationImages';

export const ReducedOrganizationNameWithIcon = ({ organizationId }: { organizationId: string }) => {
  const { organization } = useOrganization();

  const entityName =
    organization?.account?.name?.default && organization?.account?.name?.default.length > 0
      ? organization?.account?.name?.default
      : organizationId
      ? ensure0x(organizationId)
      : '';

  const w = '25px';
  return (
    <OrganizationNameAndLogoWrapper>
      <CustomOrganizationAvatar height={w} width={w} />
      <ReducedTextAndCopy toCopy={organizationId} text={entityName} />
    </OrganizationNameAndLogoWrapper>
  );
};

type OrganizationCardMediumProps = {
  md: number;
  organizationId: string;
};

// Wrap a entityId into a link to its entity page and an icon.
export const OrganizationCardMedium = ({ organizationId, md }: OrganizationCardMediumProps) => {
  const { i18n } = useTranslation();
  return (
    <StatusCard
      title={i18n.t('components.organization_card_medium.host_organization')}
      href={getOrganizationPath(organizationId)}
      md={md}
    >
      <FlexContainer alignItem={FlexAlignItem.Start} justify={FlexJustifyContent.Start}>
        <CenterLogo>
          <CustomOrganizationAvatar width="30px" height="30px" />
        </CenterLogo>
        <OrganizationName
          fontWeight={'bold'}
          as={'h4'}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace={'nowrap'}
          textColor={theme.textAccent1}
        />
      </FlexContainer>
    </StatusCard>
  );
};

export const OrganizationCard = ({
  organizationId,
  electionCount,
}: {
  organizationId?: string;
  electionCount?: number;
}) => {
  const { i18n } = useTranslation();
  const { organization } = useOrganization();
  const link = getOrganizationPath(organizationId);

  const id = organization?.address ?? organizationId ?? '';
  // const orgName = organization?.account?.name.default.length === 0 ? id : organization?.account?.name.default;
  const electionIndex = organization?.electionIndex ?? electionCount ?? '';

  const w = '40px';

  const Body = () => (
    <BodyWrapper>
      <OrganizationName as={'h3'} margin={'0'} wordBreak={'break-word'} />

      <OrganizationWrapper>
        <ReducedTextAndCopy
          toCopy={id}
          text={id}
          copyMessage={i18n.t('copy.hash_copied_to_the_clipboard')}
        ></ReducedTextAndCopy>
      </OrganizationWrapper>
      <CardItemSubTitle>
        <strong>{i18n.t('organizations.list.processes')}: </strong> {electionIndex}
      </CardItemSubTitle>
    </BodyWrapper>
  );

  return (
    <GenericCardWrapper left={<CustomOrganizationAvatar width={w} height={w} />} link={link}>
      <Body />
    </GenericCardWrapper>
  );
};

const OrganizationWrapper = styled.div`
  color: ${(props) => props.theme.textAccent1};
`;

const CenterLogo = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
`;

const OrganizationNameAndLogoWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  justify-content: space-between;
  align-items: center;
`;
