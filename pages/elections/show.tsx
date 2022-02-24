import { Loader } from '@components/blocks/loader'
import ElectionDetailPage from '@components/pages/elections/details'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import { useProcess } from '@vocdoni/react-hooks'
import { useUrlHash } from 'use-url-hash'

const ElectionsDetailPage = () => {
  const strategies: ViewStrategy[] = []
  const processId = useUrlHash().slice(1)
  const { process: processInfo, loading } = useProcess(processId)

  // todo(ritmo): show an error page
  const renderElectionDetailsPage = new ViewStrategy(
    () => !!processInfo && !loading,
    <ElectionDetailPage processId={processId} processInfo={processInfo} />
  )
  strategies.push(renderElectionDetailsPage)

  const renderLoadingPage = new ViewStrategy(() => true, <Loader visible />)
  strategies.push(renderLoadingPage)

  const viewContext = new ViewContext(strategies)

  return viewContext.getView()
}

export default ElectionsDetailPage
