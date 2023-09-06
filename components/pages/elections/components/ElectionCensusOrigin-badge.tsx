import { CustomTag } from '@components/elements/CustomTag';
import { CensusOrigin } from '@vocdoni/sdk';
import { useTranslation } from 'react-i18next';
import { Case, Default, Switch } from 'react-if';

interface CensusOriginBadgeProps {
  censusOrigin: CensusOrigin;
}

export const CensusOriginBadge = ({ censusOrigin }: CensusOriginBadgeProps) => {
  const { i18n } = useTranslation();

  return (
    <Switch>
      <Case condition={censusOrigin == CensusOrigin.OFF_CHAIN_TREE || censusOrigin == CensusOrigin.OFF_CHAIN_CA}>
        <CustomTag>{i18n.t('processes.census_origin_badge.OFF_CHAIN')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusOrigin.OFF_CHAIN_TREE_WEIGHTED}>
        <CustomTag>{i18n.t('processes.census_origin_badge.OFF_CHAIN_TREE_WEIGHTED')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusOrigin.CENSUS_UNKNOWN}>
        <CustomTag>{i18n.t('processes.census_origin_badge.CENSUS_UNKNOWN')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusOrigin.UNRECOGNIZED}>
        <CustomTag>{i18n.t('processes.census_origin_badge.UNRECOGNIZED')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusOrigin.MINI_ME}>
        <CustomTag>{i18n.t('processes.census_origin_badge.MINI_ME')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusOrigin.ERC1155}>
        <CustomTag> {i18n.t('processes.census_origin_badge.ERC1155')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusOrigin.ERC20}>
        <CustomTag>{i18n.t('processes.census_origin_badge.ERC20')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusOrigin.ERC721}>
        <CustomTag>{i18n.t('processes.census_origin_badge.ERC721')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusOrigin.ERC777}>
        <CustomTag>{i18n.t('processes.census_origin_badge.ERC777')}</CustomTag>
      </Case>
      {/* <Case condition={censusOrigin == CensusOrigin.OFF_CHAIN_CA}>
        <ActiveBadge>{i18n.t('processes.OFF_CHAIN_CA')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == CensusOrigin.OFF_CHAIN_TREE}>
        <ActiveBadge>{i18n.t('processes.OFF_CHAIN_TREE')}</ActiveBadge>
      </Case>
      <Case
        condition={censusOrigin == CensusOrigin.OFF_CHAIN_TREE_WEIGHTED}
      >
        <ActiveBadge>{i18n.t('processes.OFF_CHAIN_TREE_WEIGHTED')}</ActiveBadge>
      </Case> */}
      <Default>
        <CustomTag>{i18n.t('processes.census_origin_badge.CENSUS_UNKNOWN')}</CustomTag>
      </Default>
    </Switch>
  );
};
