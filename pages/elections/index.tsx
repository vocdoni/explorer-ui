import { Loader } from '@components/blocks/loader'
import ElectionDetailPage from '@components/pages/elections/details'
import { DashboardProcessList } from '@components/pages/elections/list'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import { useProcess } from '@vocdoni/react-hooks'
import { useUrlHash } from 'use-url-hash'

const ElectionsPage = () => {
  let strategies: ViewStrategy[] = [];
  const processId = useUrlHash().slice(1)

  if (processId.length !== 0) {
    // todo(ritmo): show an error page
    const { process: processInfo, error, loading } = useProcess(processId)
    const renderElectionDetailsPage = new ViewStrategy(
      () => !!processInfo && !loading,
      <ElectionDetailPage processId={processId} processInfo={processInfo} />
    )
    strategies.push(renderElectionDetailsPage)
  } 
  else {
    const renderShowElectionPage = new ViewStrategy(
      () => true,
      <DashboardProcessList></DashboardProcessList>
    )
    strategies.push(renderShowElectionPage)
  }

  
  const renderLoadingPage = new ViewStrategy(() => true, <Loader visible />)
  strategies.push(renderLoadingPage)

  const viewContext = new ViewContext(strategies)

  return viewContext.getView()
}

export default ElectionsPage
