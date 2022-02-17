import React from 'react'
import { useBlockHeight, useEntity } from '@vocdoni/react-hooks'
import { useUrlHash } from 'use-url-hash'

import { ViewContext, ViewStrategy } from '@lib/strategy'

import { useProcessesFromAccount } from '@hooks/use-processes'

import { EntityView } from '@components/pages/organizations/details/index'
import { Loader } from '@components/blocks/loader'
import { DashboardShowEntities } from '@components/pages/organizations/list'

const EntityPage = () => {
  let strategies: ViewStrategy[] = []
  const entityId = useUrlHash().slice(1)

  if (entityId.length !== 0) {
    const { metadata, loading } = useEntity(entityId)
    const { blockHeight } = useBlockHeight()
    const { processes, loadingProcessList, loadingProcessesDetails } =
      useProcessesFromAccount(entityId)

    const renderEntityPage = new ViewStrategy(
      () =>
        !!metadata &&
        !loading &&
        !loadingProcessList &&
        !loadingProcessesDetails,
      (
        <EntityView
          address={entityId}
          metadata={metadata}
          processes={processes}
          blockHeight={blockHeight}
        />
      )
    )
    strategies.push(renderEntityPage)
  } else {
    const renderShowElectionPage = new ViewStrategy(
      () => true,
      <DashboardShowEntities></DashboardShowEntities>
    )
    strategies.push(renderShowElectionPage)
  }

  const renderLoadingPage = new ViewStrategy(() => true, <Loader visible />)
  strategies.push(renderLoadingPage)

  const viewContext = new ViewContext(strategies)

  return viewContext.getView()
}

export default EntityPage
