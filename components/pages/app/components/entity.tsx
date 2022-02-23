import Link from 'next/link'
import { ORGANIZATIONS_DETAILS, ORGANIZATIONS_PATH } from '@const/routes'
import { FALLBACK_ACCOUNT_ICON } from '@const/account'
import React, { ReactNode } from 'react'
import i18n from '@i18n'

import styled from 'styled-components'
import {
  FlexAlignItem,
  FlexContainer,
  FlexJustifyContent,
} from '@components/elements/flex'
import { ImageContainer } from '@components/elements/images'
import { Image } from '@components/elements/image'
import { StatusCard } from '@components/elements/cards'
import RouterService from '@lib/router'

function getOrganizationPath(entityId: string) {
  return RouterService.instance.get(ORGANIZATIONS_DETAILS, {
    organizationId: entityId,
  })
}

interface EntityLinkProps {
  entityId: string
  children: ReactNode
}

// Wrap a entityId into a link to its entity page
export const EntityLink = ({ entityId, children }: EntityLinkProps) => {
  return <Link href={getOrganizationPath(entityId)}>{children}</Link>
}

type EntityCardIconProps = EntityLinkProps & {
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
      <ImageContainer width="30px" height="30px">
        <Image src={icon || FALLBACK_ACCOUNT_ICON} />
      </ImageContainer>
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
  return (
    <StatusCard
      title={i18n.t('elections.host_organization')}
      href={getOrganizationPath(entityId)}
      rightText={i18n.t('elections.host_explore')}
      md={md}
    >
      <FlexContainer
        alignItem={FlexAlignItem.Start}
        justify={FlexJustifyContent.Start}
      >
        <ImageContainer width="30px" height="30px">
          <Image src={icon || FALLBACK_ACCOUNT_ICON} />
        </ImageContainer>
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
    <StatusCard
      title={'Processes:' + processCount}
      href={getOrganizationPath(entityId)}
      rightText={i18n.t('cards.organization_explore')}
    >
      <h3>{entityId}</h3>
    </StatusCard>
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
  margin: 6px;
  font-weight: bold;
  // font-size: 18px;
  color: ${(props) => props.theme.text};
`
