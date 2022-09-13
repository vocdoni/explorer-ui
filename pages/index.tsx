import { Loader } from '@components/blocks/loader'
import {
  BannerContainer,
  HeroBanner,
} from '@components/pages/home/components/hero-banner'
import StatsPage from '@components/pages/stats'
import { useStats } from '@hooks/use-stats'
import i18n from '@i18n'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import { Else, If, Then } from 'react-if'
import FeaturedContent from './index/featured'

// MAIN COMPONENT
const IndexPage = () => {
  const strategies: ViewStrategy[] = []
  const { loading: loadingStats, stats } = useStats({})

  return (
    <If condition={stats !== undefined}>
      <Then>
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
      </Then>
      <Else>
        <Loader visible />
      </Else>
    </If>
  )
}

export default IndexPage
