import { useTranslation } from 'react-i18next'
import { Switch, Case, Default } from 'react-if'
import { ActiveBadge, UpcomingBadge, EndedBadge } from '@components/elements/text-badge'
import { VochainCensusOrigin } from 'dvote-js'

interface CensusOriginBadgeProps {
  censusOrigin: VochainCensusOrigin
}

export const CensusOriginBadge = ({ censusOrigin }: CensusOriginBadgeProps) => {
  const { i18n } = useTranslation()
  return (
    <Switch>
      <Case
        condition={
          censusOrigin == VochainCensusOrigin.OFF_CHAIN_TREE ||
          censusOrigin == VochainCensusOrigin.OFF_CHAIN_TREE_WEIGHTED ||
          censusOrigin == VochainCensusOrigin.OFF_CHAIN_CA
        }
      >
        <ActiveBadge>{i18n.t('elections.badge.OFF_CHAIN')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == VochainCensusOrigin.CENSUS_UNKNOWN}>
        <EndedBadge>{i18n.t('elections.CENSUS_UNKNOWN')}</EndedBadge>
      </Case>
      <Case condition={censusOrigin == VochainCensusOrigin.UNRECOGNIZED}>
        <EndedBadge>{i18n.t('elections.UNRECOGNIZED')}</EndedBadge>
      </Case>
      <Case condition={censusOrigin == VochainCensusOrigin.MINI_ME}>
        <ActiveBadge>{i18n.t('elections.MINI_ME')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == VochainCensusOrigin.ERC1155}>
        <ActiveBadge> {i18n.t('elections.ERC1155')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == VochainCensusOrigin.ERC20}>
        <ActiveBadge>{i18n.t('elections.ERC20')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == VochainCensusOrigin.ERC721}>
        <ActiveBadge>{i18n.t('elections.ERC721')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == VochainCensusOrigin.ERC777}>
        <ActiveBadge>{i18n.t('elections.ERC777')}</ActiveBadge>
      </Case>
      {/* <Case condition={censusOrigin == VochainCensusOrigin.OFF_CHAIN_CA}>
        <ActiveBadge>{i18n.t('elections.OFF_CHAIN_CA')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == VochainCensusOrigin.OFF_CHAIN_TREE}>
        <ActiveBadge>{i18n.t('elections.OFF_CHAIN_TREE')}</ActiveBadge>
      </Case>
      <Case
        condition={censusOrigin == VochainCensusOrigin.OFF_CHAIN_TREE_WEIGHTED}
      >
        <ActiveBadge>{i18n.t('elections.OFF_CHAIN_TREE_WEIGHTED')}</ActiveBadge>
      </Case> */}
      <Default>
        <EndedBadge>
          {i18n.t('elections.badge.CENSUS_UNKNOWN')}
        </EndedBadge>
      </Default>
    </Switch>
  )
}
