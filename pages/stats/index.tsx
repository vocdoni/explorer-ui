import StatsPage from '@components/pages/stats'
import { Loader } from '@components/blocks/loader'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import { useStats } from '@hooks/use-stats'
import { useBlocks } from '@hooks/use-blocks'

const StatsPageIndex = () => {
  const strategies: ViewStrategy[] = []

  const { loading: loadingStats, stats } = useStats({})
  const { loading: loadingBlocks, recentBlocks } = useBlocks({from: 1, listSize: 4})

  // todo(ritmo): implement error page
  const renderStatsPage = new ViewStrategy(
    () => stats !== undefined || !loadingStats && !loadingBlocks,
    (
      <>
        <StatsPage stats={stats} recentBlocks={recentBlocks} />
      </>
    )
  )
  strategies.push(renderStatsPage)
  const renderLoadingPage = new ViewStrategy(() => true, <Loader visible />)
  strategies.push(renderLoadingPage)

  const viewContext = new ViewContext(strategies)

  return viewContext.getView()}

export default StatsPageIndex
