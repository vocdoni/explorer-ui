import { Loader } from '@components/blocks/loader'
import {
  BannerContainer,
  HeroBanner,
} from '@components/pages/home/components/hero-banner'
import StatsPage from '@components/pages/stats'
import { useStats } from '@hooks/use-stats'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import FeaturedContent from './index/featured'

// MAIN COMPONENT
const IndexPage = () => {
  const strategies: ViewStrategy[] = []
  const { loading: loadingStats, stats } = useStats({})

  // todo(ritmo): implement error page?
  const renderStatsPage = new ViewStrategy(
    () => stats !== undefined || !loadingStats,
    (
      <>
        <BannerContainer>
          <HeroBanner
            processes={stats?.process_count}
            organizations={stats?.entity_count}
            averageBlockTime={(stats?.block_time[0] || 0) / 1000}
            envelopes={stats?.envelope_count}
          />
        </BannerContainer>
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
