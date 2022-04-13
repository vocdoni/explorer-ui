import StatsPage from '@components/pages/stats'
import { Loader } from '@components/blocks/loader'
import { ViewContext, ViewStrategy } from '@lib/strategy'
import { useStats } from '@hooks/use-stats'
import { useBlocks } from '@hooks/use-blocks'
import { Else, If, Then } from 'react-if'
import i18n from '@i18n'

const StatsPageIndex = () => {
  const { loading: loadingStats, stats } = useStats({})
  
  return (
    <If condition={loadingStats}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        {stats !== undefined || !loadingStats
          ? (<StatsPage stats={stats} />) 
          : (<h1>{i18n.t('home.stats_not_found')}</h1>)}
      </Else>
    </If>
  )
}

export default StatsPageIndex
