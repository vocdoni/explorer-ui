
import i18n from '@i18n'
import { Switch, Case } from 'react-if'
import { CensusOrigin } from 'dvote-js/dist/models/protobuf/build/ts/vochain/vochain'

interface CensusOriginBadgeProps {
    censusOrigin: CensusOrigin
}

export const CensusOriginBadge = ({
    censusOrigin,
}: CensusOriginBadgeProps) => {
  return (
    <Switch>
    <Case condition={ censusOrigin == CensusOrigin.CENSUS_UNKNOWN}>
      {i18n.t("elections.CENSUS_UNKNOWN")}
    </Case>
    <Case condition={ censusOrigin == CensusOrigin.UNRECOGNIZED}>
      {i18n.t("elections.UNRECOGNIZED")}
    </Case>
    <Case condition={ censusOrigin == CensusOrigin.MINI_ME}>
      {i18n.t("elections.MINI_ME")}
    </Case>
    <Case condition={ censusOrigin == CensusOrigin.OFF_CHAIN_CA}>
      {i18n.t("elections.OFF_CHAIN_CA")}
    </Case>
    <Case condition={ censusOrigin == CensusOrigin.OFF_CHAIN_TREE}>
      {i18n.t("elections.OFF_CHAIN_TREE")}
    </Case>
    <Case condition={ censusOrigin == CensusOrigin.OFF_CHAIN_TREE_WEIGHTED}>
      {i18n.t("elections.OFF_CHAIN_TREE_WEIGHTED")}
    </Case>
    <Case condition={ censusOrigin == CensusOrigin.ERC1155}>
      {i18n.t("elections.ERC1155")}
    </Case>
    <Case condition={ censusOrigin == CensusOrigin.ERC20}>
      {i18n.t("elections.ERC20")}
    </Case>
    <Case condition={ censusOrigin == CensusOrigin.ERC721}>
      {i18n.t("elections.ERC721")}
    </Case>
    <Case condition={ censusOrigin == CensusOrigin.ERC777}>
      {i18n.t("elections.ERC777")}
    </Case>
  </Switch>
  )
}
