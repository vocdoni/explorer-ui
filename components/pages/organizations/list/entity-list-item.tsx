import { EntityCard } from '@components/blocks/card/entity-card'
import { PageCard, StatusCard } from '@components/elements/cards'
import { getOrganizationPath } from '@components/pages/app/components/get-links'
import { PROCESS_DETAILS } from '@const/routes'
import { useProcessCount } from '@hooks/use-processes'
import { useEntity } from '@vocdoni/react-hooks'
import { EntityMetadata } from 'dvote-js'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'


interface IDashboardEntityItemProps {
  entityId: string
}

export const DashboardEntityListItem = ({
  entityId,
}: IDashboardEntityItemProps) => {
  const { processCount } = useProcessCount({ entityId })
  const { metadata } = useEntity(entityId)
  const entityMetadata = metadata as EntityMetadata
  const entityDetailLink = getOrganizationPath(entityId)


  console.debug("DEBUG entity metadata", entityMetadata)

  const entityName = entityMetadata?.name?.default
  ? entityMetadata?.name?.default
  : entityId

  return (
    <EntityCard 
      processCount={processCount} 
      entityId={entityId}
      entityLogo={metadata?.media.header}
      link={entityDetailLink}
      entityName={entityName}
    />
  )
}

const VoteItemWrapper = styled.div`
  margin-bottom: 10px;
`
