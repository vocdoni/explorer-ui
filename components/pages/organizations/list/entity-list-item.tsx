import { PageCard, StatusCard } from '@components/elements/cards'
import { EntityCardCount } from '@components/pages/app/components/entity'
import { useProcessCount } from '@hooks/use-processes'
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

  return (
    <EntityCardCount processCount={processCount} entityId={entityId}></EntityCardCount>
  )
}

const VoteItemWrapper = styled.div`
  margin-bottom: 10px;
`
