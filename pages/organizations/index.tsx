import React from 'react'
import { useBlockHeight, useEntity } from '@vocdoni/react-hooks'
import { useUrlHash } from 'use-url-hash'

import { ViewContext, ViewStrategy } from '@lib/strategy'

import { useProcessesFromAccount } from '@hooks/use-processes'

import { Loader } from '@components/blocks/loader'
import { DashboardShowEntities } from '@components/pages/organizations/list'

const EntityPage = () => {
  const strategies: ViewStrategy[] = []
  const entityId = useUrlHash().slice(1)

  const renderShowElectionPage = new ViewStrategy(
    () => true,
    <DashboardShowEntities></DashboardShowEntities>
  )
  strategies.push(renderShowElectionPage)


  const renderLoadingPage = new ViewStrategy(() => true, <Loader visible />)
  strategies.push(renderLoadingPage)

  const viewContext = new ViewContext(strategies)

  return viewContext.getView()
}

export default EntityPage
