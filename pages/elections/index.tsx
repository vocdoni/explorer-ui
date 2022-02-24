import { DashboardShowProcesses } from '@components/pages/elections/list'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import { useUrlHash } from 'use-url-hash';

const ElectionsPage = () => {
  const strategies: ViewStrategy[] = [];
  const entityId = useUrlHash().slice(1)

  // todo(ritmo): loading/error page
  const renderShowElectionPage = new ViewStrategy(
    () => true,
    <DashboardShowProcesses entityId={entityId}></DashboardShowProcesses>
  )
  strategies.push(renderShowElectionPage)
  
  // const renderLoadingPage = new ViewStrategy(() => true, <Loader visible />)
  // strategies.push(renderLoadingPage)

  const viewContext = new ViewContext(strategies)

  return viewContext.getView()
}

export default ElectionsPage
