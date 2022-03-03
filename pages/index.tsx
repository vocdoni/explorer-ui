import { Loader } from '@components/blocks/loader'
import StatsPage from '@components/pages/stats'
import { useBlocks, useStats } from '@hooks/use-stats'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import FeaturedContent from './index/featured'

// MAIN COMPONENT
const IndexPage = () => {
  const strategies: ViewStrategy[] = []
  const { loading: loadingStats, stats } = useStats({})
  const { loading: loadingBlocks, recentBlocks } = useBlocks({from: 1, listSize: 4})

  // todo(ritmo): implement error page
  const renderStatsPage = new ViewStrategy(
    () => !loadingStats && !loadingBlocks,
    (
      <>
        <StatsPage stats={stats} recentBlocks={recentBlocks} />
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
