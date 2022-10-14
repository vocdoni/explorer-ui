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
import { EntityLink, getOrganizationPath } from './get-links'
import { CopyButton } from '@components/blocks/copy-button'

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
}: {
  entityName: string
  entityId: string
  icon: string
}) => {
  const entityTxt = entityName.length < 15
    ? entityName
    : entityName.substring(0, 5) +
      '...' +
      entityName.substring(entityName.length - 4, entityName.length)
  return (
    <EntityNameAndLogoWrapper>
      <ImageContainer width="20px" height="20px">
        <Image src={icon || FALLBACK_ACCOUNT_ICON} />
      </ImageContainer>
      <CopyButton toCopy={entityId} text={entityTxt} />
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

export const EntityCardCount = ({
  entityId,
  processCount,
}: {
  entityId: string
  processCount: number
}) => {
  return (
    <GenericListItemWithBadge
      title={entityId}
      link={getOrganizationPath(entityId)}
      badge={<NProcessesBadge processes={processCount}></NProcessesBadge>}
      topLeft={''}
    ></GenericListItemWithBadge>
  )
}

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
