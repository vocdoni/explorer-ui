import { CustomTag } from '@components/elements/CustomTag';
import { CensusTypeEnum } from '@vocdoni/sdk';
import { useTranslation } from 'next-i18next';
import { Case, Default, Switch } from 'react-if';

interface CensusOriginBadgeProps {
  censusOrigin: CensusTypeEnum;
}

export const CensusOriginBadge = ({ censusOrigin }: CensusOriginBadgeProps) => {
  const { t } = useTranslation();
  return (
    <Switch>
      <Case condition={censusOrigin == CensusTypeEnum.OFF_CHAIN_TREE || censusOrigin == CensusTypeEnum.OFF_CHAIN_CA}>
        <CustomTag>{t('processes.census_origin_badge.OFF_CHAIN')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.OFF_CHAIN_TREE_WEIGHTED}>
        <CustomTag>{t('processes.census_origin_badge.OFF_CHAIN_TREE_WEIGHTED')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.CENSUS_UNKNOWN}>
        <CustomTag>{t('processes.census_origin_badge.CENSUS_UNKNOWN')}</CustomTag>
      </Case>
      {/*<Case condition={censusOrigin == CensusTypeEnum.}>*/}
      {/*  <CustomTag>{t('processes.census_origin_badge.UNRECOGNIZED')}</CustomTag>*/}
      {/*</Case>*/}
      <Case condition={censusOrigin == CensusTypeEnum.MINI_ME}>
        <CustomTag>{t('processes.census_origin_badge.MINI_ME')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.ERC1155}>
        <CustomTag> {t('processes.census_origin_badge.ERC1155')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.ERC20}>
        <CustomTag>{t('processes.census_origin_badge.ERC20')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.ERC721}>
        <CustomTag>{t('processes.census_origin_badge.ERC721')}</CustomTag>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.ERC777}>
        <CustomTag>{t('processes.census_origin_badge.ERC777')}</CustomTag>
      </Case>
      {/* <Case condition={censusOrigin == CensusTypeEnum.OFF_CHAIN_CA}>
        <ActiveBadge>{t('processes.OFF_CHAIN_CA')}</ActiveBadge>
      </Case>
      <Case condition={censusOrigin == CensusTypeEnum.OFF_CHAIN_TREE}>
        <ActiveBadge>{t('processes.OFF_CHAIN_TREE')}</ActiveBadge>
      </Case>
      <Case
        condition={censusOrigin == CensusTypeEnum.OFF_CHAIN_TREE_WEIGHTED}
      >
        <ActiveBadge>{t('processes.OFF_CHAIN_TREE_WEIGHTED')}</ActiveBadge>
      </Case> */}
      <Default>
        <CustomTag>{t('processes.census_origin_badge.CENSUS_UNKNOWN')}</CustomTag>
      </Default>
    </Switch>
  );
};
