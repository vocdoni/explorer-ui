import Link from 'next/link'
import { ORGANIZATIONS_PATH } from '@const/routes'
import { FALLBACK_ACCOUNT_ICON } from '@const/account'
import React, { ReactNode } from 'react'

import styled from "styled-components"
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex'
import { ImageContainer } from '@components/elements/images'
import { Image } from '@components/elements/image'

interface EntityLinkProps {
    entityId: string,
    children: ReactNode,
}

// Wrap a entityId into a link to its entity page
export const EntityLink = ({
    entityId,
    children
}: EntityLinkProps) => {

  return (<Link href={ORGANIZATIONS_PATH + '/#/' + entityId}>{children}</Link>)
}


type EntityCardLittleProps = EntityLinkProps & {
  icon: string,
}

// Wrap a entityId into a link to its entity page and an icon.
export const EntityCardLittle = ({
  icon,
  entityId,
  children
}: EntityCardLittleProps) => {

return (
    <FlexContainer  alignItem={FlexAlignItem.Start} justify={FlexJustifyContent.Start} >
      <ImageContainer width="30px" height="30px">
            <Image src={icon || FALLBACK_ACCOUNT_ICON} />
      </ImageContainer>
      <EntityName><EntityLink entityId={entityId}>{children}</EntityLink></EntityName>
    </FlexContainer>
  )
}

const EntityName = styled.h5`
  display: inline-block;
  margin: 0 6px 0px;
  font-weight: normal;
  font-size: 100%;
  color: ${props => props.theme.text};
`
