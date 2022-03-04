import { Loader } from '@components/blocks/loader'
import StatsPage from '@components/pages/stats'
import { useStats } from '@hooks/use-stats'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import FeaturedContent from './index/featured'

// MAIN COMPONENT
const IndexPage = () => {
  const strategies: ViewStrategy[] = []
  const { loading: loadingStats, stats } = useStats({})

  // todo(ritmo): implement error page
  const renderStatsPage = new ViewStrategy(
    () => stats !== undefined || !loadingStats,
    (
      <>
        <StatsPage stats={stats} />
        <FeaturedContent />
      </>
    )
  )
  strategies.push(renderStatsPage)
  const renderLoadingPage = new ViewStrategy(() => true, <Loader visible />)
  strategies.push(renderLoadingPage)

  const viewContext = new ViewContext(strategies)

  return viewContext.getView()
}

export default IndexPage
