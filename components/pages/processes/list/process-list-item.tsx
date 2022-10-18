import React, {  } from 'react'
import styled from 'styled-components'
import { SummaryProcess, useEntity } from '@vocdoni/react-hooks'
import { EntityMetadata } from 'dvote-js'

import { ProcessListItem } from '@components/blocks/card/process-item'
import { PROCESS_DETAILS } from '@const/routes'
import { getPath } from '@components/pages/app/components/get-links'
import { ensure0x } from '@vocdoni/common'


interface IDashboardProcessListItemProps {
  process: SummaryProcess
  entityId: string
}

export const DashboardProcessListItem = ({
  process,
  entityId,
}: IDashboardProcessListItemProps) => {

  const { metadata } = useEntity(ensure0x(entityId))
  const entityMetadata = metadata as EntityMetadata
  const processDetailPath = getPath(PROCESS_DETAILS, {
    processId: process.id,
  })

  return (
    <ProcessListItem
      process={process}
      entityId={entityId}
      link={processDetailPath}
      entityMetadata={metadata}
      entityLogo={metadata?.media.header}
    ></ProcessListItem>
  )
}

const VoteItemWrapper = styled.div`
  margin-bottom: 10px;
`
