import StatsPage from '@components/pages/stats'
import { Loader } from '@components/blocks/loader'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import { useStats } from '@hooks/use-stats'
import { useBlocks } from '@hooks/use-blocks'
import { Else, If, Then } from 'react-if'
import { useTranslation } from 'react-i18next'
import { HeroBanner } from '@components/pages/home/components/hero-banner'
import styled from 'styled-components'

const StatsPageIndex = () => {
  const { loading: loadingStats, stats } = useStats({})
  const { i18n } = useTranslation()

  return (
    <If condition={loadingStats && stats === undefined}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        {stats !== undefined || !loadingStats ? (
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
          </>
        ) : (
          <h1>{i18n.t('stats.stats_not_found')}</h1>
        )}
      </Else>
    </If>
  )
}

const BannerContainer = styled.div`
  margin-top: -110px;
  padding-top: 40px;
  width: 100%;
  overflow: hidden;
  position: relative;

  @media ${({ theme }) => theme.screenMax.tablet} {
    height: auto;
  }

`

export default StatsPageIndex
