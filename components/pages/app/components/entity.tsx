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

type EntityCardIconProps = {
  entityId: string
  children: ReactNode
  icon: string
}

// Wrap a entityId into a link to its entity page and an icon.
export const EntityCardLittle = ({
  icon,
  entityId,
  children,
}: EntityCardIconProps) => {
  return (
    <FlexContainer
      alignItem={FlexAlignItem.Start}
      justify={FlexJustifyContent.Start}
    >
      <CenterLogo>
        <ImageContainer width="30px" height="30px">
          <Image src={icon || FALLBACK_ACCOUNT_ICON} />
        </ImageContainer>
      </CenterLogo>
      <EntityName>
        <EntityLink entityId={entityId}>{children}</EntityLink>
      </EntityName>
    </FlexContainer>
  )
}

type EntityCardMediumProps = EntityCardIconProps & {
  md: number
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
      title={i18n.t('components.entity_card_medium.host_organization')}
      href={getOrganizationPath(entityId)}
      rightText={i18n.t('components.entity_card_medium.host_explore')}
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
    >
    </GenericListItemWithBadge>
  )
}

const EntityName = styled.h5`
  display: inline-block;
  margin: 0 6px 0px;
  font-weight: normal;
  font-size: 100%;
  color: ${(props) => props.theme.text};
`

const EntityNameBig = styled.h2`
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

