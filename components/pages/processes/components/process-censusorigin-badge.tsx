import { useTranslation } from 'react-i18next';
import { Switch, Case, Default } from 'react-if';
import { Vochain } from '@vocdoni/proto';
import { BaseStatusBadge } from '@components/elements/card-badge';

interface CensusOriginBadgeProps {
  censusOrigin: Vochain.CensusOrigin;
}

export const CensusOriginBadge = ({ censusOrigin }: CensusOriginBadgeProps) => {
  const { i18n } = useTranslation();

  return (
    <Switch>
      <Case
        condition={
          censusOrigin == Vochain.CensusOrigin.OFF_CHAIN_TREE || censusOrigin == Vochain.CensusOrigin.OFF_CHAIN_CA
        }
      >
        <BaseStatusBadge>{i18n.t('processes.census_origin_badge.OFF_CHAIN')}</BaseStatusBadge>
      </Case>
      <Case condition={censusOrigin == Vochain.CensusOrigin.OFF_CHAIN_TREE_WEIGHTED}>
        <BaseStatusBadge>{i18n.t('processes.census_origin_badge.OFF_CHAIN_TREE_WEIGHTED')}</BaseStatusBadge>
      </Case>
      <Case condition={censusOrigin == Vochain.CensusOrigin.CENSUS_UNKNOWN}>
        <BaseStatusBadge>{i18n.t('processes.census_origin_badge.CENSUS_UNKNOWN')}</BaseStatusBadge>
      </Case>
      <Case condition={censusOrigin == Vochain.CensusOrigin.UNRECOGNIZED}>
        <BaseStatusBadge>{i18n.t('processes.census_origin_badge.UNRECOGNIZED')}</BaseStatusBadge>
      </Case>
      <Case condition={censusOrigin == Vochain.CensusOrigin.MINI_ME}>
        <BaseStatusBadge>{i18n.t('processes.census_origin_badge.MINI_ME')}</BaseStatusBadge>
      </Case>
      <Case condition={censusOrigin == Vochain.CensusOrigin.ERC1155}>
        <BaseStatusBadge> {i18n.t('processes.census_origin_badge.ERC1155')}</BaseStatusBadge>
      </Case>
      <Case condition={censusOrigin == Vochain.CensusOrigin.ERC20}>
        <BaseStatusBadge>{i18n.t('processes.census_origin_badge.ERC20')}</BaseStatusBadge>
      </Case>
      <Case condition={censusOrigin == Vochain.CensusOrigin.ERC721}>
        <BaseStatusBadge>{i18n.t('processes.census_origin_badge.ERC721')}</BaseStatusBadge>
      </Case>
      <Case condition={censusOrigin == Vochain.CensusOrigin.ERC777}>
        <BaseStatusBadge>{i18n.t('processes.census_origin_badge.ERC777')}</BaseStatusBadge>
      </Case>
      {/* <Case condition={censusOrigin == Vochain.CensusOrigin.OFF_CHAIN_CA}>
        <ActiveBadge>{i18n.t('processes.OFF_CHAIN_CA')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == Vochain.CensusOrigin.OFF_CHAIN_TREE}>
        <ActiveBadge>{i18n.t('processes.OFF_CHAIN_TREE')}</ActiveBadge>
      </Case>
      <Case
        condition={censusOrigin == Vochain.CensusOrigin.OFF_CHAIN_TREE_WEIGHTED}
      >
        <ActiveBadge>{i18n.t('processes.OFF_CHAIN_TREE_WEIGHTED')}</ActiveBadge>
      </Case> */}
      <Default>
        <BaseStatusBadge>{i18n.t('processes.census_origin_badge.CENSUS_UNKNOWN')}</BaseStatusBadge>
      </Default>
    </Switch>
  );
};
