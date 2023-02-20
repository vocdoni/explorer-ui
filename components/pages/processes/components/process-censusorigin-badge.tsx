import { useTranslation } from 'react-i18next'
import { Switch, Case, Default } from 'react-if'
import { ActiveBadge, EndedBadge } from '@components/elements/text-badge'
import { CensusTypeEnum } from '@vocdoni/sdk'

interface CensusOriginBadgeProps {
  censusOrigin: CensusTypeEnum
}

export const CensusOriginBadge = ({ censusOrigin }: CensusOriginBadgeProps) => {
  const { i18n } = useTranslation()
  return (
    <Switch>
      <Case
        condition={
          censusOrigin == CensusTypeEnum.OFF_CHAIN_TREE ||
          censusOrigin == CensusTypeEnum.OFF_CHAIN_TREE_WEIGHTED ||
          censusOrigin == CensusTypeEnum.OFF_CHAIN_CA
        }
      >
        <ActiveBadge>{i18n.t('processes.census_origin_badge.OFF_CHAIN')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.CENSUS_UNKNOWN}>
        <EndedBadge>{i18n.t('processes.census_origin_badge.CENSUS_UNKNOWN')}</EndedBadge>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.MINI_ME}>
        <ActiveBadge>{i18n.t('processes.census_origin_badge.MINI_ME')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.ERC1155}>
        <ActiveBadge> {i18n.t('processes.census_origin_badge.ERC1155')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.ERC20}>
        <ActiveBadge>{i18n.t('processes.census_origin_badge.ERC20')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.ERC721}>
        <ActiveBadge>{i18n.t('processes.census_origin_badge.ERC721')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.ERC777}>
        <ActiveBadge>{i18n.t('processes.census_origin_badge.ERC777')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.OFF_CHAIN_CA}>
        <ActiveBadge>{i18n.t('processes.OFF_CHAIN_CA')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.OFF_CHAIN_TREE}>
        <ActiveBadge>{i18n.t('processes.OFF_CHAIN_TREE')}</ActiveBadge>
      </Case>
      <Case
        condition={censusOrigin == CensusTypeEnum.OFF_CHAIN_TREE_WEIGHTED}
      >
        <ActiveBadge>{i18n.t('processes.OFF_CHAIN_TREE_WEIGHTED')}</ActiveBadge>
      </Case>
      <Default>
        <EndedBadge>
          {i18n.t('processes.census_origin_badge.CENSUS_UNKNOWN')}
        </EndedBadge>
      </Default>
    </Switch>
  )
}
