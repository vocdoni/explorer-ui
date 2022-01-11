
import { VochainProcessStatus } from 'dvote-js'
import i18n from '@i18n'
import { Switch, Case } from 'react-if'

interface ElectionStatusBadgeProps {
    status: VochainProcessStatus
}

export const ElectionStatusBadge = ({
    status,
}: ElectionStatusBadgeProps) => {

  return (
    <Switch>
    <Case condition={ status == VochainProcessStatus.READY}>
      <p>{i18n.t("elections.status")} : {i18n.t("elections.ready")}</p>
    </Case>
    <Case condition={ status == VochainProcessStatus.PAUSED}>
      <p>{i18n.t("elections.status")} : {i18n.t("elections.paused")}</p>
    </Case>
    <Case condition={ status == VochainProcessStatus.ENDED}>
      <p>{i18n.t("elections.status")} : {i18n.t("elections.ended")}</p>
    </Case>
    <Case condition={ status == VochainProcessStatus.CANCELED}>
      <p>{i18n.t("elections.status")} : {i18n.t("elections.canceled")}</p>
    </Case>
    <Case condition={ status == VochainProcessStatus.RESULTS}>
      <p>{i18n.t("elections.status")} : {i18n.t("elections.results")}</p>
    </Case>
  </Switch>
  )
}
