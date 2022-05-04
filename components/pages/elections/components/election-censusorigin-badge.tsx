import { useTranslation } from 'react-i18next'
import { Switch, Case, Default } from 'react-if'
import { ActiveBadge, UpcomingBadge } from '@components/elements/text-badge'
import { VochainCensusOrigin } from 'dvote-js'

interface CensusOriginBadgeProps {
    censusOrigin: VochainCensusOrigin
}

export const CensusOriginBadge = ({
    censusOrigin,
}: CensusOriginBadgeProps) => {
  const { i18n } = useTranslation()
  return (
    <Switch>
      <Case condition={ 
        censusOrigin == VochainCensusOrigin.OFF_CHAIN_TREE ||
        censusOrigin == VochainCensusOrigin.OFF_CHAIN_TREE_WEIGHTED ||
        censusOrigin == VochainCensusOrigin.OFF_CHAIN_CA 
      }>
        <ActiveBadge>{i18n.t("elections.badge.OFF_CHAIN")}</ActiveBadge>
      </Case>
      <Default>
        <UpcomingBadge>{i18n.t("elections.badge.CENSUS_UNKNOWN")}</UpcomingBadge>
      </Default>
    </Switch>
    // <Switch>
    // <Case condition={ censusOrigin == CensusOrigin.CENSUS_UNKNOWN}>
    //   {i18n.t("elections.CENSUS_UNKNOWN")}
    // </Case>
    // <Case condition={ censusOrigin == CensusOrigin.UNRECOGNIZED}>
    //   {i18n.t("elections.UNRECOGNIZED")}
    // </Case>
    // <Case condition={ censusOrigin == CensusOrigin.MINI_ME}>
    //   {i18n.t("elections.MINI_ME")}
    // </Case>
    // <Case condition={ censusOrigin == CensusOrigin.OFF_CHAIN_CA}>
    //   {i18n.t("elections.OFF_CHAIN_CA")}
    // </Case>
    // <Case condition={ censusOrigin == CensusOrigin.OFF_CHAIN_TREE}>
    //   {i18n.t("elections.OFF_CHAIN_TREE")}
    // </Case>
    // <Case condition={ censusOrigin == CensusOrigin.OFF_CHAIN_TREE_WEIGHTED}>
    //   {i18n.t("elections.OFF_CHAIN_TREE_WEIGHTED")}
    // </Case>
    // <Case condition={ censusOrigin == CensusOrigin.ERC1155}>
    //   {i18n.t("elections.ERC1155")}
    // </Case>
    // <Case condition={ censusOrigin == CensusOrigin.ERC20}>
    //   {i18n.t("elections.ERC20")}
    // </Case>
    // <Case condition={ censusOrigin == CensusOrigin.ERC721}>
    //   {i18n.t("elections.ERC721")}
    // </Case>
    // <Case condition={ censusOrigin == CensusOrigin.ERC777}>
    //   {i18n.t("elections.ERC777")}
    // </Case>
  // </Switch>
  )
}
