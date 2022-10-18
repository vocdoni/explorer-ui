import { Loader } from '@components/blocks/loader'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import { useBlockHeight, useEntity } from '@vocdoni/react-hooks'
import { useUrlHash } from 'use-url-hash'
import { EntityView } from '@components/pages/organizations/details/index'
import { useProcessesFromAccount } from '@hooks/use-processes'
import { ensure0x } from '@vocdoni/common'


const OrganizationsDetailPage = () => {
  const strategies: ViewStrategy[] = []
  const entityId = useUrlHash().slice(1)
  
  const { metadata, loading } = useEntity(ensure0x(entityId))
  const { blockHeight } = useBlockHeight()
  const { processes, loadingProcessList, loadingProcessesDetails } =
    useProcessesFromAccount(entityId)

  const renderEntityPage = new ViewStrategy(
    () =>
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
  const renderLoadingPage = new ViewStrategy(() => true, <Loader visible />)
  strategies.push(renderLoadingPage)

  const viewContext = new ViewContext(strategies)

  return viewContext.getView()
}

export default OrganizationsDetailPage
