import Link from 'next/link'
import { FALLBACK_ACCOUNT_ICON } from '@const/account'
import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import {
  FlexAlignItem,
  FlexContainer,
  FlexJustifyContent,
} from '@components/elements/flex'
import { ImageContainer } from '@components/elements/images'
import { Image } from '@components/elements/image'
import { StatusCard } from '@components/elements/cards'
import { GenericListItemWithBadge } from '@components/blocks/list-items'
import { NProcessesBadge } from '@components/pages/organizations/components/entities-n-process-badge'
import {
  EntityLink,
  getOrganizationPath,
} from '@components/pages/app/components/get-links'
import { ReducedTextAndCopy } from '@components/blocks/copy-button'
import {
  BodyWrapper,
  CardItemSubTitle,
  CardItemTitle,
  GenericCardWrapper,
} from '@components/elements/card-generic'
import { BreakWord } from '@components/elements/styled-divs'

// Wrap a entityId into a link to its entity page and an icon.
export const EntityNameWithIcon = ({
  icon,
  entityName,
  entityId,
}: {
  entityName: string
  entityId: string
  icon: string
}) => {
  return (
    <EntityNameAndLogoWrapper>
      <ImageContainer width="30px" height="30px">
        <Image src={icon || FALLBACK_ACCOUNT_ICON} />
      </ImageContainer>
      <span title={entityId}>{entityName}</span>
    </EntityNameAndLogoWrapper>
  )
}

export const ReducedEntityNameWithIcon = ({
  icon,
  entityName,
  entityId,
  iconWidth,
}: {
  entityName: string
  entityId: string
  icon: string
  iconWidth?: string
}) => {
  const w = iconWidth ?? '25px'
  return (
    <EntityNameAndLogoWrapper>
      <ImageContainer width={w} height={w}>
        <Image src={icon || FALLBACK_ACCOUNT_ICON} />
      </ImageContainer>
      <ReducedTextAndCopy toCopy={entityId} text={entityName} />
    </EntityNameAndLogoWrapper>
  )
}

type EntityCardMediumProps = {
  md: number
  entityId: string
  children: ReactNode
  icon: string
}

// Wrap a entityId into a link to its entity page and an icon.
export const EntityCardMedium = ({
  icon,
  entityId,
  md,
  children,
}: EntityCardMediumProps) => {
  const { i18n } = useTranslation()
  return (
    <StatusCard
      title={i18n.t('components.organization_card_medium.host_organization')}
      href={getOrganizationPath(entityId)}
      rightText={i18n.t('components.organization_card_medium.host_explore')}
      md={md}
    >
      <FlexContainer
        alignItem={FlexAlignItem.Start}
        justify={FlexJustifyContent.Start}
      >
        <CenterLogo>
          <ImageContainer width="30px" height="30px">
            <Image src={icon || FALLBACK_ACCOUNT_ICON} />
          </ImageContainer>
        </CenterLogo>
        <EntityNameBig>
          <EntityLink entityId={entityId}>{children}</EntityLink>
        </EntityNameBig>
      </FlexContainer>
    </StatusCard>
  )
}

export const EntityCard = ({
  entityId,
  entityLogo,
  entityName,
  processCount,
  link,
}: {
  entityId: string
  entityLogo: string
  entityName: string
  processCount: number
  link: string
}) => {
  const { i18n } = useTranslation()

  const w = '40px'

  const EntityLogo = () => (
    <ImageContainer width={w} height={w}>
      <Image src={entityLogo || FALLBACK_ACCOUNT_ICON} />
    </ImageContainer>
  )

  const Body = () => (
    <BodyWrapper>
      <BreakWord>
        <CardItemTitle>{entityName}</CardItemTitle>
      </BreakWord>
      <EntityWrapper>
        <ReducedTextAndCopy
          toCopy={entityId}
          text={entityId}
          copyMessage={i18n.t('copy.hash_copied_to_the_clipboard')}
        ></ReducedTextAndCopy>
      </EntityWrapper>
      <CardItemSubTitle>
        <strong>{i18n.t('organizations.list.processes')}: </strong> {processCount}
      </CardItemSubTitle>
    </BodyWrapper>
  )

  // const Footer = () => (
  //
  // )

  return (
    <GenericCardWrapper left={<EntityLogo />} link={link}
                        // footer={<Footer />}
    >
      <Body />
    </GenericCardWrapper>
  )
}

const EntityWrapper = styled.div`
  color: ${(props) => props.theme.textAccent1};
`

const EntityName = styled.h5`
  display: inline-block;
  margin: 0 6px 0px;
  font-weight: normal;
  font-size: 100%;
  color: ${(props) => props.theme.text};
`

const EntityNameBig = styled.h4`
  display: inline-block;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.textAccent1};
`

const CenterLogo = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
`

const EntityNameAndLogoWrapper = styled.div`
  display: flex;
  column-gap: 10px;
  justify-content: space-between;
  align-items: center;
`
