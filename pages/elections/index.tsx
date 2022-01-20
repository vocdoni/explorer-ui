import { Loader } from "@components/blocks/loader"
import ElectionDetailPage from "@components/pages/elections/details"
import { ViewContext, ViewStrategy } from '@lib/strategy'
import { useProcess } from "@vocdoni/react-hooks"
import { useUrlHash } from 'use-url-hash'



const ElectionsPage = () => {

  const processId = useUrlHash().slice(1)
  const { process: processInfo, error, loading } = useProcess(processId)

  const renderEntityPage = new ViewStrategy(
    () => !!processInfo && !loading,
    <ElectionDetailPage 
      processId={processId} 
      processInfo={processInfo} />
  )
  const renderLoadingPage = new ViewStrategy(
    () => true,
    <Loader visible />
  )

  const viewContext = new ViewContext([
    renderEntityPage,
    renderLoadingPage
  ])

  return viewContext.getView()
  // return <ElectionDetailPage></ElectionDetailPage>
}

export default ElectionsPage
