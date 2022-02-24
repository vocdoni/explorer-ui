import React, {  } from 'react'
import styled from 'styled-components'
import { SummaryProcess, useEntity } from '@vocdoni/react-hooks'
import { EntityMetadata } from 'dvote-js'

import { ProcessListItem } from '@components/blocks/card/process-item'
import RouterService from '@lib/router'
import { ELECTIONS_DETAILS } from '@const/routes'

interface IDashboardProcessListItemProps {
  process: SummaryProcess
  entityId: string
}

export const DashboardProcessListItem = ({
  process,
  entityId,
}: IDashboardProcessListItemProps) => {

  const { metadata } = useEntity(entityId)
  const entityMetadata = metadata as EntityMetadata
  const electionDetailPath = RouterService.instance.get(ELECTIONS_DETAILS, {
    electionsId: process.id,
  })

  return (
    <ProcessListItem
      process={process}
      entityId={entityId}
      link={electionDetailPath}
      entityMetadata={metadata}
      entityLogo={metadata?.media.header}
    ></ProcessListItem>
  )
}

const VoteItemWrapper = styled.div`
  margin-bottom: 10px;
`
