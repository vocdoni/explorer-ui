import { FALLBACK_ACCOUNT_ICON } from '@const/account';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex';
import { ImageContainer } from '@components/elements/images';
import { Image } from '@components/elements/image';
import { StatusCard } from '@components/elements/cards';
import { getOrganizationPath } from '@components/pages/app/components/get-links';
import { ReducedTextAndCopy } from '@components/blocks/copy-button';
import { BodyWrapper, CardItemSubTitle, CardItemTitle, GenericCardWrapper } from '@components/elements/card-generic';
import { BreakWord } from '@components/elements/styled-divs';
import { useOrganization } from '@vocdoni/chakra-components';
import { ensure0x } from '@vocdoni/common';

export const ReducedOrganizationNameWithIcon = ({ organizationId }: { organizationId: string }) => {
  const { organization } = useOrganization();

  const entityName =
    organization?.account?.name?.default && organization?.account?.name?.default.length > 0
      ? organization?.account?.name?.default
      : ensure0x(organizationId);

  const w = '25px';
  return (
    <OrganizationNameAndLogoWrapper>
      <ImageContainer width={w} height={w}>
        <Image src={organization?.account?.logo || FALLBACK_ACCOUNT_ICON} />
      </ImageContainer>
      <ReducedTextAndCopy toCopy={organizationId} text={entityName} />
    </OrganizationNameAndLogoWrapper>
  );
};

type OrganizationCardMediumProps = {
  md: number;
  entityId: string;
  children: ReactNode;
  icon: string;
};

// Wrap a entityId into a link to its entity page and an icon.
export const OrganizationCardMedium = ({ icon, entityId, md, children }: OrganizationCardMediumProps) => {
  const { i18n } = useTranslation();
  return (
    <StatusCard
      title={i18n.t('components.organization_card_medium.host_organization')}
      href={getOrganizationPath(entityId)}
      md={md}
    >
      <FlexContainer alignItem={FlexAlignItem.Start} justify={FlexJustifyContent.Start}>
        <CenterLogo>
          <ImageContainer width="30px" height="30px">
            <Image src={icon || FALLBACK_ACCOUNT_ICON} />
          </ImageContainer>
        </CenterLogo>
        <OrganizationNameBig>{children}</OrganizationNameBig>
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
  const orgName = organization?.account?.name.default.length === 0 ? id : organization?.account?.name.default;
  const organizationAvatar = organization?.account?.avatar;
  const electionIndex = organization?.electionIndex ?? electionCount ?? '';

  const w = '40px';

  const OrganizationAvatar = () => (
    <ImageContainer width={w} height={w}>
      <Image src={organizationAvatar || FALLBACK_ACCOUNT_ICON} />
    </ImageContainer>
  );

  const Body = () => (
    <BodyWrapper>
      <BreakWord>
        <CardItemTitle>{orgName}</CardItemTitle>
      </BreakWord>
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
    <GenericCardWrapper left={<OrganizationAvatar />} link={link}>
      <Body />
    </GenericCardWrapper>
  );
};

const OrganizationWrapper = styled.div`
  color: ${(props) => props.theme.textAccent1};
`;

const OrganizationNameBig = styled.h4`
  display: inline-block;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
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
