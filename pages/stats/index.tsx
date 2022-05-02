import StatsPage from '@components/pages/stats'
import { Loader } from '@components/blocks/loader'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import { useStats } from '@hooks/use-stats'
import { useBlocks } from '@hooks/use-blocks'
import { Else, If, Then } from 'react-if'
import { useTranslation } from 'react-i18next'

const StatsPageIndex = () => {
  const { loading: loadingStats, stats } = useStats({})
  const { i18n } = useTranslation()

  
  return (
    <If condition={loadingStats}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        {stats !== undefined || !loadingStats
          ? (<StatsPage stats={stats} />) 
          : (<h1>{i18n.t('stats.stats_not_found')}</h1>)}
      </Else>
    </If>
  )
}

export default StatsPageIndex
